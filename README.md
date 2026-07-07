# Netease Music App

一个基于 Vue 3、TypeScript、Vite 和 Pinia 的网易云音乐 Web/PWA 客户端。项目主要覆盖音乐发现、搜索、歌单/专辑/歌手详情、播放队列、歌词、私人 FM、登录态、用户中心、PWA 安装与缓存等功能。

## 技术栈

- Vue 3 + `<script setup>` + TypeScript
- Vite + Vue Router + Pinia
- Tailwind CSS + DaisyUI
- Axios
- Vitest + Vue Test Utils
- Storybook
- vite-plugin-pwa / Workbox
- paroles 歌词解析与同步

## 本地开发

项目声明的包管理器是 `pnpm@10.24.0`。

```bash
pnpm install
pnpm dev
```

开发服务器默认运行在：

```text
http://127.0.0.1:3200/music
```

本地开发时 `/api` 会通过 Vite proxy 转发到远程音乐 API 服务，配置在 `vite.config.ts`。

常用脚本：

```bash
pnpm dev             # 启动开发服务器
pnpm build           # 类型检查后构建
pnpm compile         # 仅执行 Vite 构建
pnpm typecheck:once  # 单次类型检查
pnpm test            # 运行 Vitest
pnpm format          # ESLint 自动修复 src 下 TS/Vue 文件
pnpm storybook       # 启动 Storybook
pnpm analyze         # 分析构建体积
```

## 目录结构

```text
src/
  api/          由接口文档生成的 API 类型定义
  common/       通用常量、时间、版本等基础模块
  components/   可复用 UI 组件和全局组件
  pages/        路由页面
  services/     挂载在应用层的组合式副作用
  stores/       Pinia 全局状态
  types/        全局类型声明
  utils/        请求、格式转换、异步工具等通用函数
```

主要页面：

- `Home`：首页推荐、Banner、新专辑、新歌
- `Search`：搜索页和多类型搜索结果
- `PlayingNow`：当前播放页、歌词、队列和播放控制
- `Songlist`：歌单详情
- `Album`：专辑详情
- `Artist`：歌手详情
- `Radio`：私人 FM
- `UserCenter`：用户信息、最近播放、喜欢的音乐
- `Setting`：偏好设置

## 启动链路

应用入口在 `src/main.ts`：

1. 创建 Vue Router，base path 为 `/music`。
2. 注册全局路由守卫，处理 `/index.html` 重定向和需要登录的页面。
3. 注册 Pinia、路由预取、View Transitions 插件。
4. 挂载 `App.vue`。

`src/App.vue` 负责挂载全局 UI 和全局副作用：

- 顶部导航 `Nav`
- 路由页面 `RouterView`
- 登录弹窗 `LoginModal`
- 全局音频元素 `Audio`
- 底部迷你播放控制 `MiniMusicControl`
- 登录初始化、播放状态、歌词、喜欢列表、主题、快捷键、Media Session 等 effect

## 状态和副作用

项目使用 Pinia setup store 管理全局状态：

- `useAuthStore`：登录状态、用户 ID、登录弹窗、登录信息缓存
- `useAudioStore`：`HTMLAudioElement` 引用、音量、播放时间、音频状态
- `usePlaylistStore`：播放队列、历史队列、当前歌曲、播放模式、切歌逻辑
- `useLyricsStore`：歌词对象、歌词播放器、当前歌词行
- `usePreferenceStore`：用户偏好和本地持久化
- `useLikeStore` / `useSonglistsStore` / `useProfileStore`：用户相关数据
- `useTabStore`：页面 tab 状态

`services/` 目录里的 composable 主要是应用级副作用，不是纯业务服务。它们通常通过 watcher 把 Pinia 状态、DOM API、浏览器能力和网络请求连接起来。维护时需要注意：这些 effect 会在 `App.vue` 中长期存在，修改时要考虑整个应用生命周期。

## 播放系统

当前播放链路由多个模块协作：

```text
UI / Keyboard / MediaSession
        |
        v
usePlaylistStore  <->  usePlayStatusEffect  <->  useAudioStore
        |                       |
        v                       v
   song/url API             Audio.vue
                                |
                                v
                         HTMLAudioElement
```

核心职责分布：

- `usePlaylistStore` 维护播放队列、当前歌曲、播放模式，并负责获取歌曲 URL。
- `useAudioStore` 保存音频元素引用、音量、播放时间和音频状态。
- `Audio.vue` 挂载真实的 `<audio>`，把 `canplay`、`timeupdate`、`ended`、`error` 等 DOM 事件写回 store。
- `usePlayStatusEffect` 根据歌曲状态和音频状态自动播放、预取下一首 URL、结束后切歌、上报播放记录、处理私人 FM 续播。
- `useMediaSessionEffect` 对接浏览器 Media Session。
- `useGlobalKeyboardListeners` 处理全局空格键播放/暂停。

这个设计能支撑当前功能，但播放状态机不是单一真相源：队列状态、音频状态、歌曲状态和 DOM 事件之间存在多个写入口。后续重构时建议把播放域收敛到一个 `PlayerController` 或 actor：

```text
UI / Keyboard / MediaSession
        |
        v
PlayerController
        |
        +-- QueueService
        +-- TrackUrlResolver
        +-- AudioAdapter
        +-- PlaybackReporter
```

目标是让 UI 只发送命令，`AudioAdapter` 只上报浏览器事件，所有状态迁移和副作用调度都由一个控制器决定。这样可以系统性解决切歌竞态、过期 URL、自动播放失败、旧请求返回污染当前歌曲等问题。

## API 和请求

`src/api/` 下的接口类型大多来自 `scripts/doc.md`，由 `scripts/generateApi.mjs` 生成。调用方式主要是：

```ts
import type { ApiSongUrl } from 'api'
import { post } from 'utils'

const res = await post<ApiSongUrl>('/song/url', { id: 123, br: 320000 })
```

请求封装在 `src/utils/request.ts`：

- 请求前统一拼接 `import.meta.env.VITE_API`
- 请求默认携带 cookie
- 响应默认返回 `response.data`
- 目前对 `301` 做登录失效处理

注意：生成脚本是早期脚本，仍有硬编码路径和大量 `any` 类型。新增接口时建议先手工补准关键业务接口类型，不要盲目依赖生成脚本产物。

## 登录和用户数据

项目主要使用二维码登录。登录信息通过 `useStorage` 持久化在本地，用于减少重复校验登录态。需要登录的路由通过 `route.meta.requiresAuth` 标记，路由守卫会在未登录时打开登录弹窗。

登录相关模块集中在：

- `src/stores/useAuthStore.ts`
- `src/services/useLoginInitEffect.ts`
- `src/services/useLoginService.ts`
- `src/components/Globals/LoginModal/`

## PWA 和部署

项目部署路径是 `/music/`，对应配置：

- `vite.config.ts` 的 `base: '/music/'`
- `createWebHistory('/music')`
- PWA manifest 的 `start_url`

Workbox 当前主要缓存应用 shell 和图片资源。修改 PWA 缓存策略时要同时考虑：

- 线上资源路径是否仍是 `/music/`
- Service Worker 更新策略
- HTML 是否需要 fallback
- API 响应是否应该缓存
- 图片缓存容量和过期时间

## 组件约定

通用组件放在 `src/components/`，页面私有组件放在对应 `src/pages/<Page>/components/`。

已有组件里有两类值得复用的模式：

- Headless 逻辑抽取，例如 `MusicBar/useHeadlessSlider.ts`
- Context 模式组合组件，例如 `Drawer`、`ContextMenu`

新增组件时优先保持高内聚：页面业务逻辑留在页面组件或页面 service，真正通用的交互和展示再下沉到 `components/`。

## 测试和质量

已有测试主要集中在小型工具函数和登录弹窗服务。后续补测试时优先覆盖高风险业务：

- 播放队列 next/previous/remove/insert
- 歌曲 URL 缓存和过期刷新
- `<audio>` 错误和重试策略
- 私人 FM 列表续播
- 登录态失效和请求错误
- 路由鉴权

提交前建议至少执行：

```bash
pnpm typecheck:once
pnpm test -- --run
pnpm exec eslint "src/**/*.{ts,vue}" --no-cache
pnpm compile
```

## 维护注意事项

- 播放链路是项目最复杂的部分，改动前先画清楚事件来源和状态写入点。
- 不要在多个 watcher 中同时驱动同一类播放副作用；这会放大竞态。
- `Song` 更适合作为歌曲数据，不适合作为播放器状态容器。长期演进时建议把 `Song.status` 迁出。
- 请求层应保证错误语义明确，不能让网络错误静默变成业务层的 `undefined`。
- API 类型文件数量很多，不代表类型质量足够。关键业务接口应该优先补强。
- PWA、路由 base、线上资源路径强绑定 `/music/`，改部署路径时要一起改。
- 仓库当前存在历史兼容补丁和生成脚本技术债，升级 Vue、TypeScript、pnpm 或 PWA 插件时需要跑完整质量门禁。

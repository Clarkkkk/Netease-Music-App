// Generated by nitro
import type { Serialize, Simplify } from 'nitropack'
declare module 'nitropack' {
  type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
  interface InternalApi {
    '/__nuxt_error': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/nuxt@3.7.3_@types+node@20.7.0_eslint@8.42.0_rollup@2.79.1_sass@1.62.1_typescript@5.1.6_vue-tsc@1.8.11/node_modules/nuxt/dist/core/runtime/nitro/renderer').default>>>>
    }
  }
}
export {}
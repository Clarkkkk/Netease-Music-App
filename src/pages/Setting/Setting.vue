<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePreferenceStore } from 'stores'
import { Select, Switch } from 'components'
import { darkThemeOptions, lightThemeOptions } from './themes'

const { preference } = storeToRefs(usePreferenceStore())
</script>

<template>
    <div class="container mx-auto flex flex-col px-4 pb-4 pt-36 md:items-center">
        <h1 class="base-content text-xl font-bold md:my-4 md:text-2xl">设置</h1>
        <div class="w-full max-w-screen-sm py-4">
            <Switch
                v-model="preference.skipShortSongs"
                class="w-full"
                input-class="toggle-primary"
                label="过滤60秒内的音乐"
                explanation="自动跳过时长小于60秒的音乐"
            />
            <Switch
                v-model="preference.playTracing"
                class="w-full"
                input-class="toggle-primary"
                label="播放跟踪"
                explanation="关闭后，播放的歌曲不会出现在记录中，也不会计入个性化推荐"
            />
            <hr class="my-6 h-px w-full bg-base-content/10" />
            <Select
                v-model="preference.lightDarkThemeToggleStrategy"
                :options="[
                    { label: '跟随系统', value: 'system' },
                    // { label: '自定义时间', value: 'time' },
                    // { label: '手动切换', value: 'manual' },
                    { label: '从不切换', value: 'never' }
                ]"
                class="w-full"
                input-class="select-primary"
                label="深/浅主题切换"
            />
            <template v-if="preference.lightDarkThemeToggleStrategy === 'never'">
                <Select
                    v-model="preference.lightTheme"
                    :options="[...lightThemeOptions, ...darkThemeOptions]"
                    class="w-full"
                    input-class="select-primary"
                    label="主题"
                />
            </template>
            <template v-else>
                <Select
                    v-model="preference.lightTheme"
                    :options="lightThemeOptions"
                    class="w-full"
                    input-class="select-primary"
                    label="浅色主题"
                />
                <Select
                    v-model="preference.darkTheme"
                    :options="darkThemeOptions"
                    class="w-full"
                    input-class="select-primary"
                    label="深色主题"
                />
            </template>
            <hr class="my-6 h-px w-full bg-base-content/10" />
            <Switch
                v-model="preference.enableDebugMode"
                class="w-full"
                input-class="toggle-primary"
                label="开启调试"
                explanation="是否显示移动端调试组件"
            />
        </div>
    </div>
</template>

<style lang="scss"></style>

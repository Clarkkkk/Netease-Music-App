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
                label="过滤30秒内的音乐"
                explanation="自动跳过时长小于30秒的音乐"
            />
            <Switch
                v-model="preference.enableDebugMode"
                class="w-full"
                input-class="toggle-primary"
                label="开启调试"
            />
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
        </div>
    </div>
</template>

<style lang="scss"></style>

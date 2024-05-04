<script setup lang="ts">
import { watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useEruda } from 'services'
import { usePreferenceStore } from 'stores'
import { Switch } from 'components'

const { preference } = storeToRefs(usePreferenceStore())
const { startEruda, stopEruda } = useEruda()

watchEffect(() => {
    if (preference.value.enableDebugMode) {
        startEruda()
    } else {
        stopEruda()
    }
})
</script>

<template>
    <div class="container mx-auto flex flex-col px-4 pb-4 pt-16 md:items-center">
        <h1 class="base-content text-xl font-bold md:my-4 md:text-2xl">设置</h1>
        <div class="w-full max-w-screen-sm py-4">
            <Switch
                v-model="preference.skipShortSongs"
                class="w-full"
                input-class="toggle-primary"
                label="过滤30秒内的音乐"
            />
            <Switch
                v-model="preference.enableDebugMode"
                class="w-full"
                input-class="toggle-primary"
                label="开启调试"
            />
        </div>
    </div>
</template>

<style lang="scss"></style>

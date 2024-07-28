<script setup lang="ts" generic="T extends { readonly name: string; readonly value: any }">
import type { UnwrapRef } from 'vue'
import { ref } from 'vue'

const props = defineProps<{
    tabs: readonly T[]
    onTabChange?: (tab: T) => void | Promise<void>
    disabled?: boolean
    loading?: boolean
    tabClass?: string
    tabPaneClass?: string
}>()
const currentTab = ref<T>(props.tabs[0])
const _loading = ref(false)

async function onTabClick(tab: T) {
    currentTab.value = tab as UnwrapRef<T>

    if (!props.onTabChange) return

    _loading.value = true
    try {
        await props.onTabChange(tab)
    } finally {
        _loading.value = false
    }
}
</script>

<template>
    <div class="flex flex-col">
        <div :class="['tabs', 'flex-fixed', tabClass]">
            <button
                v-for="tab in tabs"
                :key="tab.name"
                :class="[
                    'tab',
                    'px-2',
                    'sm:px-4',
                    { 'tab-active': tab.value === currentTab.value }
                ]"
                :disabled="_loading || disabled || loading"
                @click="onTabClick(tab)"
            >
                {{ tab.name }}
            </button>
        </div>
        <div
            v-for="tab in tabs"
            v-show="currentTab.name === tab.name"
            :key="tab.name"
            :class="[
                'flex-1',
                'min-h-0',
                'w-full',
                tabPaneClass,
                { 'content-hidden': currentTab.name !== tab.name }
            ]"
        >
            <div
                v-if="_loading || loading"
                class="mt-4 flex w-full justify-center"
            >
                <div class="loading text-primary" />
            </div>
            <slot
                :name="tab.name"
                :tab="tab"
                :current-tab="currentTab"
            />
        </div>
    </div>
</template>

<style lang="scss"></style>

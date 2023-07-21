<script setup lang="ts" generic="T extends { readonly name: string; readonly value: any }">
import type { UnwrapRef } from 'vue'
import { ref } from 'vue'

const props = defineProps<{
    tabs: readonly T[]
    onTabChange: (tab: T) => void | Promise<void>
    disabled?: boolean
    tabClass?: string
}>()
const currentTab = ref<T>(props.tabs[0])
const loading = ref(false)

async function onTabClick(tab: T) {
    currentTab.value = tab as UnwrapRef<T>
    loading.value = true
    try {
        await props.onTabChange(tab)
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="flex flex-col">
        <div class="tabs flex-fixed">
            <button
                v-for="tab in tabs"
                :key="tab.name"
                :class="['tab', { 'tab-active': tab.value === currentTab.value }, tabClass]"
                :disabled="loading || disabled"
                @click="onTabClick(tab)"
            >
                {{ tab.name }}
            </button>
        </div>
        <div
            v-for="tab in tabs"
            v-show="currentTab.name === tab.name"
            :key="tab.name"
            class="h-full w-full"
        >
            <slot
                :name="tab.name"
                :tab="tab"
            />
        </div>
    </div>
</template>

<style lang="scss"></style>
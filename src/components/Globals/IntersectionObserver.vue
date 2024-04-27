<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useSlots } from 'vue'

const props = defineProps<{
    isBottom: boolean
    onChange: (visible: boolean) => void
}>()

const slots = useSlots()

const element = ref<HTMLElement | null>(null)
const observer = ref<IntersectionObserver | null>(null)
const visible = ref(false)

onMounted(() => {
    if (!element.value) return
    const options = {
        rootMargin: '0px 0px 50% 0px',
        threshold: 0.0
    }
    const callback: IntersectionObserverCallback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.target === element.value && visible.value !== entry.isIntersecting) {
                visible.value = entry.isIntersecting
                props.onChange(entry.isIntersecting)
            }
        })
        if (props.isBottom && element.value) {
            observer.unobserve(element.value)
        }
    }
    observer.value = new IntersectionObserver(callback, options)
    observer.value.observe(element.value)
})

onBeforeUnmount(() => {
    if (observer.value) {
        observer.value.disconnect()
    }
})
</script>

<template>
    <div
        id="app-intersection-observer"
        ref="element"
        class="flex h-5 w-full justify-center bg-transparent"
    >
        <span
            v-if="isBottom"
            class="text-center text-xs text-primary/70"
        >
            <template v-if="slots.default">
                <slot />
            </template>
            <template v-else> — 到底啦 — </template>
        </span>
        <span
            v-else
            :class="['loading', 'loading-spinner', 'text-primary/70', 'loading-sm']"
        />
    </div>
</template>

<style></style>

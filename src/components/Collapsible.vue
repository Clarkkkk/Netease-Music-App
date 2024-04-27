<script setup lang="ts">
import { computed, ref, useSlots, watch } from 'vue'
import { Button } from 'components'
import { wait } from '../utils/wait'

const slots = useSlots()

const props = defineProps<{
    collapseHeight: number
    collapsible?: boolean
    possibleMaxHeight?: number
}>()

const isOpen = ref(false)
const container = ref<HTMLElement | null>(null)
const memorizedHeight = ref(props.possibleMaxHeight || 2000)

const height = computed(() => {
    if (!props.collapsible) {
        return 'auto'
    } else if (isOpen.value) {
        return `${memorizedHeight.value}px`
    } else {
        return `${props.collapseHeight}px`
    }
})

watch(isOpen, async (val) => {
    if (val && container.value) {
        await wait(800)
        memorizedHeight.value = container.value.clientHeight
    }
})
</script>

<template>
    <div class="relative pb-6">
        <div
            ref="container"
            class="overflow-hidden transition-all duration-500"
            :style="{
                maxHeight: height
            }"
        >
            <slot name="default" />
        </div>

        <Button
            class="btn-ghost btn-xs absolute -bottom-2 h-8 px-0"
            @click="isOpen = !isOpen"
        >
            <slot
                v-if="collapsible"
                name="button-content"
                :is-open="isOpen"
            />
            <span v-if="collapsible && !slots['button-content']">
                {{ isOpen ? '收起' : '展开' }}
            </span>
        </Button>
    </div>
</template>

<style lang="scss"></style>

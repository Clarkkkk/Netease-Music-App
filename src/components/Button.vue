<script setup lang="ts">
import { type ButtonHTMLAttributes } from 'vue'
import { ref } from 'vue'

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
    disabled?: boolean
    onClick?: (e: MouseEvent) => void | Promise<void>
}

const props = defineProps<Props>()
const loading = ref(false)
const el = ref<HTMLButtonElement>()

function clickHandler(e: MouseEvent) {
    if (props.onClick) {
        const result = props.onClick(e)
        if (result instanceof Promise) {
            loading.value = true
            result.finally(() => {
                loading.value = false
            })
        }
    }
}

defineExpose({ el })
</script>

<template>
    <button
        ref="el"
        :class="['btn']"
        :disabled="disabled || loading"
        @click="clickHandler"
    >
        <slot />

        <slot
            v-if="loading"
            name="loading"
        >
            <span
                :class="[
                    'loading',
                    'loading-spinner',
                    'text-primary/70',
                    { 'loading-sm': ($attrs.class as string).includes('btn-sm') },
                    { 'loading-xs': ($attrs.class as string).includes('btn-xs') }
                ]"
            />
        </slot>

        <slot
            v-else
            name="icon"
        />
    </button>
</template>

<style scoped></style>

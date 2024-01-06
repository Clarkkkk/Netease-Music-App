<script setup lang="ts">
import type { ButtonHTMLAttributes, Ref } from 'vue'
import { inject, ref, watch } from 'vue'
import Button from '../Button.vue'

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
    onClick: (e: MouseEvent) => void | Promise<void>
    active?: boolean
}

const provided = inject<{ hideMenu: () => void; visible: Ref<boolean> }>('ContextMenu')
const props = defineProps<Props>()
const buttonRef = ref<InstanceType<typeof Button> | null>(null)

async function clickHandler(e: MouseEvent) {
    await props.onClick(e)
    provided?.hideMenu()
}

if (provided) {
    watch(provided.visible, (val) => {
        if (val && buttonRef.value?.el && props.active) {
            buttonRef.value?.el.scrollIntoView({ block: 'center' })
        }
    })
}
</script>

<template>
    <Button
        ref="buttonRef"
        class="btn btn-ghost btn-sm h-10 w-full justify-start pr-0 font-normal content-auto"
        @click="clickHandler"
    >
        <slot></slot>
    </Button>
</template>

<style scoped></style>

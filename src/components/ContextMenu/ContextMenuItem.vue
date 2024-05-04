<script setup lang="ts">
import type { ButtonHTMLAttributes, Ref } from 'vue'
import { inject, ref, watch } from 'vue'
import Button from '../Button.vue'

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
    /**
     * 点击菜单项时触发，执行回调后菜单关闭
     *
     * 若回调返回一个promise，菜单会等待promise resolve后再关闭
     */
    onClick?: (e: MouseEvent) => void | Promise<void>
    /** 当菜单很长，需要滚动时，将`active`设为`true`会使菜单在打开后自动滚动到这个item */
    active?: boolean
}

const provided = inject<{ hideMenu: () => void; visible: Ref<boolean> }>('ContextMenu')
const props = defineProps<Props>()
const buttonRef = ref<InstanceType<typeof Button> | null>(null)

async function clickHandler(e: MouseEvent) {
    if (props.onClick) {
        await props.onClick(e)
    }
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
        <slot />
    </Button>
</template>

<style scoped></style>

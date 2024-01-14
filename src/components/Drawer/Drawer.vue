<script setup lang="ts">
import { ref } from 'vue'
import { provide } from './context'

defineSlots<{
    /**
     * 默认插槽，提供3个参数
     * @param visible 抽屉是否打开
     * @param open 打开抽屉
     * @param close 关闭抽屉
     */
    default: (props: { visible: boolean; open: () => void; close: () => void }) => void
}>()

const visible = ref(false)

function open() {
    visible.value = true
}

function close() {
    visible.value = false
}

provide({ visible, open, close })
</script>

<template>
    <slot
        :visible="visible"
        :open="open"
        :close="close"
    />
</template>

<style lang="scss"></style>

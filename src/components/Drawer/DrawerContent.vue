<script setup lang="ts">
import { useDrawerContext } from './context'

const { visible } = useDrawerContext()
</script>

<template>
    <div
        v-if="visible"
        class="drawer-content absolute right-0 top-0 h-full w-72 bg-base-100 transition-all duration-300 md:w-96"
    >
        <slot />
    </div>
</template>

<style lang="scss">
.drawer-enter-from,
.drawer-leave-to {
    .drawer-content {
        translate: 100% 0;
    }
}
</style>

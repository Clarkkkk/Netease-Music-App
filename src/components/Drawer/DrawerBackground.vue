<script setup lang="ts">
import { watch } from 'vue'
import { useDrawerContext } from './context'

const { close, visible } = useDrawerContext()

watch(visible, (val) => {
    if (val) {
        document.body.classList.add('overflow-hidden')
    } else {
        document.body.classList.remove('overflow-hidden')
    }
})
</script>

<template>
    <Teleport to="body">
        <Transition name="drawer">
            <div
                v-if="visible"
                class="drawer-container fixed left-0 top-0 w-full transition-all duration-300 contain-strict"
            >
                <div
                    v-if="visible"
                    class="drawer-background absolute left-0 top-0 h-full w-full bg-gray-900/80 backdrop-blur-lg transition-all duration-300"
                    @click.self="close"
                />
                <slot />
            </div>
        </Transition>
    </Teleport>
</template>

<style lang="scss">
.drawer-container {
    height: 100vh;
    height: 100dvh;
    z-index: 2000;
}

.drawer-enter-from,
.drawer-leave-to {
    .drawer-background {
        opacity: 0;
    }
}
</style>

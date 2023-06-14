<script setup lang="ts">
import { provide, ref } from 'vue'
import { Tippy } from 'vue-tippy'
import { useDeviceType } from 'services'
import type { Instance, Placement } from 'tippy.js'
import Button from '../Button.vue'

interface ContextMenuProps {
    placement?: Placement
}

defineProps<ContextMenuProps>()

const { isPc } = useDeviceType()
const tippy = ref<Instance | null>(null)
const body = document.body
const visible = ref(false)

function hideMenu() {
    tippy.value?.hide()
}

provide('ContextMenu', { hideMenu })
</script>

<template>
    <div class="context-menu">
        <Tippy
            v-if="isPc"
            ref="tippy"
            max-width="none"
            interactive
            trigger="click"
            :delay="[0, 0]"
            :placement="placement || 'bottom-end'"
            :append-to="() => body"
            role="context-menu"
        >
            <slot></slot>

            <template #content>
                <div class="w-48 rounded-xl bg-base-100 p-2 shadow-xl">
                    <slot name="menu"></slot>
                </div>
            </template>
        </Tippy>

        <span
            v-if="!isPc"
            @click="visible = !visible"
        >
            <slot></slot>
        </span>

        <Teleport
            v-if="!isPc"
            to="body"
        >
            <Transition name="slide">
                <div
                    v-if="visible"
                    class="context-menu-popup fixed left-0 top-0 w-full transition-all duration-300"
                >
                    <div
                        class="context-menu-popup-background absolute left-0 top-0 h-full w-full bg-gray-900/80 backdrop-blur-lg transition-all duration-300"
                        @click="visible = false"
                    ></div>
                    <div
                        class="context-menu-popup-content absolute bottom-0 left-0 w-full rounded-t-xl bg-base-100 px-2 py-5 transition-all duration-300"
                    >
                        <Button
                            class="btn-ghost btn-square btn-sm absolute right-2 top-2"
                            @click="visible = false"
                        >
                            <i-fluent-dismiss-32-regular />
                        </Button>
                        <slot name="menu"></slot>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<style lang="scss">
.tippy-box[role='context-menu'] {
    transition: all 300ms;
}
.tippy-box[data-state='hidden'][role='context-menu'] {
    transform: scaleY(0.95);
    transform-origin: center;
    opacity: 0;

    &[data-placement='top-start'],
    &[data-placement='top-end'] {
        transform: scaleY(0.95) translateY(10%);
        transform-origin: bottom center;
    }

    &[data-placement='bottom-start'],
    &[data-placement='bottom-end'] {
        transform: scaleY(0.95) translateY(-10%);
        transform-origin: top center;
    }
}

.context-menu-popup {
    height: 100dvh;
}

.slide-enter-from,
.slide-leave-to {
    .context-menu-popup-background {
        opacity: 0;
    }
    .context-menu-popup-content {
        transform: translateY(100%);
    }
}
</style>
<script setup lang="ts">
import { provide, ref, watch } from 'vue'
import { Tippy } from 'vue-tippy'
import { useDeviceType } from 'services'
import type { Instance, Placement } from 'tippy.js'
import Button from '../Button.vue'

interface ContextMenuProps {
    placement?: Placement
    size?: 'large' | 'normal'
}

defineProps<ContextMenuProps>()

const { isPc } = useDeviceType()
const tippy = ref<Instance | null>(null)
const body = document.body
const visible = ref(false)

function hideMenu() {
    tippy.value?.hide()
    visible.value = false
}

watch(visible, (val) => {
    if (val) {
        body.classList.add('overflow-hidden')
    } else {
        body.classList.remove('overflow-hidden')
    }
})

provide('ContextMenu', { hideMenu, visible })
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
            :offset="[0, 15]"
            @show="
                () => {
                    visible = true
                }
            "
            @hide="
                () => {
                    visible = false
                }
            "
        >
            <slot></slot>

            <template #content>
                <div
                    :class="[
                        'context-menu-panel',
                        size === 'large' ? 'w-96' : 'w-48',
                        'rounded-xl',
                        'bg-base-100',
                        'p-2',
                        'shadow-xl'
                    ]"
                >
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
                    class="context-menu-popup fixed left-0 top-0 w-full transition-all duration-300 contain-strict"
                >
                    <div
                        class="context-menu-popup-background absolute left-0 top-0 h-full w-full bg-gray-900/80 backdrop-blur-lg transition-all duration-300"
                        @click="visible = false"
                    ></div>
                    <div
                        class="context-menu-popup-content absolute bottom-0 left-0 w-full overflow-auto rounded-t-xl bg-base-100 px-2 pb-5 transition-all duration-300"
                    >
                        <div class="sticky top-0 z-10 h-12 w-full bg-base-100 pt-4">
                            <Button
                                class="btn-square btn-ghost btn-sm absolute right-0 top-2"
                                @click="visible = false"
                            >
                                <i-fluent-dismiss-32-regular />
                            </Button>
                        </div>
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
        transform: scaleY(0.95) translateY(10px);
        transform-origin: bottom center;
    }

    &[data-placement='bottom-start'],
    &[data-placement='bottom-end'] {
        transform: scaleY(0.95) translateY(-10px);
        transform-origin: top center;
    }
}

.context-menu-panel {
    max-height: calc(100vh - 200px);
    overflow: auto;
}

.context-menu-popup {
    height: 100vh;
    height: 100dvh;
    z-index: 2500;
}

.context-menu-popup-content {
    max-height: calc(100% - max(1rem, env(safe-area-inset-top)));
    overscroll-behavior: contain;
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

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
// import type { ComponentExposed } from 'vue-component-type-helpers'
import { Tippy } from 'vue-tippy'
import { storeToRefs } from 'pinia'
import { useAudioStore } from 'stores'
import { wait } from 'utils'
import { useHeadlessSlider } from './MusicBar/useHeadlessSlider'
import Button from './Button.vue'

const container = ref<HTMLElement>()
const { volume, lastVolume } = storeToRefs(useAudioStore())
const { setVolume } = useAudioStore()
const body = document.body
const tippyRef = ref<any>()

const {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onTouchStart,
    onWheel,
    thumbStyle,
    rangeStyle,
    tooltipStyle,
    progress
} = useHeadlessSlider({
    currentPosition: volume,
    totalLength: ref(1),
    containerElement: container,
    onChange: onVolumeChange,
    direction: 'vertical'
})

const volumeText = computed(() => {
    return Math.floor(progress.value * 100)
})

watch(progress, (val) => {
    setVolume(val)
})

onMounted(() => {})

function onVolumeChange(val: number) {
    setVolume(val)
}
</script>

<template>
    <div
        class="relative"
        @mouseenter="() => tippyRef?.show()"
    >
        <Tippy
            ref="tippyRef"
            max-width="none"
            interactive
            trigger="manual"
            :delay="[0, 0]"
            placement="top"
            :append-to="() => body"
            role="context-menu"
            :hide-on-click="false"
            :offset="[0, 15]"
            @click-outside="() => tippyRef?.hide()"
        >
            <template #default>
                <Button
                    class="btn-square btn-ghost btn-sm -mr-2 text-slate-500"
                    @click="
                        () => {
                            if (volume > 0.01) {
                                setVolume(0)
                            } else {
                                setVolume(lastVolume)
                            }
                        }
                    "
                >
                    <template #icon>
                        <i-solar-muted-line-duotone
                            v-if="progress <= 0.01"
                            class="h-5 w-5"
                        />
                        <i-solar-volume-small-line-duotone
                            v-else-if="progress <= 0.5"
                            class="h-5 w-5"
                        />
                        <i-solar-volume-loud-line-duotone
                            v-else
                            class="h-5 w-5"
                        />
                    </template>
                </Button>
            </template>
            <template #content>
                <div
                    class="absolute bottom-1 left-1/2 flex w-14 -translate-x-1/2 flex-col items-center justify-center rounded-lg bg-base-100 p-2 shadow-lg"
                    @mouseleave="
                        async () => {
                            await wait(500)
                            tippyRef?.hide()
                        }
                    "
                >
                    <div
                        ref="container"
                        class="mb-4 mt-3 flex h-36 w-6 cursor-grab flex-col"
                        @pointerdown="onPointerDown"
                        @pointermove="onPointerMove"
                        @pointerup="onPointerUp"
                        @touchstart="onTouchStart"
                        @wheel="onWheel"
                    >
                        <div class="flex h-full w-full flex-col items-center">
                            <div
                                class="groove relative flex h-full w-1 flex-col-reverse items-center rounded-full bg-base-300"
                            >
                                <div
                                    class="h-full w-full flex-shrink-0 rounded-full bg-slate-200"
                                    :style="rangeStyle"
                                />
                                <div
                                    class="thumb h-4 w-4 rounded-full bg-slate-500 shadow-lg shadow-slate-500/30"
                                    :style="thumbStyle"
                                >
                                    <div
                                        class="pointer-events-none -right-8 -top-1 h-5 select-none rounded-sm bg-neutral p-2 text-xs font-bold text-neutral-content shadow-lg shadow-neutral/30"
                                        :style="tooltipStyle"
                                    >
                                        {{ volumeText }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </Tippy>
    </div>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 300ms;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>

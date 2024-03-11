<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useDeviceType } from 'services'
import { useAudioStore } from 'stores'
import { useHeadlessSlider } from './MusicBar/useHeadlessSlider'
import Button from './Button.vue'

const container = ref<HTMLElement>()
const { volume, lastVolume } = storeToRefs(useAudioStore())
const { setVolume } = useAudioStore()
const { isMobile } = useDeviceType()

const {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onTouchStart,
    thumbStyle,
    rangeStyle,
    tooltipStyle,
    progress
} = useHeadlessSlider({
    currentPosition: volume,
    totalLength: ref(1),
    containerElement: container,
    onChange: onVolumeChange
})

const volumeText = computed(() => {
    return Math.floor(progress.value * 100)
})

watch(progress, (val) => {
    setVolume(val)
})

function onVolumeChange(val: number) {
    setVolume(val)
}
</script>

<template>
    <div class="flex items-center">
        <Button
            class="btn-square btn-ghost btn-sm mr-4 text-slate-500"
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
        <div
            ref="container"
            :class="['flex', 'h-5', isMobile ? 'w-72' : 'w-36', 'cursor-grab']"
            @pointerdown="onPointerDown"
            @pointermove="onPointerMove"
            @pointerup="onPointerUp"
            @touchstart="onTouchStart"
        >
            <div class="flex h-full w-full items-center">
                <div class="groove relative flex h-1 w-full items-center rounded-full bg-base-300">
                    <div
                        class="h-full w-full flex-shrink-0 rounded-full bg-slate-200"
                        :style="rangeStyle"
                    />
                    <div
                        class="thumb h-4 w-4 rounded-full bg-slate-500 shadow-lg shadow-slate-500/30"
                        :style="thumbStyle"
                    >
                        <div
                            class="pointer-events-none -bottom-7 h-5 select-none rounded-sm bg-neutral p-2 text-xs font-bold text-neutral-content shadow-lg shadow-neutral/30"
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

<style lang="scss"></style>

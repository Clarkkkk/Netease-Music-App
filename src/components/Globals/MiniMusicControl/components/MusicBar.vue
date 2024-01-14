<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAudioStore } from 'stores'
import { prependZero } from 'utils'
import { useHeadlessMusicBar } from '../../../MusicBar/useHeadlessMusicBar'

const container = ref<HTMLElement>(document.body)
const { currentTime, duration } = storeToRefs(useAudioStore())
const { seek } = useAudioStore()
const {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onTouchStart,
    thumbStyle,
    rangeStyle,
    tooltipStyle,
    progress
} = useHeadlessMusicBar({
    current: currentTime,
    duration,
    containerElement: container,
    onChange
})

const tooltipText = computed(() => {
    const timestamp = Math.floor(progress.value * duration.value)

    return formatTime(timestamp)
})

function onChange(val: number) {
    seek(val)
}

function formatTime(time: number) {
    const timeNum = Math.floor(time)
    const sec = timeNum % 60
    const min = (timeNum - sec) / 60

    return `${min}:${prependZero(sec, 2)}`
}
</script>

<template>
    <div
        v-view-transition-name="'playing-music-bar'"
        class="hidden items-center md:flex"
    >
        <div class="mx-4 text-sm text-base-content">
            {{ formatTime(currentTime) }}
        </div>
        <div
            id="music-bar"
            ref="container"
            class="h-5 w-48 cursor-grab lg:w-72"
            @pointerdown="onPointerDown"
            @pointermove="onPointerMove"
            @pointerup="onPointerUp"
            @touchstart="onTouchStart"
        >
            <div class="flex h-full w-full items-center">
                <div class="groove relative flex h-1 w-full items-center rounded-full bg-base-300">
                    <div
                        class="h-full rounded-full bg-secondary-content"
                        :style="rangeStyle"
                    />
                    <div
                        class="thumb h-4 w-4 rounded-full bg-secondary shadow-lg shadow-secondary/30"
                        :style="thumbStyle"
                    >
                        <div
                            class="-top-7 h-5 rounded-sm bg-neutral p-2 text-xs font-bold text-neutral-content shadow-lg shadow-neutral/30"
                            :style="tooltipStyle"
                        >
                            {{ tooltipText }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mx-4 text-sm text-base-content">
            {{ formatTime(duration) }}
        </div>
    </div>
</template>

<style>
#music-bar .groove {
    transition: box-shadow 300ms;
    box-shadow: 0 0 0px 0px hsl(var(--b3) / 0.2);
}

#music-bar .thumb {
    transition:
        width 300ms,
        height 300ms,
        box-shadow 300ms;
}

#music-bar:hover .thumb {
    width: 1.2rem;
    height: 1.2rem;
}

#music-bar:hover .groove {
    box-shadow: 0 0 0px 10px hsl(var(--b3) / 0.2);
}
</style>

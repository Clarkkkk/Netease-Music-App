<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAudioStore, usePlaylistStore } from 'stores'
import { Button } from 'components'

const { audioStatus } = storeToRefs(useAudioStore())
const { play, pause, playAgain } = useAudioStore()
const { switchToLastSong, switchToNextSong } = usePlaylistStore()

function switchPlay() {
    if (audioStatus.value === 'ended') {
        playAgain()
    } else if (['can-play', 'paused'].includes(audioStatus.value)) {
        play()
    } else if (['playing', 'almost-ended', 'loading', 'not-ready'].includes(audioStatus.value)) {
        pause()
    }
}
</script>

<template>
    <div
        id="radio-control"
        class="flex items-center"
    >
        <Button
            v-view-transition-name="'playing-controls-last'"
            class="btn-ghost h-12 w-12 p-0 text-primary"
            @click="switchToLastSong"
        >
            <template #icon>
                <i-solar-skip-previous-bold-duotone class="h-6 w-6" />
            </template>
        </Button>
        <Button
            v-view-transition-name="'playing-controls-play'"
            class="btn-ghost mx-10 h-14 w-14 p-0 text-primary"
            @click="switchPlay"
        >
            <template #icon>
                <i-solar-play-bold-duotone
                    v-if="
                        ['not-ready', 'can-play', 'paused', 'ended', 'error'].includes(audioStatus)
                    "
                    class="h-8 w-8"
                />
                <i-solar-pause-bold-duotone
                    v-else
                    class="h-8 w-8"
                />
            </template>
        </Button>
        <Button
            v-view-transition-name="'playing-controls-next'"
            class="btn-ghost h-12 w-12 p-0 text-primary"
            @click="switchToNextSong()"
        >
            <template #icon>
                <i-solar-skip-next-bold-duotone class="h-6 w-6" />
            </template>
        </Button>
    </div>
</template>

<style scoped></style>

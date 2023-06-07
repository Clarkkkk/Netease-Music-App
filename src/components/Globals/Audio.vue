<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAudioStore, usePlaylistStore } from 'stores'

const { audioRef, loop } = storeToRefs(useAudioStore())
const { updateAudioStatus, updateCurrentTime, updateDuration } = useAudioStore()
const { currentSong } = storeToRefs(usePlaylistStore())
</script>

<template>
    <audio
        ref="audioRef"
        :src="currentSong?.url"
        :loop="loop"
        @loadedmetadata="updateAudioStatus('not-ready')"
        @canplay="(e) => {
            updateDuration((e.target as HTMLAudioElement).duration)
            updateAudioStatus('can-play')
        }"
        @durationchange="(e) => updateDuration((e.target as HTMLAudioElement).duration)"
        @timeupdate="(e) => updateCurrentTime((e.target as HTMLAudioElement).currentTime)"
        @play="updateAudioStatus('playing')"
        @pause="updateAudioStatus('paused')"
        @waiting="updateAudioStatus('loading')"
        @playing="updateAudioStatus('playing')"
        @ended="updateAudioStatus('ended')"
    />
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { ONE_MINUTE } from 'common'
import { storeToRefs } from 'pinia'
import { useAudioStore, usePlaylistStore } from 'stores'
import { wait } from 'utils'

const { audioRef, loop, audioStatus, volume } = storeToRefs(useAudioStore())
const { updateAudioStatus, updateCurrentTime, updateDuration, setVolume } = useAudioStore()
const { currentSong } = storeToRefs(usePlaylistStore())
const hiddenAudioRef = ref<HTMLAudioElement>()

let reloadCount = 0
async function onError(e: any) {
    console.error(e)
    if (currentSong.value && currentSong.value.timestamp + 15 * ONE_MINUTE < Date.now()) {
        updateAudioStatus('error')
    } else {
        if (reloadCount < 3) {
            console.log('reload')
            await wait(1000)
            audioRef.value?.load()
        } else {
            updateAudioStatus('error')
            reloadCount = 0
        }
    }
}

onMounted(() => {
    if (!audioRef.value) return
    audioRef.value.volume = volume.value
    if (!hiddenAudioRef.value) return
    hiddenAudioRef.value.volume = 0.0001
})

watch(volume, (val) => {
    if (!audioRef.value) return
    console.log('volume changed')
    audioRef.value.volume = val
})
</script>

<template>
    <audio
        ref="audioRef"
        :src="currentSong?.url"
        autoplay
        :loop="loop"
        @error="onError"
        @loadeddata="updateAudioStatus('not-ready')"
        @canplay="
            (e) => {
                console.log('can play')
                updateDuration((e.target as HTMLAudioElement).duration)
                updateAudioStatus('can-play')
            }
        "
        @durationchange="(e) => updateDuration((e.target as HTMLAudioElement).duration)"
        @timeupdate="(e) => updateCurrentTime((e.target as HTMLAudioElement).currentTime)"
        @play="updateAudioStatus('playing')"
        @pause="
            () => {
                if (audioStatus !== 'error') {
                    updateAudioStatus('paused')
                }
            }
        "
        @waiting="updateAudioStatus('loading')"
        @playing="updateAudioStatus('playing')"
        @ended="updateAudioStatus('ended')"
        @volumechange="(e) => setVolume((e.target as HTMLMediaElement).volume)"
    />
    <!-- mitigate the safari issue: https://bugs.webkit.org/show_bug.cgi?id=261554 -->
    <audio
        ref="hiddenAudioRef"
        autoplay
        loop
        src="/music/example.mp3"
        type="audio/mpeg"
    />
</template>

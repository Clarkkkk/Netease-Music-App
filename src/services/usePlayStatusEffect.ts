import { ref, watch, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useAudioStore, useAuthStore, usePlaylistStore, usePreferenceStore } from 'stores'
import type { ApiScrobble } from '../api/ApiScrobble'
import { post } from '../utils/request'

export const usePlayStatusEffect = () => {
    const { loggedIn } = storeToRefs(useAuthStore())
    const { audioStatus, currentTime, duration } = storeToRefs(useAudioStore())
    const { updateAudioStatus, play } = useAudioStore()
    const { preference } = storeToRefs(usePreferenceStore())
    const { playlist, currentSong, nextSong, playMode } = storeToRefs(usePlaylistStore())
    const {
        appendSongs,
        updateSongUrl,
        switchToNextSong,
        updateCurrentSongStatus,
        updateCurrentSong,
        fetchRadioList
    } = usePlaylistStore()
    const loading = ref(false)

    async function getRadioList(): Promise<Song[]> {
        if (loading.value) return []

        loading.value = true
        try {
            return fetchRadioList()
        } finally {
            loading.value = false
        }
    }

    useFrequentLoadingEffect()

    // 当前歌曲准备就绪后自动播放
    watch(
        [currentSong, audioStatus],
        async () => {
            if (
                currentSong.value &&
                currentSong.value.url &&
                currentSong.value.status === 'waiting-to-play' &&
                audioStatus.value === 'can-play'
            ) {
                console.log('play current song')
                try {
                    await play()
                    updateCurrentSongStatus('playing')
                } catch (e) {
                    console.error(e)
                    console.log(typeof e)
                    updateCurrentSongStatus('play-failed')
                }
            }
        },
        { deep: true }
    )

    watch(audioStatus, (status) => {
        if (status === 'error') {
            console.log('loaded error, updating url')
            updateCurrentSong(currentSong.value)
        }
    })

    // 播放即将结束时，更新状态
    watchEffect(() => {
        if (
            currentTime.value &&
            duration.value &&
            currentTime.value + 10 > duration.value &&
            audioStatus.value === 'playing'
        ) {
            console.log('currentTime and duration')
            console.log(currentTime.value, duration.value)
            updateAudioStatus('almost-ended')
        }
    })

    // 播放开始或即将结束时，更新下一首歌的url；播放结束时，自动切换下一首
    watch(audioStatus, async () => {
        if (
            (audioStatus.value === 'almost-ended' || audioStatus.value === 'can-play') &&
            nextSong.value
        ) {
            console.log('update song url')
            console.log(audioStatus.value)
            try {
                await updateSongUrl(nextSong.value)
            } catch (e) {
                console.error(e)
            }
        } else if (audioStatus.value === 'ended') {
            console.log('play next')
            switchToNextSong()
        }
    })

    // 播放结束或切换歌曲时，上报歌曲的播放记录
    watch(
        [currentSong, audioStatus],
        ([currentSong, audioStatus]) => {
            if (!loggedIn.value || !preference.value.playTracing) return

            if (
                currentSong?.status === 'updating' &&
                currentTime.value > 10 &&
                audioStatus !== 'error' &&
                audioStatus !== 'ended'
            ) {
                post<ApiScrobble>('/scrobble', {
                    id: currentSong.id,
                    sourceid: currentSong.sourceid,
                    time: currentTime.value
                })
            }
        },
        {
            deep: true
        }
    )

    watch(audioStatus, (val) => {
        if (!loggedIn.value || !currentSong.value || !preference.value.playTracing) return

        if (val === 'ended') {
            post<ApiScrobble>('/scrobble', {
                id: currentSong.value.id,
                sourceid: currentSong.value.sourceid,
                time: duration.value
            })
        }
    })

    // 播放私人fm时，如果即将到达列表末尾，更新播放列表
    watch([loggedIn, playMode, currentSong], async ([loggedIn, playMode, currentSong]) => {
        if (!loggedIn || playMode !== 'radio' || !currentSong) return
        const listTail = playlist.value.slice(-2)
        if (listTail.includes(currentSong)) {
            console.log('updateList')
            const list = await getRadioList()
            if (list.length) {
                appendSongs(list)
            }
        }

        // 如果当前歌曲在播放列表末尾且播放结束
        // 更新播放列表后自动切换下一首
        if (
            listTail.at(-1)?.id === currentSong.id &&
            audioStatus.value === 'ended' &&
            currentSong.status === 'not-playing'
        ) {
            await switchToNextSong()
        }
    })

    // 时长不足30秒，自动切换下一首
    watch(duration, async (val) => {
        if (val > 0 && val < 31 && preference.value.skipShortSongs) {
            console.log(`${currentSong.value?.name} 时长 ${val} 秒，不足30秒，自动切换下一首`)
            await switchToNextSong()
        }
    })
}

// 如果播放一首歌时加载太频繁，就直接加载最后的部分
function useFrequentLoadingEffect() {
    const { audioStatus, currentTime, duration } = storeToRefs(useAudioStore())
    const { seek } = useAudioStore()
    const { currentSong } = storeToRefs(usePlaylistStore())

    const seeking = ref(false)
    let loadingCount = 0
    let lastTimestamp = 0

    watch(audioStatus, async (val) => {
        if (val === 'loading' && currentTime.value < 60 && !seeking.value) {
            loadingCount++
        }

        if (loadingCount > 2) {
            console.log('frequent loading, trying to load last part')
            loadingCount = 0
            seeking.value = true
            lastTimestamp = currentTime.value
            const seekPosition = duration.value - (duration.value - currentTime.value) / 3
            seek(seekPosition)
        }
    })

    watch(
        () => currentSong.value?.id,
        (newVal, oldVal) => {
            if (newVal && newVal !== oldVal && oldVal !== undefined) {
                loadingCount = 0
            }
        }
    )

    watchEffect(() => {
        if (audioStatus.value === 'can-play' && seeking.value) {
            console.log('seeking completed, recovering')
            seeking.value = false
            seek(lastTimestamp)
            lastTimestamp = 0
        }
    })
}

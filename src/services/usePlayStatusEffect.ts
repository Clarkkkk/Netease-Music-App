import { ref, watch, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useAudioStore, useAuthStore, usePlaylistStore } from 'stores'
import type { ApiScrobble } from '../api/ApiScrobble'
import { post } from '../utils/request'

export const usePlayStatusEffect = () => {
    const { loggedIn } = storeToRefs(useAuthStore())
    const { audioStatus, currentTime, duration } = storeToRefs(useAudioStore())
    const { updateAudioStatus, play } = useAudioStore()
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
            updateAudioStatus('almost-ended')
        }
    })

    // 播放开始或即将结束时，更新下一首歌的url；播放结束时，自动切换下一首
    watch(audioStatus, async () => {
        if (
            (audioStatus.value === 'almost-ended' || audioStatus.value === 'can-play') &&
            nextSong.value
        ) {
            console.log(audioStatus.value)
            try {
                await updateSongUrl(nextSong.value)
            } catch {}
        } else if (audioStatus.value === 'ended') {
            console.log('play next')
            switchToNextSong()
        }
    })

    // 播放结束或切换歌曲时，上报歌曲的播放记录
    watch(
        [currentSong, audioStatus],
        ([currentSong, audioStatus]) => {
            if (!loggedIn.value) return

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
        if (!loggedIn.value || !currentSong.value) return

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
    })
}

import { computed, nextTick, ref } from 'vue'
import type { ApiPersonalFm, ApiSongUrl } from 'api'
import { ONE_MINUTE } from 'common'
import { defineStore, storeToRefs } from 'pinia'
import { post, toHttps } from 'utils'
import { useAudioStore } from './useAudioStore'

export const usePlaylistStore = defineStore('playlist', () => {
    const playlist = ref<Song[]>([])
    const historyPlaylist = ref<Song[]>([])
    const currentSong = ref<Song | null>(null)
    const playMode = ref<'list-loop' | 'list-sequent' | 'song-loop' | 'radio' | 'radio-song-loop'>(
        'list-loop'
    )
    const { updateAudioStatus, setLoop } = useAudioStore()
    const { audioStatus } = storeToRefs(useAudioStore())

    const nextSong = computed(() => {
        if (!currentSong.value || !playlist.value.length) {
            return null
        } else if (playMode.value === 'song-loop') {
            return currentSong.value
        } else {
            const currentIndex = playlist.value.findIndex((item) => item === currentSong.value)
            if (currentIndex > -1) {
                if (playMode.value === 'list-loop') {
                    return playlist.value[(currentIndex + 1) % playlist.value.length]
                } else {
                    return playlist.value[currentIndex + 1] || null
                }
            } else {
                return null
            }
        }
    })

    const lastSong = computed(() => {
        if (!currentSong.value || !playlist.value.length) {
            return null
        } else if (playMode.value === 'song-loop') {
            return currentSong.value
        } else {
            const currentIndex = playlist.value.findIndex((item) => item === currentSong.value)
            if (currentIndex > -1) {
                if (playMode.value === 'list-loop') {
                    return playlist.value[
                        (currentIndex - 1 + playlist.value.length) % playlist.value.length
                    ]
                } else {
                    return playlist.value[currentIndex - 1] || null
                }
            } else {
                return null
            }
        }
    })

    async function updateCurrentSong(song: Song | null) {
        updateCurrentSongStatus('updating')
        // use async to trigger the watcher when updating
        await nextTick()

        if (song) {
            try {
                await updateSongUrl(song)
            } catch (e) {
                console.error(e)
                updateCurrentSongStatus('play-failed')
                updateAudioStatus('error')
                return
            }
        }
        currentSong.value = song

        updateAudioStatus('not-ready')
        updateCurrentSongStatus('waiting-to-play')
    }

    function updatePlayMode(mode: typeof playMode.value) {
        playMode.value = mode

        if (mode === 'song-loop' || mode === 'radio-song-loop') {
            setLoop(true)
        } else {
            setLoop(false)
        }
    }

    function updateCurrentSongStatus(status: Song['status']) {
        if (currentSong.value) {
            currentSong.value.status = status
        }
    }

    async function switchToNextSong() {
        if (audioStatus.value === 'ended' && !nextSong.value) {
            updateCurrentSongStatus('not-playing')
        } else if (
            !currentSong.value ||
            playMode.value === 'song-loop' ||
            !nextSong.value ||
            nextSong.value.id === currentSong.value.id
        ) {
            // do nothing
        } else {
            updateCurrentSongStatus('not-playing')
            const currentNextSong = nextSong.value
            try {
                await updateCurrentSong(nextSong.value)
            } catch {
                if (nextSong.value && nextSong.value.id !== currentNextSong.id) {
                    await updateCurrentSong(nextSong.value)
                }
            }
        }
    }

    async function switchToLastSong() {
        if (
            !currentSong.value ||
            playlist.value.length <= 1 ||
            playMode.value === 'song-loop' ||
            !lastSong.value
        ) {
            // do nothing
        } else {
            updateCurrentSongStatus('not-playing')
            const currentLastSong = lastSong.value
            try {
                await updateCurrentSong(currentLastSong)
            } catch {
                if (lastSong.value && lastSong.value.id !== currentLastSong.id) {
                    await updateCurrentSong(lastSong.value)
                }
            }
        }
    }

    async function switchToThisSong(song: Song) {
        // TODO: handle url error
        const songInList = playlist.value.find((item) => item.id === song.id)
        if (playMode.value === 'radio') {
            if (songInList && songInList !== currentSong.value) {
                await updateCurrentSong(songInList)
            }

            if (!songInList) {
                await switchToThisList([song])
            }
        } else {
            if (songInList) {
                updateCurrentSongStatus('not-playing')
                await updateCurrentSong(songInList)
            } else {
                insertSongToNext(song)
                await updateCurrentSong(song)
            }
        }
    }

    async function switchToThisList(list: Song[], shouldPlay?: Song) {
        // TODO: handle url error
        historyPlaylist.value = playlist.value
        playlist.value = list.slice()
        await updateCurrentSong(shouldPlay || list[0] || null)
        updatePlayMode('list-loop')
    }

    async function switchToRadio() {
        if (playMode.value === 'radio') return
        const list = await fetchRadioList()
        historyPlaylist.value = playlist.value
        playlist.value = list
        for (const song of list) {
            try {
                await updateCurrentSong(song)
                break
            } catch {
                continue
            }
        }
        updatePlayMode('radio')
    }

    async function appendSongs(payload: Song | Song[]) {
        const firstAppend = !playlist.value.length
        if (Array.isArray(payload)) {
            playlist.value.push(...payload)
        } else {
            playlist.value.push(payload)
        }
        if (firstAppend) {
            for (const song of playlist.value) {
                try {
                    await updateCurrentSong(song)
                    break
                } catch {
                    continue
                }
            }
        }
    }

    function insertSongToNext(song: Song) {
        const currentIndex = playlist.value.findIndex((item) => item === currentSong.value)
        if (!playlist.value.length || currentIndex + 1 === playlist.value.length) {
            playlist.value.push(song)
        } else {
            playlist.value.splice(currentIndex + 1, 0, song)
        }
    }

    async function removeSong(song: Song) {
        const index = playlist.value.findIndex((item) => item === song)
        const current = currentSong.value

        playlist.value.splice(index, 1)

        if (song === current) {
            await switchToNextSong()
        }
    }

    async function fetchRadioList(): Promise<Song[]> {
        const res = await post<ApiPersonalFm>('/personal_fm')
        return res.data.map((item) => {
            return {
                id: item.id,
                name: `${item.name}`,
                subName: `${item.alias[0] || item.transName}`,
                artist: item.artists[0].name,
                album: item.album.name,
                cover: toHttps(item.album.picUrl),
                artistId: item.artists[0].id,
                albumId: item.album.id,
                timestamp: Date.now(),
                url: '',
                status: 'not-playing'
            }
        })
    }

    function resetPlaylist() {
        playlist.value = []
    }

    async function restoreHistoryPlaylist(shouldPlay?: Song) {
        const history = historyPlaylist.value
        historyPlaylist.value = playlist.value
        playlist.value = history
        await updateCurrentSong(shouldPlay || playlist.value[0] || null)
    }

    async function updateSongUrl(payload: Song | Song[]) {
        if (Array.isArray(payload)) {
            const needUpdateArr = payload.filter(
                (item) => !item.url || item.timestamp + 15 * ONE_MINUTE > Date.now()
            )
            const res = await post<ApiSongUrl>('/song/url', {
                id: needUpdateArr.map((item) => item.id).join(','),
                br: 320000
            })
            const validData = res.data.filter((item) => item.url)
            needUpdateArr.forEach((item) => {
                const data = validData.find((d) => d.id === item.id)
                if (data) {
                    item.url = toHttps(data.url)
                    item.timestamp = Date.now()
                }
            })
        } else {
            if (!payload.url || payload.timestamp + 15 * ONE_MINUTE < Date.now()) {
                const res = await post<ApiSongUrl>('/song/url', { id: payload.id, br: 320000 })
                if (res.data[0].url) {
                    payload.url = toHttps(res.data[0].url)
                    payload.timestamp = Date.now()
                } else {
                    await removeSong(payload)
                    console.error(`Song url is ${res.data[0].url}`)
                    throw new Error('can not find song url')
                }
            }
        }
    }

    return {
        playlist,
        currentSong,
        lastSong,
        nextSong,
        playMode,
        updateCurrentSong,
        updatePlayMode,
        updateCurrentSongStatus,
        switchToNextSong,
        switchToLastSong,
        switchToThisSong,
        switchToThisList,
        switchToRadio,
        resetPlaylist,
        fetchRadioList,
        appendSongs,
        insertSongToNext,
        removeSong,
        restoreHistoryPlaylist,
        updateSongUrl
    }
})

import { ref } from 'vue'
import type { ApiPlaylistDetail, ApiSongDetail } from 'api'
import { post, toHttps } from 'utils'

export function useSonglist() {
    const info = ref<ApiPlaylistDetail['return']['playlist'] | null>(null)
    const songlist = ref<Song[]>([])
    const songlistId = ref(0)
    const songIdList = ref<number[]>([])
    const more = ref(true)
    const offset = ref(0)
    const loading = ref(false)
    const PAGE_SIZE = 30

    async function initSonglist(id: number) {
        if (loading.value) return
        try {
            const res = await getSonglistDetail(id)
            songlistId.value = id
            info.value = res.info
            songIdList.value = res.songIdList
            songlist.value = res.songlist
            more.value = res.more
            offset.value = res.songlist.length
        } finally {
            loading.value = false
        }
    }

    async function onIncrementalLoad() {
        if (loading.value || !more.value) return
        loading.value = true
        try {
            const ids = songIdList.value.slice(
                offset.value,
                Math.min(offset.value + PAGE_SIZE, songIdList.value.length)
            )
            const list = await getSongsByIds(ids, songlistId.value)
            more.value = offset.value + PAGE_SIZE < songIdList.value.length
            offset.value = offset.value + PAGE_SIZE
            songlist.value.push(...list)
        } finally {
            loading.value = false
        }
    }

    async function onFullLoad() {
        if (!more.value) return

        const ids = songIdList.value.slice(offset.value)
        const list = await getSongsByIds(ids, songlistId.value)
        more.value = false
        offset.value = songIdList.value.length
        songlist.value.push(...list)
    }

    function reset() {
        info.value = null
        songlist.value = []
        more.value = true
        offset.value = 0
        songIdList.value = []
    }

    return {
        info,
        songlist,
        loading,
        more,
        initSonglist,
        onIncrementalLoad,
        onFullLoad,
        reset
    }
}

function getSongsByIds(ids: number[], songlistId: number) {
    return post<ApiSongDetail>('/song/detail', {
        ids: ids.join(',')
    }).then(({ songs }) => {
        const list: Song[] = songs.map((item) => {
            return {
                id: item.id,
                name: item.name,
                subName: item.alia[0] || '',
                artist: item.ar[0]?.name || '',
                artistId: item.ar[0]?.id || 0,
                album: item.al.name,
                cover: toHttps(item.al.picUrl) || '',
                albumId: item.al.id,
                sourceid: songlistId,
                timestamp: 0,
                url: '',
                status: 'not-playing'
            }
        })
        return list
    })
}

function getSonglistDetail(id: number) {
    return post<ApiPlaylistDetail>('/playlist/detail', {
        id,
        s: 1
    }).then((res) => {
        return {
            info: res.playlist,
            songIdList: res.playlist.trackIds.map((item) => item.id),
            more: res.playlist.trackIds.length > res.playlist.tracks.length,
            songlist: res.playlist.tracks.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    subName: item.alia[0] || '',
                    artist: item.ar[0]?.name || '',
                    artistId: item.ar[0]?.id || 0,
                    album: item.al.name,
                    albumId: item.al.id,
                    cover: toHttps(item.al.picUrl) || '',
                    sourceid: id,
                    timestamp: 0,
                    url: '',
                    status: 'not-playing'
                } as Song
            })
        }
    })
}

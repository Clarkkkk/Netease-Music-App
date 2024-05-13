import { ref } from 'vue'
import type { ApiAlbum, ApiAlbumDetailDynamic } from 'api'
import { post, toHttps } from 'utils'

export function useAlbum() {
    const info = ref<ApiAlbum['return']['album'] | null>(null)
    const album = ref<Song[]>([])
    const extraInfo = ref<ApiAlbumDetailDynamic['return'] | null>(null)

    async function initAlbum(id: number) {
        const res = await post<ApiAlbum>('/album', { id })
        info.value = res.album
        album.value = res.songs.map((item) => {
            return {
                id: item.id,
                name: item.name,
                subName: item.alia[0] || '',
                artist: item.ar[0]?.name || '',
                artistId: item.ar[0]?.id || 0,
                album: item.al.name,
                albumId: item.al.id,
                cover: toHttps(item.al.picUrl) || '',
                sourceid: res.album.id,
                timestamp: 0,
                url: '',
                status: 'not-playing'
            }
        })

        updateExtraInfo(id)
    }

    async function updateExtraInfo(id: number) {
        const res = await post<ApiAlbumDetailDynamic>('/album/detail/dynamic', { id })
        extraInfo.value = res
    }

    return {
        album,
        info,
        extraInfo,
        initAlbum,
        updateExtraInfo
    }
}

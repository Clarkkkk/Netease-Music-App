import { ref } from 'vue'
import type { ApiFmTrash, ApiLike, ApiLikelist } from 'api'
import { defineStore, storeToRefs } from 'pinia'
import { get, post } from 'utils'
import { usePlaylistStore } from './usePlaylistStore'
import { useProfileStore } from './useProfileStore'

export const useLikeStore = defineStore('like', () => {
    const likeList = ref<number[]>([])
    const { profile } = storeToRefs(useProfileStore())
    const { removeSong, switchToNextSong } = usePlaylistStore()

    function getLikeStatus(song: Song) {
        return !!likeList.value.find((item) => item === song.id)
    }

    async function switchLikeStatus(song: Song) {
        const liking = getLikeStatus(song)
        await get<ApiLike>('/like', { id: song.id, like: !liking })
        if (profile.value?.profile.userId) {
            await fetchLikeList(profile.value.profile.userId)
        }
    }

    async function dislikeThisSong(song: Song) {
        await post<ApiFmTrash>('/fm_trash', { id: song.id })
        await switchToNextSong()
        await removeSong(song)
    }

    async function fetchLikeList(uid: number) {
        return post<ApiLikelist>('/likelist', { uid }).then((res) => {
            likeList.value = res.ids
        })
    }

    return {
        likeList,
        getLikeStatus,
        switchLikeStatus,
        dislikeThisSong,
        fetchLikeList
    }
})

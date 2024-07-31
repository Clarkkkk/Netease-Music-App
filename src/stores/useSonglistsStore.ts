import { ref } from 'vue'
import type { ApiUserPlaylist, ApiUserSubcount } from 'api'
import { defineStore, storeToRefs } from 'pinia'
import { post } from 'utils'
import { useProfileStore } from './useProfileStore'

export const useSonglistsStore = defineStore('songlists', () => {
    const { profile } = storeToRefs(useProfileStore())
    const createdCount = ref(0)
    const collectedCount = ref(0)
    const createdSonglists = ref<ApiUserPlaylist['return']['playlist']>([])
    const collectedSonglists = ref<ApiUserPlaylist['return']['playlist']>([])

    async function updateCount() {
        if (!profile.value?.profile.userId) return
        const res = await post<ApiUserSubcount>('/user/subcount')
        createdCount.value = res.createdPlaylistCount
        collectedCount.value = res.subPlaylistCount
    }

    async function updateSonglists() {
        if (!profile.value?.profile.userId) return
        await updateCount()
        const res = await post<ApiUserPlaylist>('/user/playlist', {
            uid: profile.value.profile.userId,
            offset: 0
        })
        createdSonglists.value = createdSonglists.value.concat(
            res.playlist.slice(1, createdCount.value)
        )
        collectedSonglists.value = collectedSonglists.value.concat(
            res.playlist.slice(createdCount.value)
        )
    }

    return {
        updateSonglists,
        createdSonglists,
        collectedSonglists
    }
})

import { watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useLikeStore, useProfileStore } from 'stores'

export function useLikeEffect() {
    const { fetchLikeList } = useLikeStore()
    const { profile } = storeToRefs(useProfileStore())

    watchEffect(async () => {
        if (profile.value?.profile.userId) {
            await fetchLikeList(profile.value.profile.userId)
        }
    })
}

import { watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useLikeStore, useProfileStore } from 'stores'

export function useLikeEffect() {
    const { fetchLikeList } = useLikeStore()
    const { profile } = storeToRefs(useProfileStore())

    let initialized = false

    watchEffect(async () => {
        if (profile.value?.profile.userId && !initialized) {
            initialized = true
            await fetchLikeList(profile.value.profile.userId)
        }
    })
}

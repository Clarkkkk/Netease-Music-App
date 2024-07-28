import { watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useProfileStore, useSonglistsStore } from 'stores'

export function useSonglistsEffect() {
    const { updateSonglists } = useSonglistsStore()
    const { profile } = storeToRefs(useProfileStore())

    let initialized = false
    watchEffect(async () => {
        if (profile.value?.profile.userId && !initialized) {
            initialized = true
            await updateSonglists()
        }
    })
}

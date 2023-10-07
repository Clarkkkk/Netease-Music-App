import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore, useProfileStore } from 'stores'

export function useLoginService() {
    const { profile } = storeToRefs(useProfileStore())
    const { loggedIn } = storeToRefs(useAuthStore())
    const cookies = useCookie('MUSIC_U')
    console.log(cookies.value)

    function onLoggedIn(callback: () => void) {
        watch(
            loggedIn,
            (val) => {
                if (val) {
                    callback()
                }
            },
            { immediate: true }
        )
    }

    function onProfileLoaded(callback: (p: NonNullable<typeof profile.value>) => void) {
        watch(
            profile,
            (val) => {
                if (val) {
                    callback(val)
                }
            },
            { immediate: true }
        )
    }

    return {
        onLoggedIn,
        onProfileLoaded
    }
}

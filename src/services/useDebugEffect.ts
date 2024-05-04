import { watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useEruda } from 'services'
import { usePreferenceStore } from 'stores'

export function useDebugEffect() {
    const { preference } = storeToRefs(usePreferenceStore())
    const { startEruda, stopEruda } = useEruda()

    watchEffect(() => {
        if (preference.value.enableDebugMode) {
            startEruda()
        } else {
            stopEruda()
        }
    })
}

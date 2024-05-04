import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

interface Preference {
    skipShortSongs: boolean
    enableDebugMode: boolean
}

export const usePreferenceStore = defineStore('preference', () => {
    const preference = useStorage<Preference>('music-user-preference', {
        skipShortSongs: false,
        enableDebugMode: false
    })

    function updatePreference(val: Partial<Preference>) {
        preference.value = { ...preference.value, ...val }
    }

    return {
        preference,
        updatePreference
    }
})

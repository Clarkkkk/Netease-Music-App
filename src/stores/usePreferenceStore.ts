import { watchEffect } from 'vue'
import { useStorage } from '@vueuse/core'
import { STORAGE_VERSION } from 'common'
import { defineStore } from 'pinia'

interface Preference {
    skipShortSongs: boolean
    enableDebugMode: boolean
    lightTheme: string
    darkTheme: string
    lightDarkThemeToggleStrategy: 'system' | 'time' | 'manual' | 'never'
    __VERSION__: number
}

export const usePreferenceStore = defineStore('preference', () => {
    const preference = useStorage<Preference>('music-user-preference', {
        skipShortSongs: false,
        enableDebugMode: false,
        lightTheme: 'light',
        darkTheme: 'dark',
        lightDarkThemeToggleStrategy: 'system',
        __VERSION__: STORAGE_VERSION
    })

    function updatePreference(val: Partial<Preference>) {
        preference.value = { ...preference.value, ...val }
    }

    watchEffect(() => {
        if (preference.value.__VERSION__ !== STORAGE_VERSION) {
            updatePreference({
                skipShortSongs: false,
                enableDebugMode: false,
                lightTheme: 'light',
                darkTheme: 'dark',
                lightDarkThemeToggleStrategy: 'system',
                __VERSION__: STORAGE_VERSION
            })
        }
    })

    return {
        preference,
        updatePreference
    }
})

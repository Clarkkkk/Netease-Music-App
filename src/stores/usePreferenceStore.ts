import { watchEffect } from 'vue'
import { useStorage } from '@vueuse/core'
import { STORAGE_VERSION } from 'common'
import { defineStore } from 'pinia'

interface Preference {
    skipShortSongs: boolean
    playTracing: boolean
    enableDebugMode: boolean
    lightTheme: string
    darkTheme: string
    lightDarkThemeToggleStrategy: 'system' | 'time' | 'manual' | 'never'
    __VERSION__: number
}

export const usePreferenceStore = defineStore('preference', () => {
    const preference = useStorage<Preference>('music-user-preference', {
        skipShortSongs: false,
        playTracing: true,
        enableDebugMode: false,
        lightTheme: 'light',
        darkTheme: 'dark',
        lightDarkThemeToggleStrategy: 'system',
        __VERSION__: STORAGE_VERSION
    })

    function updatePreference(val: Partial<Preference>) {
        preference.value = { ...preference.value, ...val }
    }

    watchEffect(async () => {
        if (preference.value.__VERSION__ !== STORAGE_VERSION) {
            const { z } = await import('zod')
            const preferenceSchema = z
                .object({
                    skipShortSongs: z.boolean(),
                    playTracing: z.boolean(),
                    enableDebugMode: z.boolean(),
                    lightTheme: z.string(),
                    darkTheme: z.string(),
                    lightDarkThemeToggleStrategy: z.union([
                        z.literal('system'),
                        z.literal('time'),
                        z.literal('manual'),
                        z.literal('never')
                    ]),
                    __VERSION__: z.number()
                })
                .partial()

            if (!preferenceSchema.safeParse(preference.value).success) {
                // if we are doing breaking change, reset all the preferences
                updatePreference({
                    skipShortSongs: false,
                    playTracing: true,
                    enableDebugMode: false,
                    lightTheme: 'light',
                    darkTheme: 'dark',
                    lightDarkThemeToggleStrategy: 'system',
                    __VERSION__: STORAGE_VERSION
                })
            } else {
                // if we are just adding a new preference, keep the user preference
                updatePreference({
                    skipShortSongs: false,
                    playTracing: true,
                    enableDebugMode: false,
                    lightTheme: 'light',
                    darkTheme: 'dark',
                    lightDarkThemeToggleStrategy: 'system',
                    ...(preference.value as Partial<Preference>),
                    __VERSION__: STORAGE_VERSION
                })
            }
        }
    })

    return {
        preference,
        updatePreference
    }
})

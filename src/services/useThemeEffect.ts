import { watchEffect, watchSyncEffect } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { usePreferenceStore } from 'stores'
import { lightThemeOptions } from 'src/pages/Setting/themes'

export function useThemeEffect() {
    const isDarkScheme = useMediaQuery('(prefers-color-scheme: dark)')
    const { preference } = storeToRefs(usePreferenceStore())

    watchEffect(() => {
        if (
            preference.value.lightDarkThemeToggleStrategy !== 'never' &&
            !lightThemeOptions.map((item) => item.value).includes(preference.value.lightTheme)
        ) {
            preference.value.lightTheme = lightThemeOptions[0].value
        }
    })

    watchSyncEffect(() => {
        if (preference.value.lightDarkThemeToggleStrategy !== 'system') return

        if (isDarkScheme.value) {
            document.documentElement.setAttribute('data-theme', preference.value.darkTheme)
        } else {
            document.documentElement.setAttribute('data-theme', preference.value.lightTheme)
        }
    })
}

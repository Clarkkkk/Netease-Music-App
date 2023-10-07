import { computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'

export const useDeviceType = () => {
    const isPc = ref(true) // useMediaQuery('(min-width: 640px)')

    const isMobile = computed(() => {
        return !isPc.value
    })

    return {
        isPc,
        isMobile
    }
}

import { ref, watch } from 'vue'

export function useSearchEffect(config: {
    getKeyword: () => string
    getActive: () => boolean
    effect: (keyword: string) => void
}) {
    const { getKeyword, getActive, effect } = config
    const internalKeyword = ref('')

    watch([getActive, getKeyword], ([val]) => {
        if (val) {
            internalKeyword.value = getKeyword()
        }
    })

    watch(internalKeyword, (val) => {
        if (val) {
            effect(val)
        }
    })
}

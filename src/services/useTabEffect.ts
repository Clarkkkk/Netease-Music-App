import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTabStore } from 'src/stores/useTabStore'

export function useTabEffect() {
    const route = useRoute()
    const { updateTabState } = useTabStore()

    watch(route, (val) => {
        if (val.path.includes('songlist')) {
            updateTabState({ songlist: val.path })
        } else if (val.path.includes('album')) {
            updateTabState({ album: val.path })
        } else if (val.path.includes('artist')) {
            updateTabState({ artist: val.path })
        }
    })
}

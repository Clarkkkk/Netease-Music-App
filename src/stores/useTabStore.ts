import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTabStore = defineStore('tab', () => {
    const tabState = ref({
        songlist: '',
        album: '',
        artist: ''
    })

    function updateTabState(state: Partial<typeof tabState.value>) {
        tabState.value = { ...tabState.value, ...state }
    }

    return {
        tabState,
        updateTabState
    }
})

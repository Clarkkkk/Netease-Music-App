import { onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAudioStore } from 'src/stores'

export function useGlobalKeyboardListeners() {
    const { play, pause, playAgain } = useAudioStore()
    const { audioStatus } = storeToRefs(useAudioStore())
    function switchPlay() {
        if (audioStatus.value === 'ended') {
            playAgain()
        } else if (['can-play', 'paused'].includes(audioStatus.value)) {
            play()
        } else if (
            ['playing', 'almost-ended', 'loading', 'not-ready'].includes(audioStatus.value)
        ) {
            pause()
        }
    }

    function onSpaceUp(e: KeyboardEvent) {
        // play/pause when space is pressed and no input is focused
        if (e.code === 'Space' && document.activeElement?.tagName !== 'INPUT') {
            e.preventDefault()
            switchPlay()
        }
    }
    onMounted(() => {
        document.addEventListener('keydown', onSpaceUp)
    })

    onUnmounted(() => document.removeEventListener('keydown', onSpaceUp))
}

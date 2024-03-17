import { onDeactivated, ref } from 'vue'

export const useIsHovering = () => {
    const isHovering = ref(false)

    function onMouseEnter() {
        isHovering.value = true
    }

    function onMouseLeave() {
        isHovering.value = false
    }

    onDeactivated(() => {
        isHovering.value = false
    })

    return {
        isHovering,
        onMouseEnter,
        onMouseLeave
    }
}

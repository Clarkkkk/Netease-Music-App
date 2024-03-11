import { onDeactivated, ref } from 'vue'

export const useIsHovering = () => {
    const isHovering = ref(false)
    let count = 0

    function onMouseEnter() {
        isHovering.value = true
        count++
    }

    function onMouseLeave() {
        count--
        setTimeout(() => {
            if (count <= 0) {
                isHovering.value = false
                count = 0
            }
        }, 500)
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

import type { ComputedRef, CSSProperties, Ref } from 'vue'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { debounce } from 'lodash'
import { minmax } from 'utils'

interface MusicBarData {
    current: Ref<number>
    duration: Ref<number>
    containerElement: Ref<HTMLElement>
    onChange: (val: number) => void
}

export const useHeadlessMusicBar = ({
    current,
    duration,
    containerElement,
    onChange
}: MusicBarData) => {
    const isPointerDown = ref(false)
    const percentage = ref(current.value / (duration.value || 1))
    const rect = ref(containerElement.value.getBoundingClientRect())

    const updateRect = debounce(() => {
        rect.value = containerElement.value.getBoundingClientRect()
    }, 300)
    const observer = new ResizeObserver(updateRect)

    onMounted(() => {
        observer.observe(containerElement.value)
        window.addEventListener('resize', updateRect)
    })

    onUnmounted(() => {
        observer.disconnect()
        window.removeEventListener('resize', updateRect)
    })

    const thumbStyle: ComputedRef<CSSProperties> = computed(() => {
        return {
            transform: `translateX(-50%)`,
            position: 'relative',
            zIndex: '10',
            cursor: isPointerDown.value ? 'grabbing' : 'grab',
            flex: '0 0 auto',
            display: 'flex',
            justifyContent: 'center'
        }
    })

    const rangeStyle: ComputedRef<CSSProperties> = computed(() => {
        return {
            width: `${rect.value.width * percentage.value}px`,
            flex: '0 0 auto',
            position: 'relative'
        }
    })

    const tooltipStyle: ComputedRef<CSSProperties> = computed(() => {
        return {
            position: 'relative',
            zIndex: '10',
            transition: 'opacity 300ms',
            opacity: isPointerDown.value ? 0.9 : 0,
            flex: '0 0 auto',
            pointerEvents: 'none',
            width: 'max-content',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    })

    function onPointerDown(event: Event) {
        const target = event.target as HTMLElement
        isPointerDown.value = true

        const relativeLeft = (event as any).clientX - rect.value.left

        percentage.value = minmax(relativeLeft / rect.value.width, { min: 0, max: 1 })
        target.setPointerCapture((event as any).pointerId)
    }

    function onPointerMove(event: Event) {
        if (isPointerDown.value) {
            const relativeLeft = (event as any).clientX - rect.value.left

            percentage.value = minmax(relativeLeft / rect.value.width, { min: 0, max: 1 })
        }
    }

    function onPointerUp() {
        isPointerDown.value = false
        onChange(duration.value * percentage.value)
    }

    // avoid pointercancel event on mobile devices: https://stackoverflow.com/questions/66621894/setpointercapture-is-cancelled-on-mobile-devices-gestures-take-over
    function onTouchStart(event: Event) {
        event.preventDefault()
    }

    watch([current, duration], ([newCurrent, newDuration]) => {
        if (isPointerDown.value) return
        percentage.value = newCurrent / (newDuration || 1)
    })

    return {
        progress: percentage,
        thumbStyle,
        rangeStyle,
        tooltipStyle,
        onPointerDown,
        onPointerMove,
        onPointerUp,
        onTouchStart
    }
}

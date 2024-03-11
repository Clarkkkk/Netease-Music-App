/* eslint-disable prettier/prettier */
import type { ComputedRef, CSSProperties, Ref } from 'vue'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { debounce } from 'lodash'
import { minmax } from 'utils'

interface HeadlessSliderProps {
    currentPosition: Ref<number>
    totalLength: Ref<number>
    containerElement: Ref<HTMLElement | undefined>
    onChange: (val: number) => void
    /** 方向，`horizontal`表示从左往右，`vertical`表示从下往上 */
    direction?: 'horizontal' | 'vertical'
}

export const useHeadlessSlider = ({
    currentPosition,
    totalLength,
    containerElement,
    onChange,
    direction
}: HeadlessSliderProps) => {
    direction = direction || 'horizontal'
    const isPointerDown = ref(false)
    const percentage = ref(currentPosition.value / (totalLength.value || 1))
    const rect = ref(containerElement.value?.getBoundingClientRect())

    const updateRect = debounce(() => {
        if (!containerElement.value) return
        rect.value = containerElement.value.getBoundingClientRect()
    }, 300)
    const observer = new ResizeObserver(updateRect)

    onMounted(() => {
        if (!containerElement.value) return
        observer.observe(containerElement.value)
        window.addEventListener('resize', updateRect)
    })

    onUnmounted(() => {
        observer.disconnect()
        window.removeEventListener('resize', updateRect)
    })

    const thumbStyle: ComputedRef<CSSProperties> = computed(() => {
        return {
            transform: direction === 'horizontal' ? 'translateX(-50%)' : 'translateY(50%)',
            position: 'relative',
            zIndex: '10',
            cursor: isPointerDown.value ? 'grabbing' : 'grab',
            flex: '0 0 auto',
            display: 'flex',
            justifyContent: 'center'
        }
    })

    const rangeStyle: ComputedRef<CSSProperties> = computed(() => {
        if (!rect.value) {
            return {}
        }
        return direction === 'horizontal'
            ? {
                width: `${rect.value.width * percentage.value}px`,
                flex: '0 0 auto',
                position: 'relative'
            }
            : {
                height: `${rect.value.height * percentage.value}px`,
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
        if (!rect.value) return

        const target = event.target as HTMLElement
        isPointerDown.value = true

        console.log(event)
        if (direction === 'horizontal') {
            const relativeLeft = (event as any).clientX - rect.value.left
            percentage.value = minmax(relativeLeft / rect.value.width, { min: 0, max: 1 })
        } else {
            const relativeBottom = rect.value.bottom - (event as any).clientY
            console.log(relativeBottom)
            percentage.value = minmax(relativeBottom / rect.value.height, { min: 0, max: 1 })
        }

        target.setPointerCapture((event as any).pointerId)
    }

    function onPointerMove(event: Event) {
        if (!rect.value) return
        if (isPointerDown.value) {
            if (direction === 'horizontal') {
                const relativeLeft = (event as any).clientX - rect.value.left
                percentage.value = minmax(relativeLeft / rect.value.width, { min: 0, max: 1 })
            } else {
                const relativeBottom = rect.value.bottom - (event as any).clientY
                percentage.value = minmax(relativeBottom / rect.value.height, { min: 0, max: 1 })
            }
        }
    }

    function onPointerUp() {
        isPointerDown.value = false
        onChange(totalLength.value * percentage.value)
    }

    // avoid pointercancel event on mobile devices: https://stackoverflow.com/questions/66621894/setpointercapture-is-cancelled-on-mobile-devices-gestures-take-over
    function onTouchStart(event: Event) {
        event.preventDefault()
    }

    watch([currentPosition, totalLength], ([newCurrentPosition, newLength]) => {
        if (isPointerDown.value) return
        percentage.value = newCurrentPosition / (newLength || 1)
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

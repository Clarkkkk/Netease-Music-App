<script setup lang="ts">
import { usePrefetch } from 'vue-route-prefetch'
import { useRouter } from 'vue-router'
import { useIsHovering } from 'services'
import { Image } from 'components'

interface AlbumItemProps {
    name: string
    subName: string
    artist: string
    artistPicUrl: string
    id: number
    picUrl: string
    createTime: number
}

defineProps<AlbumItemProps>()

const { isHovering, onMouseEnter, onMouseLeave } = useIsHovering()
const { prefetchRoute } = usePrefetch()
const router = useRouter()

function mouseenterHandler() {
    onMouseEnter()
    prefetchRoute('/album/:id')
}
</script>

<template>
    <li
        :key="id"
        :class="[
            'mb-8',
            'rounded',
            'transition-all',
            'duration-500',
            'cursor-pointer',
            'contain-[layout_style]',
            { '-translate-y-1': isHovering }
        ]"
        @mouseenter="mouseenterHandler"
        @mouseleave="onMouseLeave"
        @click="router.push(`/album/${id}`)"
    >
        <Image
            :class="[
                'absolute',
                'z-0',
                'h-full',
                'w-full',
                'rounded',
                isHovering ? 'opacity-50' : 'opacity-0',
                isHovering ? 'blur-2xl' : 'blur'
            ]"
            :src="picUrl"
            :size="200"
            loading="lazy"
        />

        <div class="absolute h-full w-full overflow-hidden rounded content-auto">
            <Image
                :src="picUrl"
                class="h-full w-full rounded blur-xl"
                :size="200"
                loading="lazy"
            />
        </div>
        <Image
            :src="picUrl"
            class="relative aspect-square flex-fixed rounded-t"
            :size="200"
            loading="lazy"
        />
        <div
            class="relative h-[72px] w-full rounded-b bg-base-100/90 p-2 text-sm text-base-content content-auto md:p-4"
        >
            <div
                class="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold text-base-content/90"
            >
                {{ name }}
            </div>
            <div
                class="mt-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-base-content/90"
            >
                {{ artist }}
            </div>
        </div>
    </li>
</template>

<style lang="scss"></style>

<script setup lang="ts">
import { usePrefetch } from 'vue-route-prefetch'
import { useRouter } from 'vue-router'
import { useIsHovering } from 'services'
import { Image } from 'components'

interface ListCoverProps {
    name: string
    picUrl: string
    id: number
    count: number
    creator: string
    creatorAvatar: string
}

defineProps<ListCoverProps>()

const { isHovering, onMouseEnter, onMouseLeave } = useIsHovering()
const router = useRouter()
const { prefetchRoute } = usePrefetch()

function mouseenterHandler() {
    onMouseEnter()
    prefetchRoute('/songlist/:id')
}

async function onClick(id: number) {
    await router.push(`/songlist/${id}`)
}
</script>

<template>
    <li
        :key="id"
        :class="[
            'songlist-item',
            'mb-4',
            'rounded',
            'transition-all',
            'duration-500',
            'flex',
            'items-center',
            'h-24',
            'cursor-pointer',
            'relative',
            'contain-[layout_style]',
            { '-translate-y-1': isHovering }
        ]"
        @mouseenter="mouseenterHandler"
        @mouseleave="onMouseLeave"
        @click="onClick(id)"
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
            :size="100"
        />

        <div class="absolute h-full w-full overflow-hidden rounded">
            <Image
                :src="picUrl"
                class="h-full w-full rounded blur-xl"
                :size="100"
            />
        </div>
        <Image
            :src="picUrl"
            class="relative aspect-square h-full flex-fixed rounded-l"
            :size="100"
        />
        <div
            class="relative h-full w-full rounded-r bg-base-100/90 p-2 text-sm text-base-content md:p-4"
        >
            <div
                class="text-sm text-base-content/90 sm:text-xs sm:font-bold md:text-sm md:font-normal lg:text-xs lg:font-bold xl:text-sm xl:font-normal"
            >
                {{ name }}
            </div>
            <div class="mt-1 flex items-center">
                <Image
                    :src="creatorAvatar"
                    class="mr-1 h-4 w-4 rounded-full"
                    :size="32"
                />
                <div class="text-xs text-base-content/90">
                    {{ creator }}
                </div>
            </div>
        </div>
    </li>
</template>

<style lang="scss">
.songlist-item {
    width: 100%;
}

@media (min-width: 640px) {
    .songlist-item {
        width: calc(50% - 5px);

        &:nth-child(2n + 1) {
            margin-right: 10px;
        }
    }
}
</style>

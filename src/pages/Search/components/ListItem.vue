<script setup lang="ts">
import { usePrefetch } from 'vue-route-prefetch'
import { useRouter } from 'vue-router'
import { useAlbum, useDeviceType, useIsHovering, useSonglist } from 'services'
import { usePlaylistStore } from 'stores'
import { Button, Image } from 'components'

interface SonglistItem {
    name: string
    creator: string
    cover: string
    id: number
}

const props = defineProps<{ listItem: SonglistItem; type: 'songlist' | 'album' | 'artist' }>()
const { isHovering, onMouseEnter, onMouseLeave } = useIsHovering()
const { isPc } = useDeviceType()
const { switchToThisList } = usePlaylistStore()
const { initSonglist, songlist, onFullLoad } = useSonglist()
const { album, initAlbum } = useAlbum()
const router = useRouter()
const { prefetchRoute } = usePrefetch()

function mouseenterHandler() {
    onMouseEnter()
    prefetchRoute(`/${props.type}/:id`)
}

async function onPlayList(id: number) {
    if (props.type === 'songlist') {
        await initSonglist(id)
        await onFullLoad()
        switchToThisList(songlist.value)
    } else if (props.type === 'album') {
        await initAlbum(id)
        await switchToThisList(album.value)
    }
}

function onItemClick(id: number) {
    router.push(`/${props.type}/${id}`)
}
</script>

<template>
    <div
        class="my-2 flex w-full cursor-pointer items-center rounded-lg p-2 transition-all duration-500 @container hover:bg-base-200/50"
        @mouseenter="mouseenterHandler"
        @mouseleave="onMouseLeave"
        @click="onItemClick(listItem.id)"
    >
        <div class="relative mr-2 h-10 w-10 flex-fixed">
            <Image
                :src="listItem.cover"
                :class="[
                    'absolute',
                    'left-0',
                    'top-0',
                    'h-full',
                    'w-full',
                    'flex-fixed',
                    'rounded-lg',
                    'transition-all',
                    'duration-500',
                    'opacity-50',
                    { blur: isHovering }
                ]"
                loading="lazy"
                :size="40"
            />
            <Image
                :src="listItem.cover"
                class="relative z-10 h-full w-full flex-fixed rounded-lg"
                loading="lazy"
                :size="40"
            />
        </div>
        <div class="flex w-full flex-col justify-between overflow-hidden @2xl:hidden">
            <div
                class="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm text-base-content"
                :title="listItem.name"
            >
                {{ listItem.name }}
            </div>
            <div
                class="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-base-content/60"
                :title="listItem.creator"
            >
                {{ listItem.creator }}
            </div>
        </div>
        <div class="hidden w-6/12 flex-col overflow-hidden text-sm @2xl:flex">
            <span
                class="overflow-hidden text-ellipsis whitespace-nowrap"
                :title="listItem.name"
            >
                {{ listItem.name }}
            </span>
        </div>
        <div
            class="hidden w-5/12 overflow-hidden text-ellipsis whitespace-nowrap text-sm @2xl:block"
            :title="listItem.creator"
        >
            {{ listItem.creator }}
        </div>
        <Button
            v-if="type !== 'artist'"
            :class="[
                'ml-2',
                'transition-all',
                'btn-ghost',
                'btn-sm',
                'btn-square',
                'text-primary',
                { 'opacity-0': !isHovering && isPc }
            ]"
            @click.stop="onPlayList(listItem.id)"
        >
            <template #icon>
                <i-solar-play-circle-bold />
            </template>
        </Button>
    </div>
</template>

<style lang="scss"></style>

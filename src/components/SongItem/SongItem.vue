<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { usePlaylistStore } from 'src/stores'
import Image from '../Image.vue'
import SongItemOption from './SongItemOption.vue'

defineProps<{ song: Song }>()
const { currentSong } = storeToRefs(usePlaylistStore())
const shouldRenderOption = ref(false)
</script>

<template>
    <li
        class="song-item group my-2 flex h-14 w-full items-center rounded-lg p-2 transition-all duration-500 @container contain-strict content-auto intrinsic-w-auto-20 intrinsic-h-auto-14 hover:bg-base-200/50"
        @mouseenter="() => (shouldRenderOption = true)"
    >
        <div class="image-container relative mr-2 h-10 w-10 flex-fixed">
            <Image
                :src="song.cover"
                :class="[
                    'image',
                    'relative',
                    'z-10',
                    'h-full',
                    'w-full',
                    'flex-fixed',
                    'rounded-lg'
                ]"
                loading="lazy"
                :size="40"
            />
            <span
                v-if="currentSong?.id === song.id"
                class="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 @2xl:hidden"
            >
                <i-solar-play-circle-bold class="h-5 w-5 rounded-full text-primary" />
                <span class="playing-icon-shadow -z-10 bg-base-100"></span>
            </span>
        </div>
        <div class="flex w-full flex-col justify-between overflow-hidden @2xl:hidden">
            <div
                class="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm text-base-content"
                :title="`${song.name}${song.subName ? `(${song.subName})` : ''}`"
            >
                {{ song.name }}{{ song.subName ? `(${song.subName})` : '' }}
            </div>
            <div
                class="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-base-content/60"
                :title="`${song.artist} - ${song.album}`"
            >
                {{ song.artist }} - {{ song.album }}
            </div>
        </div>
        <div class="hidden w-5/12 flex-col overflow-hidden text-sm @2xl:flex">
            <span
                class="overflow-hidden text-ellipsis whitespace-nowrap"
                :title="song.name"
            >
                {{ song.name }}
                <span
                    v-if="currentSong?.id === song.id"
                    class="relative inline-block h-5 w-5 align-bottom text-xs"
                >
                    <i-solar-play-circle-bold class="h-5 w-5 rounded-full text-primary" />
                    <span class="playing-icon-shadow -z-10 bg-base-100"></span>
                </span>
            </span>
            <span
                v-if="song.subName"
                class="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-base-content/60"
                :title="song.subName ? `(${song.subName})` : ''"
            >
                {{ song.subName ? `(${song.subName})` : '' }}
            </span>
        </div>
        <div
            class="hidden w-2/12 overflow-hidden text-ellipsis whitespace-nowrap text-sm @2xl:block"
            :title="song.artist"
        >
            <RouterLink
                class="hover:underline"
                :to="`/artist/${song.artistId}`"
            >
                {{ song.artist }}
            </RouterLink>
        </div>
        <div
            class="hidden w-5/12 overflow-hidden text-ellipsis whitespace-nowrap text-sm @2xl:block"
            :title="song.album"
            :to="`/album/${song.albumId}`"
        >
            <RouterLink
                class="hover:underline"
                :to="`/album/${song.albumId}`"
            >
                {{ song.album }}
            </RouterLink>
        </div>
        <slot />
        <div class="ml-2 h-8 w-8 flex-shrink-0 opacity-0 transition-all md:group-hover:opacity-100">
            <SongItemOption
                v-if="shouldRenderOption"
                :song="song"
            />
        </div>
    </li>
</template>

<style lang="scss">
.song-item {
    .image-container {
        perspective: 100px;
        transition: transform 500ms;

        transform-origin: 50%;
    }
    .image {
        transition: transform 500ms;
        content-visibility: visible;
    }

    &:hover {
        .image-container {
            transform: rotate3d(0, 0, 10, -5deg);
        }
        .image {
            transform: rotateY(20deg) scale(1.25);
        }
    }

    .playing-icon-shadow {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        width: 14px;
        height: 14px;
        animation: song-playing 2s infinite;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
    }
}

@keyframes song-playing {
    0% {
        box-shadow: 0px 0px 0px 0px hsl(var(--p) / 0.7);
    }

    100% {
        box-shadow: 0px 0px 0px 6px hsl(var(--p) / 0);
    }
}
</style>

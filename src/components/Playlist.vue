<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlaylistStore } from 'stores'
import type { Placement } from 'tippy.js'
import ContextMenu from './ContextMenu/ContextMenu.vue'
import ContextMenuItem from './ContextMenu/ContextMenuItem.vue'
import Button from './Button.vue'

defineOptions({
    inheritAttrs: false
})

defineProps<{
    iconClass?: string
    placement?: Placement
}>()

const { playlist, currentSong } = storeToRefs(usePlaylistStore())
const { switchToThisSong, removeSong } = usePlaylistStore()
</script>

<template>
    <ContextMenu
        :placement="placement || 'top-end'"
        size="large"
    >
        <template #default>
            <Button
                v-view-transition-name="'playing-playlist-btn'"
                class="btn-square btn-ghost btn-sm p-0"
                v-bind="$attrs"
            >
                <i-solar-plaaylist-minimalistic-bold-duotone :class="'h-5 w-5 ' + iconClass" />
            </Button>
        </template>

        <template #menu>
            <ul class="playlist-menu">
                <ContextMenuItem
                    v-for="song in playlist"
                    :key="song.id"
                    class="flex flex-nowrap items-center overflow-hidden whitespace-nowrap"
                    :active="song === currentSong"
                    @click="switchToThisSong(song)"
                >
                    <i-solar-play-bold
                        v-if="song === currentSong"
                        class="h-3 w-3 flex-fixed overflow-hidden text-primary"
                    />
                    <span
                        class="overflow-hidden text-ellipsis text-sm"
                        :title="song.name"
                    >
                        {{ song.name }}
                    </span>
                    <span
                        class="flex-auto overflow-hidden text-ellipsis text-left text-xs text-base-content/60"
                        :title="song.artist"
                    >
                        {{ song.artist }}
                    </span>
                    <Button
                        class="btn-square btn-ghost btn-sm"
                        @click.stop="removeSong(song)"
                    >
                        <template #icon>
                            <i-fluent-dismiss-32-regular class="h-3 w-3" />
                        </template>
                    </Button>
                </ContextMenuItem>
                <div
                    v-if="!playlist.length"
                    class="my-2 flex h-full w-full items-center justify-center text-sm text-base-content/50"
                >
                    - 列表为空 -
                </div>
            </ul>
        </template>
    </ContextMenu>
</template>

<style>
.playlist-menu {
    min-height: 200px;
    overscroll-behavior: contain;
}
</style>

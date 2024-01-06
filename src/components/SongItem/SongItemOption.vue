<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { usePlaylistStore } from 'stores'
import Button from '../Button.vue'
import { ContextMenu, ContextMenuItem } from '../ContextMenu'

const props = defineProps<{ song: Song }>()

const { switchToThisSong, insertSongToNext } = usePlaylistStore()
const { playMode } = storeToRefs(usePlaylistStore())
const router = useRouter()

async function onPlayClick() {
    await switchToThisSong(props.song)
}

async function onPlayNextClick() {
    await insertSongToNext(props.song)
}

async function onAlbumClick() {
    await router.push(`/album/${props.song.albumId}`)
}

async function onClick() {
    alert('not implemented')
}
</script>

<template>
    <ContextMenu>
        <template #default>
            <Button class="btn-square btn-ghost btn-sm">
                <template #icon>
                    <i-solar-menu-dots-bold />
                </template>
            </Button>
        </template>

        <template #menu>
            <ContextMenuItem @click="onPlayClick">
                <i-solar-play-line-duotone class="h-5 w-5" />
                <span>立即播放</span>
            </ContextMenuItem>
            <ContextMenuItem
                v-if="playMode !== 'radio'"
                @click="onPlayNextClick"
            >
                <i-solar-play-circle-line-duotone class="h-5 w-5" />
                <span>下一首播放</span>
            </ContextMenuItem>
            <ContextMenuItem @click="onClick">
                <i-solar-list-heart-minimalistic-line-duotone class="h-5 w-5" />
                <span>收藏到歌单</span>
            </ContextMenuItem>
            <ContextMenuItem @click="onAlbumClick">
                <i-solar-vinyl-line-duotone class="h-5 w-5" />
                <span>查看专辑</span>
            </ContextMenuItem>
        </template>
    </ContextMenu>
</template>

<style scoped></style>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ComponentExposed } from 'vue-component-type-helpers'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { usePlaylistStore, useSonglistsStore } from 'stores'
import { AddToSonglist } from 'components'
import type { ApiPlaylistTracks } from 'src/api'
import { useSonglistContext } from 'src/pages/Songlist/context'
import { post } from 'src/utils'
import Button from '../Button.vue'
import { ContextMenu, ContextMenuItem } from '../ContextMenu'

const props = defineProps<{ song: Song }>()

const { switchToThisSong, insertSongToNext } = usePlaylistStore()
const { createdSonglists } = storeToRefs(useSonglistsStore())
const { playMode } = storeToRefs(usePlaylistStore())
const router = useRouter()
const addToSonglistRef = ref<ComponentExposed<typeof AddToSonglist>>()

const { id: songlistId, reload } = useSonglistContext({
    id: 0,
    reload: () => Promise.resolve()
})

const route = useRoute()

const isSonglistPage = computed(() => {
    return route.path.includes('/songlist')
})

const createdSonglistSet = computed(() => {
    return new Set(createdSonglists.value.map((item) => item.id))
})

async function onPlayClick() {
    await switchToThisSong(props.song)
}

async function onPlayNextClick() {
    await insertSongToNext(props.song)
}

async function onAlbumClick() {
    await router.push(`/album/${props.song.albumId}`)
}

async function onArtistClick() {
    console.log(props.song)
    await router.push(`/artist/${props.song.artistId}`)
}

function onAddToSonglistClick(id: number) {
    addToSonglistRef.value?.show(id)
}

async function onRemoveFromSonglistClick(id: number) {
    if (!songlistId || !id) return
    await post<ApiPlaylistTracks>('/playlist/tracks', {
        op: 'del',
        pid: songlistId,
        tracks: [id].join(',')
    })
    await reload()
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

            <AddToSonglist ref="addToSonglistRef" />
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
            <ContextMenuItem
                v-if="!createdSonglistSet.has(song.sourceid || -1)"
                @click="() => onAddToSonglistClick(song.id)"
            >
                <i-solar-list-heart-minimalistic-line-duotone class="h-5 w-5" />
                <span>收藏到歌单</span>
            </ContextMenuItem>
            <ContextMenuItem
                v-else-if="isSonglistPage"
                @click="() => onRemoveFromSonglistClick(song.id)"
            >
                <i-solar-list-heart-minimalistic-line-duotone class="h-5 w-5" />
                <span>从歌单移除</span>
            </ContextMenuItem>
            <ContextMenuItem @click="onAlbumClick">
                <i-solar-vinyl-line-duotone class="h-5 w-5" />
                <span>查看专辑</span>
            </ContextMenuItem>
            <ContextMenuItem @click="onArtistClick">
                <i-solar-users-group-rounded-line-duotone class="h-5 w-5" />
                <span>查看歌手</span>
            </ContextMenuItem>
        </template>
    </ContextMenu>
</template>

<style scoped></style>

<script setup lang="ts">
import type { ApiAlbumDetailDynamic, ApiAlbumSub } from 'api'
import { usePlaylistStore } from 'stores'
import { Button, SongItem } from 'components'
import { post } from 'src/utils'

const props = defineProps<{
    id: number
    list: Song[]
    extraInfo: ApiAlbumDetailDynamic['return'] | null
    onChange: () => void
}>()

const { switchToThisList } = usePlaylistStore()

async function onPlayAll() {
    if (props.list.length) {
        await switchToThisList(props.list)
    }
}

async function onCollectClick() {
    if (!props.extraInfo) return

    await post<ApiAlbumSub>('/album/sub', {
        id: props.id,
        t: props.extraInfo.isSub ? 0 : 1
    })
    await props.onChange()
}
</script>

<template>
    <div class="mt-12 w-full">
        <div class="flex w-full items-center justify-between">
            <h2 class="text-lg font-bold text-base-content">播放列表</h2>
            <div class="flex">
                <Button
                    v-if="extraInfo"
                    class="btn-secondary btn-outline btn-xs mr-2"
                    @click="onCollectClick"
                >
                    {{ extraInfo?.isSub ? '取消收藏' : '收藏' }}
                </Button>
                <Button
                    class="btn-secondary btn-outline btn-xs"
                    @click="onPlayAll"
                >
                    播放全部
                </Button>
            </div>
        </div>
        <div>
            <SongItem
                v-for="song in list"
                :key="song.id"
                :song="song"
            />
        </div>
    </div>
</template>

<style scoped></style>

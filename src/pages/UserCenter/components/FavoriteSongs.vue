<script setup lang="ts">
import { watch } from 'vue'
import { useSonglist } from 'services'
import { usePlaylistStore } from 'stores'
import { Button, SongItem } from 'components'

const props = defineProps<{ id: number }>()

const { songlist, onFullLoad, initSonglist } = useSonglist()
const { switchToThisList } = usePlaylistStore()

async function onPlayAll() {
    if (songlist.value.length) {
        await switchToThisList(songlist.value)
    }
}

watch(props, async (val) => {
    if (val.id) {
        await initSonglist(val.id)
        await onFullLoad()
    }
})
</script>

<template>
    <div
        class="my-favorite-songs flex w-full flex-col rounded-lg bg-base-100 bg-gradient-to-b from-secondary/5 to-30% p-4"
    >
        <h2
            class="flex items-center justify-between border-l-4 border-secondary px-2 text-lg/5 font-bold"
        >
            <span>我喜欢的音乐</span>
            <Button
                class="btn-secondary btn-outline btn-xs"
                @click="onPlayAll"
            >
                播放全部
            </Button>
        </h2>
        <ul class="song-list list relative w-full overflow-x-visible overflow-y-scroll">
            <SongItem
                v-for="song in songlist.slice(0, 13)"
                :key="song.id"
                :song="song"
            />
        </ul>
    </div>
</template>

<style lang="scss">
.my-favorite-songs {
    height: 500px;
}
</style>

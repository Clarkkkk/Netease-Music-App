<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ApiRecommendSongs } from 'api'
import { useAuthStore, usePlaylistStore } from 'stores'
import { Button, SongItem } from 'components'
import { post, toHttps } from 'utils'

const auth = useAuthStore()
const list = ref<Array<Song>>([])
const { switchToThisList } = usePlaylistStore()

async function onPlayAll() {
    if (list.value.length) {
        await switchToThisList(list.value)
    }
}

watch(
    auth,
    (val) => {
        if (val.loggedIn) {
            post<ApiRecommendSongs>('/recommend/songs').then((res) => {
                list.value = res.data.dailySongs.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        subName: item.alia[0] || item.tns?.[0] || '',
                        artist: item.ar[0].name,
                        artistId: item.ar[0]?.id || 0,
                        album: item.al.name,
                        albumId: item.al.id,
                        cover: toHttps(item.al.picUrl),
                        timestamp: 0,
                        url: '',
                        status: 'not-playing'
                    }
                })
            })
        }
    },
    { immediate: true }
)
</script>

<template>
    <div
        id="recommand-songs"
        class="flex w-full flex-col rounded-lg bg-gradient-to-b from-secondary/5 to-30% p-4 contain-content content-auto intrinsic-[auto_300px]"
    >
        <h2
            class="flex items-center justify-between border-l-4 border-secondary px-2 text-lg/5 font-bold"
        >
            <span>每日推荐歌曲</span>
            <Button
                class="btn-secondary btn-outline btn-xs"
                @click="onPlayAll"
            >
                播放全部
            </Button>
        </h2>
        <ul
            :class="[
                'song-list',
                'list',
                'relative',
                'w-full',
                'overflow-x-visible',
                'overflow-y-scroll',
                { 'is-empty': !list.length }
            ]"
        >
            <SongItem
                v-for="song in list"
                :key="song.id"
                :song="song"
            />
        </ul>
    </div>
</template>

<style lang="scss">
#recommand-songs {
    .list {
        height: calc(100vh - 400px);
    }

    .song-list::after {
        content: '';
        position: sticky;
        bottom: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 15px;
        background: linear-gradient(to top, hsl(var(--b1)) 0%, hsl(var(--b1) / 0%));
    }

    .song-list.is-empty::after {
        display: none;
    }
}
</style>

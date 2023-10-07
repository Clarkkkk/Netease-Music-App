<script setup lang="ts">
import { ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { Button, SongItem, Tabs } from '#components'
import type { ApiTopSong } from 'api'
import { usePlaylistStore } from 'stores'
import { post, toHttps, usePageData } from 'utils'

const AREA = {
    ALL: 0,
    CHINA: 7,
    WESTERN: 96,
    JAPAN: 8,
    KOREA: 16
} as const

type AreaValue = (typeof AREA)[keyof typeof AREA]

const tabs = [
    {
        name: '全部',
        value: AREA.ALL
    },
    {
        name: '华语',
        value: AREA.CHINA
    },
    {
        name: '欧美',
        value: AREA.WESTERN
    },
    {
        name: '日本',
        value: AREA.JAPAN
    },
    {
        name: '韩国',
        value: AREA.KOREA
    }
] as const

const list = ref<Record<AreaValue, Array<Song>>>({
    [AREA.ALL]: [],
    [AREA.CHINA]: [],
    [AREA.WESTERN]: [],
    [AREA.JAPAN]: [],
    [AREA.KOREA]: []
})

const lessThan768 = useMediaQuery('(max-width: 767px)')
const showAll = ref(!lessThan768.value || false)
const loading = ref(false)
const currentTab = ref<AreaValue>(AREA.ALL)
const { switchToThisList } = usePlaylistStore()

const { data } = await usePageData<ApiTopSong>({
    api: '/top/song',
    params: { type: AREA.ALL },
    transform(input) {
        return {
            code: input.code,
            data: input.data.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    alias: item.alias,
                    transNames: item.transNames,
                    artists: item.artists,
                    album: {
                        name: item.album.name,
                        picUrl: item.album.picUrl,
                        id: item.album.id
                    }
                }
            })
        } as ApiTopSong['return']
    }
})
console.log(data.value.data.length)
list.value[AREA.ALL] = parseData(data.value)

async function onPlayAll() {
    if (list.value[currentTab.value].length) {
        await switchToThisList(list.value[currentTab.value])
    }
}

async function getData(type: AreaValue) {
    if (loading.value || list.value[type].length) return
    loading.value = true
    try {
        const res = await post<ApiTopSong>('/top/song', { type })
        list.value[type] = parseData(res)
    } finally {
        loading.value = false
    }
}

function parseData(data: ApiTopSong['return']): Song[] {
    return data.data.map((item) => {
        return {
            id: item.id,
            name: item.name,
            subName: item.alias[0] || item.transNames?.[0] || '',
            artist: item.artists[0].name,
            album: item.album.name,
            cover: toHttps(item.album.picUrl),
            artistId: item.artists[0].id,
            albumId: item.album.id,
            timestamp: 0,
            url: '',
            status: 'not-playing'
        }
    })
}
</script>

<template>
    <div
        id="new-songs"
        class="flex w-full flex-col rounded-lg bg-gradient-to-b from-accent/5 to-30% p-4 contain-content content-auto intrinsic-[auto_300px]"
    >
        <h2
            class="flex items-center justify-between border-l-4 border-accent px-2 text-lg/5 font-bold"
        >
            <span>新歌速递</span>
            <Button
                class="btn-accent btn-outline btn-xs"
                @click="onPlayAll"
            >
                播放全部
            </Button>
        </h2>
        <Tabs
            class="mt-3"
            :tabs="tabs"
            :loading="loading"
            :onTabChange="
                (tab) => {
                    if (lessThan768) {
                        showAll = false
                    }
                    getData(tab.value)
                    currentTab = tab.value
                }
            "
        >
            <template
                v-for="tab in tabs"
                :key="tab.name"
                #[tab.name]="{ tab: tabItem }"
            >
                <ul
                    :class="[
                        'song-list',
                        'list',
                        'relative',
                        'w-full',
                        'overflow-x-visible',
                        'overflow-y-scroll',
                        { 'is-empty': !list[tabItem.value as AreaValue].length }
                    ]"
                >
                    <ClientOnly>
                        <SongItem
                            v-for="song in list[tabItem.value as AreaValue].slice(
                                0,
                                showAll || !lessThan768 ? Infinity : 10
                            )"
                            :key="song.id"
                            :song="song"
                        />
                    </ClientOnly>
                </ul>
                <ClientOnly>
                    <div
                        v-if="!showAll && lessThan768"
                        class="flex w-full justify-center"
                    >
                        <Button
                            class="btn-ghost btn-sm"
                            @click="showAll = true"
                        >
                            查看更多
                        </Button>
                    </div>
                </ClientOnly>
            </template>
        </Tabs>
    </div>
</template>

<style lang="scss">
#new-songs {
    @media (min-width: 768px) {
        .list {
            height: calc(100vh - 400px);
        }
    }

    @media (max-width: 640px) {
        .list {
            min-height: 663px;
        }
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

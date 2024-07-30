<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ApiTopSong } from 'api'
import { usePlaylistStore } from 'stores'
import { Button, Tabs } from 'components'
import { post, toHttps } from 'utils'
import NewSongList from './NewSongList.vue'

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

const loading = ref(false)
const currentTab = ref<AreaValue>(AREA.ALL)
const { switchToThisList } = usePlaylistStore()

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
        list.value[type] = res.data.map((item) => {
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
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    getData(AREA.ALL)
})
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
                <NewSongList :list="list[tabItem.value as AreaValue]" />
            </template>
        </Tabs>
    </div>
</template>

<style lang="scss">
#new-songs {
    .list {
        height: calc(100vh - 400px);
    }
}
</style>

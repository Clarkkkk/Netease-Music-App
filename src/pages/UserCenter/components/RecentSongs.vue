<script setup lang="ts">
import { ref } from 'vue'
import { useVirtualList } from '@vueuse/core'
import type { ApiUserRecord } from 'api'
import { storeToRefs } from 'pinia'
import { useLoginService } from 'services'
import { useProfileStore } from 'stores'
import { SongItem, Tabs } from 'components'
import { post, toHttps } from 'utils'

const tabs = [
    {
        name: '近一周',
        value: 1
    },
    {
        name: '全部',
        value: 0
    }
] as const

type RecentSong = Song & { playCount: number }

const { onProfileLoaded } = useLoginService()
const { profile } = storeToRefs(useProfileStore())
const loading = ref(false)
const weekList = ref<Array<RecentSong>>([])
const allList = ref<Array<RecentSong>>([])

const {
    list: visibleWeekList,
    containerProps: weekContainerProps,
    wrapperProps: weekWrapperProps
} = useVirtualList<RecentSong>(weekList, {
    itemHeight: 72
})

const {
    list: visibleAllList,
    containerProps: allContainerProps,
    wrapperProps: allWrapperProps
} = useVirtualList<RecentSong>(allList, {
    itemHeight: 72
})

async function getData(type: 0 | 1) {
    if (
        !profile.value ||
        (type === 0 && !!allList.value.length) ||
        (type === 1 && !!weekList.value.length)
    ) {
        return
    }

    const res = await post<ApiUserRecord>('/user/record', {
        uid: profile.value.profile.userId,
        type
    })
    if (type === 0) {
        allList.value = res.allData.map((item) => {
            return {
                id: item.song.id,
                name: item.song.name,
                subName: item.song.alia[0] || '',
                artist: item.song.ar[0].name,
                album: item.song.al.name,
                cover: toHttps(item.song.al.picUrl),
                timestamp: 0,
                url: '',
                status: 'not-playing',
                playCount: item.playCount
            } as RecentSong
        })
    } else {
        weekList.value = res.weekData.map((item) => {
            return {
                id: item.song.id,
                name: item.song.name,
                subName: item.song.alia[0] || '',
                artist: item.song.ar[0].name,
                album: item.song.al.name,
                cover: toHttps(item.song.al.picUrl),
                timestamp: 0,
                url: '',
                status: 'not-playing',
                playCount: item.playCount
            } as RecentSong
        })
    }
}

function onTabChange(tab: (typeof tabs)[number]) {
    return getData(tab.value)
}

onProfileLoaded(() => {
    getData(1)
})
</script>

<template>
    <div
        class="recent-songs flex w-full flex-col rounded-lg bg-base-100 bg-gradient-to-b from-accent/5 to-30% p-4"
    >
        <h2
            class="flex items-center justify-between border-l-4 border-accent px-2 text-lg/5 font-bold"
        >
            <span>最近播放</span>
        </h2>
        <Tabs
            class="mt-3 min-h-0 flex-1"
            :tabs="tabs"
            :onTabChange="onTabChange"
            :disabled="loading"
        >
            <template
                v-for="tab in tabs"
                :key="tab.name"
                #[tab.name]="{ tab: tabItem }"
            >
                <ul
                    class="song-list list relative h-full w-full overflow-x-visible overflow-y-scroll"
                    v-bind="tabItem.name === '全部' ? allContainerProps : weekContainerProps"
                >
                    <div v-bind="tabItem.name === '全部' ? allWrapperProps : weekWrapperProps">
                        <SongItem
                            v-for="item in tabItem.name === '全部'
                                ? visibleAllList
                                : visibleWeekList"
                            :key="item.data.id"
                            :song="item.data"
                        >
                            <div class="flex-fixed whitespace-nowrap text-xs text-base-content/80">
                                {{ item.data.playCount }}次
                            </div>
                        </SongItem>
                    </div>
                </ul>
            </template>
        </Tabs>
    </div>
</template>

<style lang="scss">
.recent-songs {
    height: 500px;
}
</style>

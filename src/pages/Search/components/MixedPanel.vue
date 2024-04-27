<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { type ApiSearch, SEARCH } from 'api'
import { post, toHttps } from 'utils'
import AlbumResult from './AlbumResult.vue'
import SonglistResult, { type SonglistItem } from './SonglistResult.vue'
import SongResult from './SongResult.vue'

const props = defineProps<{
    active: boolean
}>()

const route = useRoute()

const loading = ref(false)

const keyword = computed<string>(() => {
    return (route.query.keyword as string) || ''
})

const mixedData = ref<{
    song: {
        list: Song[]
        moreText: string
    }
    songlist: {
        list: SonglistItem[]
        moreText: string
    }
    album: {
        list: SonglistItem[]
        moreText: string
    }
}>({
    song: {
        list: [],
        moreText: ''
    },
    songlist: {
        list: [],
        moreText: ''
    },
    album: {
        list: [],
        moreText: ''
    }
})

async function getData(keyword: string) {
    try {
        loading.value = true
        const res = await post<ApiSearch>('/search', { type: SEARCH.MIXED, keywords: keyword })
        mixedData.value = {
            song: {
                moreText: res.result.song.moreText,
                list: res.result.song.songs.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        subName: item.alia[0] || '',
                        artist: item.ar[0]?.name,
                        artistId: item.ar[0]?.id || 0,
                        album: item.al.name,
                        albumId: item.al.id,
                        cover: toHttps(item.al.picUrl),
                        timestamp: 0,
                        url: '',
                        status: 'not-playing'
                    }
                })
            },
            songlist: {
                moreText: res.result.playList.moreText,
                list: res.result.playList.playLists.map((item) => {
                    return {
                        name: item.name,
                        creator: item.creator.nickname,
                        id: item.id,
                        cover: toHttps(item.coverImgUrl)
                    }
                })
            },
            album: {
                moreText: res.result.album.moreText,
                list: res.result.album.albums.map((item) => {
                    return {
                        name: item.name,
                        creator: item.artists[0]?.name || '',
                        id: item.id,
                        cover: toHttps(item.picUrl)
                    }
                })
            }
        }
    } finally {
        loading.value = false
    }
}

watch(
    props,
    (propsVal) => {
        if (propsVal.active && mixedData.value.song.list.length === 0) {
            getData(keyword.value)
        }
    },
    { immediate: true, deep: true }
)

onBeforeRouteUpdate((to, from) => {
    if (!props.active) return

    if (to.query.keyword !== from.query.keyword) {
        mixedData.value = {
            song: {
                list: [],
                moreText: ''
            },
            songlist: {
                list: [],
                moreText: ''
            },
            album: {
                list: [],
                moreText: ''
            }
        }
        getData(to.query.keyword as string)
    }
})
</script>

<template>
    <div class="w-full lg:flex">
        <div
            v-if="loading"
            class="mt-4 flex w-full justify-center"
        >
            <div class="loading text-primary" />
        </div>

        <template v-else>
            <SongResult :list="mixedData.song.list" />
            <SonglistResult
                class="mt-8 lg:ml-8 lg:mt-0"
                :list="mixedData.songlist.list"
            />
            <AlbumResult
                class="mt-8 lg:ml-8 lg:mt-0"
                :list="mixedData.album.list"
            />
        </template>
    </div>
</template>

<style lang="scss"></style>

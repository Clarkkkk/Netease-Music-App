<script setup lang="ts">
import { ref } from 'vue'
import { type ApiSearchSongDetail, SEARCH } from 'api'
import { IntersectionObserver } from 'components'
import { post, toHttps } from 'utils'
import { useSearchEffect } from './service'
import SongResult from './SongResult.vue'

const props = defineProps<{
    active: boolean
    keyword: string
}>()

const loading = ref(false)
const data = ref<{
    list: Song[]
    more: boolean
    offset: number
}>({
    list: [],
    more: true,
    offset: 0
})

async function getData(offset: number, keyword: string) {
    if ((!data.value.more && offset !== 0) || loading.value) return
    loading.value = true
    try {
        const res = await post<ApiSearchSongDetail>('/cloudsearch', {
            type: SEARCH.SINGLE,
            keywords: keyword,
            offset
        })
        const list = data.value.list
        const newList = res.result.songs.map((item) => {
            return {
                id: item.id,
                name: item.name,
                subName: item.alia?.[0] || '',
                artist: item.ar[0]?.name || '',
                artistId: item.ar[0]?.id || 0,
                album: item.al.name,
                albumId: item.al.id,
                cover: toHttps(item.al.picUrl),
                timestamp: 0,
                url: '',
                status: 'not-playing' as const
            }
        })
        data.value = {
            more: res.result.songCount > list.length + res.result.songs.length,
            list: offset === 0 ? newList : list.concat(newList),
            offset: offset + newList.length
        }
    } finally {
        loading.value = false
    }
}

useSearchEffect({
    getKeyword: () => props.keyword,
    getActive: () => props.active,
    effect: (keyword) => getData(0, keyword)
})
</script>

<template>
    <div class="w-full">
        <div
            v-if="loading && !data.list.length"
            class="mt-4 flex w-full justify-center"
        >
            <div class="loading text-primary" />
        </div>
        <template v-else>
            <SongResult
                class=""
                :list="data.list"
            />
            <IntersectionObserver
                :is-bottom="!data.more"
                @change="
                    (v) => {
                        if (v && data.list.length) {
                            getData(data.offset, keyword)
                        }
                    }
                "
            />
        </template>
    </div>
</template>

<style lang="scss"></style>

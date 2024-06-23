<script setup lang="ts">
import { ref } from 'vue'
import { type ApiSearchDetail, SEARCH } from 'api'
import { IntersectionObserver } from 'components'
import { post, toHttps } from 'utils'
import AlbumResult from './AlbumResult.vue'
import { useSearchEffect } from './service'
import { type SonglistItem } from './SonglistResult.vue'

const props = defineProps<{
    active: boolean
    keyword: string
}>()

const loading = ref(false)
const data = ref<{
    list: SonglistItem[]
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
        const res = await post<ApiSearchDetail<typeof SEARCH.ALBUM>>('/search', {
            type: SEARCH.ALBUM,
            keywords: keyword,
            offset
        })
        const list = data.value.list
        const newList = res.result.albums.map((item) => {
            return {
                name: item.name,
                creator: item.artist.name || '',
                id: item.id,
                cover: toHttps(item.picUrl || '')
            }
        })
        data.value = {
            more: res.result.albumCount > list.length + res.result.albums.length,
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
            v-if="loading"
            class="mt-4 flex w-full justify-center"
        >
            <div class="loading text-primary" />
        </div>
        <template v-else>
            <AlbumResult
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

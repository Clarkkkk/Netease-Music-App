<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ApiAlbumNew } from 'api'
import { post, toHttps } from 'utils'
import AlbumItem from './AlbumItem.vue'

interface Album {
    name: string
    subName: string
    artist: string
    artistPicUrl: string
    id: number
    picUrl: string
    createTime: number
}

const albums = ref<Array<Album>>([])
const loading = ref(false)

onMounted(() => {
    loading.value = true
    post<ApiAlbumNew>('/album/new', { limit: 12 })
        .then((res) => {
            albums.value = res.albums.map((item) => {
                return {
                    name: item.name,
                    subName: item.transNames?.[0] || item.alias[0] || '',
                    artist: item.artist.name,
                    artistPicUrl: item.artist.picUrl,
                    id: item.id,
                    picUrl: toHttps(item.picUrl),
                    createTime: item.publishTime
                }
            })
        })
        .finally(() => {
            loading.value = false
        })
})
</script>

<template>
    <div
        id="new-albums"
        class="mt-6 w-full px-6 contain-[layout_style]"
    >
        <h2 class="border-l-4 border-primary px-2 text-lg/5 font-bold">新碟上架</h2>
        <div
            v-if="loading"
            class="mt-4 flex w-full justify-center"
        >
            <div class="loading text-primary" />
        </div>
        <ul class="relative flex w-full flex-wrap items-center py-4">
            <AlbumItem
                v-for="album in albums"
                :id="album.id"
                :key="album.id"
                :name="album.name"
                :sub-name="album.subName"
                :artist="album.artist"
                :artist-pic-url="album.artistPicUrl"
                :pic-url="album.picUrl"
                :create-time="album.createTime"
                class="album relative"
            />
        </ul>
    </div>
</template>

<style lang="scss">
#new-albums {
    @media (max-width: 640px) {
        height: 1700px;
    }
    @media (max-width: 1024px) {
        .album {
            width: calc(50% - 12px);
            margin-right: 0px;

            &:nth-child(2n + 1) {
                margin-right: 24px;
            }
        }
    }

    @media (min-width: 1024px) and (max-width: 1536px) {
        .album {
            width: calc(33.3% - 16px);

            &:not(:nth-child(3n + 3)) {
                margin-right: 24px;
            }
        }
    }

    @media (min-width: 1536px) {
        .album {
            width: calc(25% - 18px);

            &:not(:nth-child(4n + 4)) {
                margin-right: 24px;
            }
        }
    }
}
</style>

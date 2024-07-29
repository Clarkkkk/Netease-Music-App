<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { IntersectionObserver } from 'components'
import type { ApiArtistAlbum, ApiArtists } from 'src/api'
import { usePaginatedList } from 'src/services'
import { post } from 'src/utils'
import AlbumItem from '../Home/components/AlbumItem.vue'
import { Info } from './components'

const route = useRoute()

const picUrl = ref('')
const name = ref('')
const description = ref('')
const { list, fetchList, more } = usePaginatedList({
    limit: 30,
    params: {
        id: Number(route.params.id)
    },
    immediate: true,
    requestFn: async (params) => {
        const res = await post<ApiArtistAlbum>('/artist/album', params)
        return {
            data: res.hotAlbums,
            more: res.more
        }
    },
    hasMore: (res) => res.more
})

async function onChange(visible: boolean) {
    if (!visible) return
    fetchList()
}

onMounted(() => {
    post<ApiArtists>('/artists', {
        id: Number(route.params.id)
    }).then((res) => {
        name.value = res.artist.name
        picUrl.value = res.artist.picUrl
        description.value = res.artist.briefDesc
    })
})
</script>

<template>
    <div class="artist-page container mx-auto mt-6 px-6 pt-16 md:px-12">
        <Info
            :name="name"
            :pic-url="picUrl"
            :description="description"
        />

        <ul class="relative mt-8 flex w-full flex-wrap items-center py-4">
            <AlbumItem
                v-for="album in list"
                :id="album.id"
                :key="album.id"
                :name="album.name"
                :sub-name="''"
                :artist="name"
                :artist-pic-url="picUrl"
                :pic-url="album.picUrl"
                :create-time="album.publishTime"
                class="album relative"
            />
            <IntersectionObserver
                v-if="list.length"
                :is-bottom="!more"
                @change="onChange"
            />
        </ul>
    </div>
</template>

<style lang="scss">
.artist-page {
    @media (max-width: 640px) {
        height: 1586px;
    }
    @media (max-width: 1024px) {
        .album {
            width: calc(33.3% - 16px);
            margin-right: 0px;

            &:not(:nth-child(3n + 3)) {
                margin-right: 24px;
            }
        }
    }

    @media (min-width: 1024px) and (max-width: 1536px) {
        .album {
            width: calc(25% - 18px);

            &:not(:nth-child(4n + 4)) {
                margin-right: 24px;
            }
        }
    }

    @media (min-width: 1536px) {
        .album {
            width: calc(20% - 20px);

            &:not(:nth-child(5n + 5)) {
                margin-right: 24px;
            }
        }
    }
}
</style>

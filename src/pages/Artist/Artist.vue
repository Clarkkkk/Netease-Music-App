<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { IntersectionObserver } from 'components'
import type { ApiArtistAlbum, ApiArtists } from 'src/api'
import { usePaginatedList } from 'src/services'
import { post } from 'src/utils'
import AlbumItem from '../Home/components/AlbumItem.vue'
import { Info } from './components'

const route = useRoute()
const info = ref({
    name: '',
    picUrl: '',
    description: '',
    id: 0
})
const { list, fetchList, more, reload } = usePaginatedList({
    limit: 30,
    getParams: () => {
        return {
            id: Number(route.params.id)
        }
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

async function fetchInfo() {
    const res = await post<ApiArtists>('/artists', {
        id: Number(route.params.id)
    })
    info.value = {
        name: res.artist.name,
        picUrl: res.artist.picUrl,
        description: res.artist.briefDesc,
        id: res.artist.id
    }
}

function resetInfo() {
    info.value = {
        name: '',
        picUrl: '',
        description: '',
        id: 0
    }
}

watch(
    route,
    (val) => {
        if (!val.path.includes('artist')) return
        if (!info.value.id || !route.path.includes(info.value.id.toString())) {
            resetInfo()
            fetchInfo()
            reload()
        }
    },
    { immediate: true }
)
</script>

<template>
    <div class="artist-page container mx-auto mt-6 px-6 pt-16 md:px-12">
        <Info
            :name="info.name"
            :pic-url="info.picUrl"
            :description="info.description"
        />

        <ul class="relative mt-8 flex w-full flex-wrap items-center py-4">
            <AlbumItem
                v-for="album in list"
                :id="album.id"
                :key="album.id"
                :name="album.name"
                :sub-name="''"
                :artist="info.name"
                :artist-pic-url="info.picUrl"
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

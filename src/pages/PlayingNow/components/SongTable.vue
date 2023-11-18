<script setup lang="ts">
import { onActivated, onMounted, ref, watch } from 'vue'
import type { ApiArtistDetail } from 'api'
import { storeToRefs } from 'pinia'
import { useAlbum } from 'services'
import { usePlaylistStore } from 'stores'
import { post } from 'utils'

const { info: albumInfo, initAlbum } = useAlbum()
const { currentSong } = storeToRefs(usePlaylistStore())
const artistInfo = ref<ApiArtistDetail['return']['data']['artist']>()

async function init() {
    if (!currentSong.value) return
    if (!albumInfo.value) {
        initAlbum(currentSong.value.albumId)
    }
    if (!artistInfo.value) {
        const res = await post<ApiArtistDetail>('/artist/detail', {
            id: currentSong.value.artistId
        })
        artistInfo.value = res.data.artist
    }
}

onMounted(() => init())
onActivated(() => init())

watch(currentSong, async (song) => {
    if (!song) return
    initAlbum(song.albumId)
    const res = await post<ApiArtistDetail>('/artist/detail', { id: song.artistId })
    artistInfo.value = res.data.artist
})
</script>

<template>
    <div class="aspect-square w-full overflow-y-auto p-6">
        <template v-if="artistInfo">
            <h2 class="text-base font-bold text-base-content">关于歌手</h2>
            <p class="mt-2 text-xs text-base-content/70">
                {{ artistInfo.briefDesc }}
            </p>
        </template>
        <template v-if="albumInfo">
            <h2 class="mt-4 text-base font-bold text-base-content">关于专辑</h2>
            <p class="mt-2 text-xs text-base-content/70">
                {{ `《${albumInfo.name}》` }}
            </p>
            <p class="mt-2 text-xs text-base-content/70">
                {{ albumInfo.briefDesc || albumInfo.description }}
            </p>
            <p class="mt-2 text-xs text-base-content/70">
                {{
                    `发行于${new Date(albumInfo.publishTime)
                        .toLocaleDateString('zh-CN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })
                        .replaceAll('/', '-')}`
                }}
            </p>
        </template>
    </div>
</template>

<style lang="scss"></style>

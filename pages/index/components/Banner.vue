<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Image } from '#components'
import type { ApiBanner, ApiSongDetail } from 'api'
import { ONE_SECOND } from 'common'
import { usePlaylistStore } from 'stores'
import { post, toHttps, usePageData } from 'utils'

const pics = ref<ApiBanner['return']['banners']>([])
const currentIndex = ref(0)
const intervalId = ref(0)
const loading = ref(false)
const { switchToThisSong } = usePlaylistStore()
const router = useRouter()

const lastIndex = computed(() => {
    if (pics.value.length === 0) {
        return -1
    } else {
        return (currentIndex.value - 1 + pics.value.length) % pics.value.length
    }
})

const nextIndex = computed(() => {
    if (pics.value.length === 0) {
        return -1
    } else {
        return (currentIndex.value + 1) % pics.value.length
    }
})

const visibleIndices = computed(() => {
    if (pics.value.length === 0) {
        return []
    } else {
        return [
            currentIndex.value,
            lastIndex.value,
            nextIndex.value,
            (lastIndex.value - 1 + pics.value.length) % pics.value.length,
            (nextIndex.value + 1) % pics.value.length
        ]
    }
})

function moveCurrentIndex() {
    currentIndex.value = (currentIndex.value + 1) % pics.value.length
}

async function onImageClick(pic: ApiBanner['return']['banners'][number]) {
    if (pic.targetType === 1) {
        if (loading.value) return
        loading.value = true
        try {
            const res = await post<ApiSongDetail>('/song/detail', { ids: pic.targetId.toString() })
            if (res.songs[0]) {
                const resItem = res.songs[0]
                const song: Song = {
                    name: resItem.name,
                    id: resItem.id,
                    albumId: resItem.al.id,
                    artistId: resItem.ar[0]?.id || 0,
                    subName: resItem.alia?.[0],
                    artist: resItem.ar[0]?.name || '',
                    album: resItem.al.name,
                    cover: toHttps(resItem.al.picUrl),
                    timestamp: 0,
                    url: '',
                    status: 'not-playing'
                }
                switchToThisSong(song)
            }
        } finally {
            loading.value = false
        }
    } else if (pic.targetType === 1000) {
        router.push(`/songlist/${pic.targetId}`)
    } else if (pic.targetType === 10) {
        router.push(`/album/${pic.targetId}`)
    } else if (pic.targetType === 3000 && pic.url) {
        window.open(pic.url, '_blank', 'noreferrer')
    }
}

const { data } = await usePageData<ApiBanner>({
    api: '/banner',
    params: { type: 0 },
    transform(input) {
        return {
            code: 200,
            banners: input.banners.map((item) => {
                return {
                    targetId: item.targetId,
                    targetType: item.targetType,
                    url: item.url,
                    imageUrl: item.imageUrl
                }
            }) as ApiBanner['return']['banners']
        }
    }
})

onMounted(() => {
    if (!data.value) return
    pics.value = data.value.banners
    intervalId.value = window.setInterval(() => {
        moveCurrentIndex()
    }, 8 * ONE_SECOND)
})

onUnmounted(() => {
    clearInterval(intervalId.value)
})
</script>

<template>
    <div
        id="home-banner"
        class="relative mx-auto contain-content"
    >
        <Image
            v-for="(pic, index) in pics"
            :key="pic.imageUrl"
            :class="[
                'banner-image',
                'absolute',
                'left-1/2',
                'rounded-2xl',
                'transition-all',
                'shadow-lg',
                '!contain-[style_layout]',
                { 'content-hidden': !visibleIndices.includes(index) },
                { current: index === currentIndex },
                { last: index === lastIndex },
                { next: index === nextIndex }
            ]"
            :src="toHttps(pic.imageUrl)"
            :blur-before-loaded="index === currentIndex"
            @click="onImageClick(pic)"
        />
    </div>
</template>

<style lang="scss">
#home-banner {
    width: calc(100% + 3rem);
    transform: translateX(-1.5rem);
    aspect-ratio: 48 / 17;

    @media (min-width: 1280px) {
        width: 100%;
        transform: translateX(0);
    }

    .banner-image {
        width: calc(90% - 2rem);

        @media (min-width: 1280px) {
            // width: 80%;
        }

        transform: translateX(-50%) translateY(-50%) scale(0.5);
        opacity: 0;
        z-index: -1;
        pointer-events: none;
        top: 47%;

        &.last {
            opacity: 1;
            transform: translateX(-65%) translateY(-50%) scale(0.8);
            filter: blur(10px);
            z-index: 0;
        }

        &.current {
            opacity: 1;
            transform: translateX(-50%) translateY(-50%) scale(1);
            z-index: 10;
            pointer-events: all;
            cursor: pointer;

            img {
                transition: transform 800ms;
            }

            &:hover {
                img {
                    transform: scale(1.1);
                }
            }
        }

        &.next {
            opacity: 1;
            transform: translateX(calc(-35%)) translateY(-50%) scale(0.8);
            filter: blur(10px);
            z-index: 0;
        }
    }
}
</style>

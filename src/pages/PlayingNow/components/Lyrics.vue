<script setup lang="ts">
import { onActivated, onMounted, ref, watch } from 'vue'
import type { ApiLyric } from 'api'
import { storeToRefs } from 'pinia'
import { useLyricsStore, usePlaylistStore } from 'stores'
import { Button } from 'components'
import { post } from 'utils'

const { lyrics, lyricsCurrentIndex, lyricsStatus } = storeToRefs(useLyricsStore())
const { updateLyrics, updateLyricsStatus } = useLyricsStore()
const { currentSong } = storeToRefs(usePlaylistStore())
const containerRef = ref<HTMLElement | null>(null)

async function reloadLyrics() {
    if (!currentSong.value) return
    updateLyricsStatus('loading')
    try {
        const res = await post<ApiLyric>('/lyric', { id: currentSong.value.id })
        updateLyrics(res.lrc.lyric, res.tlyric?.lyric)
        updateLyricsStatus('loaded')
    } catch {
        updateLyricsStatus('error')
    }
}

function onLiricsIndexChange(index: number) {
    if (!containerRef.value || index < 0) return
    containerRef.value.scroll({
        top: index * 56,
        behavior: 'auto'
    })
}

watch(lyricsCurrentIndex, (currentIndex) => {
    onLiricsIndexChange(currentIndex)
})
onMounted(() => onLiricsIndexChange(lyricsCurrentIndex.value))
onActivated(() => onLiricsIndexChange(lyricsCurrentIndex.value))
</script>

<template>
    <ul
        id="playing-lyrics"
        ref="containerRef"
        class="flex aspect-square w-full flex-col items-center overflow-y-auto overflow-x-hidden"
    >
        <template v-if="lyricsStatus === 'loading'">
            <span class="loading loading-spinner h-full text-primary" />
        </template>
        <div
            v-else-if="lyricsStatus === 'error'"
            class="flex h-full flex-col items-center justify-center"
        >
            <span class="text-sm text-base-content/50">歌词加载失败</span>
            <Button
                class="btn-sm mt-2 bg-primary/10 text-sm text-primary/60"
                @click.stop="reloadLyrics"
            >
                重试
            </Button>
        </div>
        <template v-else>
            <li
                v-for="(line, i) in lyrics.lines"
                :key="line.text + line.time"
                :class="[
                    'flex',
                    'h-14',
                    'w-full',
                    'relative',
                    'flex-fixed',
                    'flex-col',
                    'items-center',
                    'justify-center',
                    'transition-all',
                    'duration-500',
                    i === lyricsCurrentIndex ? 'text-base-content' : 'text-base-content/50',
                    { 'scale-125': i === lyricsCurrentIndex }
                ]"
            >
                <span
                    v-for="(text, j) in line.text.split('\n')"
                    :key="j"
                    :class="[j === 0 ? 'text-sm' : 'text-xs']"
                >
                    {{ text }}
                </span>
            </li>
        </template>
    </ul>
</template>

<style lang="scss">
#playing-lyrics {
    width: 80%;
    height: 60vh;
    // 35px is half height of the lyrics line
    padding: calc(40% - 28px) 0;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
    overscroll-behavior: contain;
    mask-image: linear-gradient(
        180deg,
        transparent 5%,
        rgba(0, 0, 0, 1) 10%,
        rgba(0, 0, 0, 1) 90%,
        transparent 95%
    );

    li {
        scroll-snap-align: center;
        scroll-snap-stop: normal;
    }
}

@container (max-height: 400px) {
    #playing-lyrics {
        margin: 8px;
        width: calc(100% - 16px);
        height: calc(100% - 16px);
        mask-image: linear-gradient(
            180deg,
            transparent 5%,
            rgba(0, 0, 0, 1) 15%,
            rgba(0, 0, 0, 1) 85%,
            transparent 95%
        );
    }
}

@media (max-width: 1024px) {
    #playing-lyrics {
        margin: 8px;
        width: calc(100% - 16px);
        height: calc(100% - 16px);
    }
}
</style>

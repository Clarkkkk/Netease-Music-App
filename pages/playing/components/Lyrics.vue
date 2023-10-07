<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useLyricsStore } from 'stores'
// import { Button } from 'components'

const { lyrics, lyricsCurrentIndex } = storeToRefs(useLyricsStore())
// const { seek } = useAudioStore()
const containerRef = ref<HTMLElement | null>(null)

watch(lyricsCurrentIndex, (currentIndex) => {
    if (!containerRef.value || currentIndex < 0) return

    containerRef.value.scroll({
        top: currentIndex * 56,
        behavior: 'auto'
    })
})
</script>

<template>
    <ul
        id="playing-lyrics"
        ref="containerRef"
        class="flex aspect-square w-full flex-col items-center overflow-y-auto overflow-x-hidden"
    >
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
            <!-- <Button
                class="btn-ghost btn-square btn-sm absolute left-0 top-1/2 -translate-y-1/2"
                @click="() => seek(line.time)"
            >
                <i-solar-play-bold class="h-3 w-3 flex-fixed overflow-hidden text-primary" />
            </Button> -->
            <span
                v-for="(text, j) in line.text.split('\n')"
                :key="j"
                :class="[j === 0 ? 'text-sm' : 'text-xs']"
            >
                {{ text }}
            </span>
        </li>
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

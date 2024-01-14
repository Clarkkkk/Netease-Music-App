<script setup lang="ts">
import Playlist from '../../Playlist.vue'
import { Controls, Cover, Info, MusicBar } from './components'
</script>

<template>
    <div
        id="mini-music-control"
        class="fixed bottom-4 left-0 z-[1000] flex h-14 w-full items-center justify-center rounded-xl px-2 contain-layout"
    >
        <div
            v-view-transition-name="'playing-background'"
            class="container flex items-center rounded-xl bg-base-100 px-3 py-2 shadow-xl shadow-gray-400/10 backdrop-blur-xl"
        >
            <Cover />
            <Info />
            <MusicBar />
            <Controls />
            <Playlist class="ml-3" />
        </div>
    </div>
</template>

<style lang="scss">
::view-transition-old(playing-background),
::view-transition-new(playing-background) {
    height: 100%;
    opacity: 1;
}

#mini-music-control {
    bottom: max(1rem, env(safe-area-inset-bottom));
}
</style>

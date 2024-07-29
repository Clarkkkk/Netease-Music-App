<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { Audio, LoginModal, MiniMusicControl, Nav } from 'components'
import {
    useDebugEffect,
    useGlobalKeyboardListeners,
    useLikeEffect,
    useLoginInitEffect,
    useLyricsEffect,
    useMediaSessionEffect,
    usePlayStatusEffect,
    useSonglistsEffect,
    useTabEffect,
    useThemeEffect
} from './services'
import './global.css'

useLoginInitEffect()
usePlayStatusEffect()
useMediaSessionEffect()
useLyricsEffect()
useLikeEffect()
useThemeEffect()
useDebugEffect()
useGlobalKeyboardListeners()
useSonglistsEffect()
useTabEffect()

const route = useRoute()
</script>

<template>
    <Nav />
    <RouterView
        v-slot="{ Component }"
        class="bg-base-100"
    >
        <KeepAlive
            :max="10"
            :include="['Home', 'PlayingNow', 'UserCenter', 'Search']"
        >
            <component :is="Component" />
        </KeepAlive>
    </RouterView>
    <LoginModal />
    <Audio />
    <KeepAlive>
        <component :is="route.path.includes('/playing') ? '' : MiniMusicControl" />
    </KeepAlive>
</template>

<style lang="scss">
#app {
    min-height: 100vh;
    min-height: 100dvh;
    padding-top: env(safe-area-inset-top);
    padding-bottom: 80px;
}

html::view-transition-group(*) {
    animation-duration: 0.5s;
    animation-timing-function: ease;
    /** reduce animation glitch */
    animation-delay: 50ms;
}

* {
    // Firefox
    @supports not selector(::-webkit-scrollbar) {
        scrollbar-width: thin;
    }

    &::-webkit-scrollbar {
        width: 8px;
        height: 4px;
    }

    &::-webkit-scrollbar-thumb {
        position: absolute;
        top: 0;
        right: 0;
        min-height: 20px;
        border-radius: 8px;
        background-clip: content-box;
        box-shadow: 0 0 0 8px hsl(var(--b2)) inset;
    }

    &::-webkit-scrollbar-thumb:hover {
        box-shadow: 0 0 0 8px hsl(var(--b3)) inset;
    }

    &::-webkit-scrollbar-corner {
        background: transparent;
    }
}

.btn {
    animation: none !important;
}
</style>

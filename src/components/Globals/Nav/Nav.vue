<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useMediaQuery } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useAuthStore, usePlaylistStore } from 'stores'
import Button from '../../Button.vue'
import { MobileMenu, Profile } from './components'

const auth = useAuthStore()
const { playMode, currentSong } = storeToRefs(usePlaylistStore())
const { switchToRadio } = usePlaylistStore()
const router = useRouter()
const navRoutes = [
    {
        name: 'Home',
        to: '/'
    },
    {
        name: 'Playing',
        to: '/playing'
    },
    {
        name: 'My music',
        to: '/user-center'
    }
]
const route = useRoute()
const isTop = ref(window.scrollY === 0)
const searchTransition = ref(false)
const lessThan1024 = useMediaQuery('(max-width: 1023px)')
const lessThan768 = useMediaQuery('(max-width: 767px)')

watch(
    route,
    (val) => {
        if (val.path.includes('/search')) {
            searchTransition.value = false
        }
    },
    { immediate: true }
)

onMounted(() => {
    window.addEventListener(
        'scroll',
        () => {
            isTop.value = window.scrollY === 0
        },
        { passive: true }
    )
})

function isActiveRoute(to: string) {
    if (to === '/') {
        return to === route.path
    } else {
        return route.path.includes(to)
    }
}

async function onSearchClick() {
    searchTransition.value = true
    await nextTick()
    router.push(`/search`)
}

async function onRadioClick() {
    if (playMode.value !== 'radio') {
        await switchToRadio()
    } else {
        router.push('/playing')
    }
}
</script>

<template>
    <nav
        :class="[
            'navbar',
            'fixed',
            'top-0',
            'z-[200]',
            'px-4',
            'duration-500',
            { 'bg-base-100/90': !isTop },
            { 'backdrop-blur-2xl': !isTop }
        ]"
    >
        <RouterLink
            class="mr-4 flex items-center text-2xl font-bold text-primary"
            to="/"
        >
            <i-solar-vinyl-bold-duotone class="mr-3 h-9 w-9" />
            <span>Music</span>
        </RouterLink>
        <div class="mx-4 w-full flex-auto">
            <template v-if="!lessThan1024">
                <RouterLink
                    v-for="item in navRoutes"
                    :key="item.name"
                    :class="[
                        'link',
                        'mx-2',
                        'px-4',
                        'h-8',
                        'flex',
                        'items-center',
                        'rounded',
                        'relative'
                    ]"
                    :to="item.to"
                >
                    <div
                        v-trans="{ 'nav-link': isActiveRoute(item.to) }"
                        :class="[
                            'absolute',
                            'w-full',
                            'h-full',
                            'top-0',
                            'left-0',
                            'rounded',
                            {
                                'bg-primary/5': isActiveRoute(item.to),
                                'dark:bg-primary/20': isActiveRoute(item.to)
                            }
                        ]"
                    />
                    <span
                        :class="{
                            'font-bold': isActiveRoute(item.to),
                            'link-primary': isActiveRoute(item.to)
                        }"
                    >
                        {{ item.name }}
                    </span>
                </RouterLink>
            </template>
        </div>
        <div
            v-if="!lessThan768"
            class="flex-fixed"
        >
            <div
                v-if="!route.path.includes('/search')"
                class="relative mr-8"
            >
                <button
                    v-view-transition-name="{ 'search-input': searchTransition }"
                    class="flex h-8 items-center justify-between rounded-full bg-primary/10 px-4 dark:bg-secondary/20"
                    @click="onSearchClick"
                >
                    <i-solar-magnifer-line-duotone
                        v-view-transition-name="{ 'search-icon': searchTransition }"
                        class="z-10 mr-2 h-4 w-4 text-primary dark:text-secondary"
                    />
                    <span
                        :class="[
                            'text-sm',
                            'text-base-content/50',
                            'dark:text-base-content/80',
                            { 'opacity-0': searchTransition }
                        ]"
                    >
                        搜索
                    </span>
                </button>
            </div>
            <Button
                v-if="auth.loggedIn"
                :class="[
                    { 'fm-playing': playMode === 'radio' && currentSong?.status === 'playing' },
                    'btn-primary',
                    'btn-sm',
                    'mr-4'
                ]"
                @click="onRadioClick"
            >
                <i-solar-play-stream-line-duotone class="h-6 w-6" />
                私人FM
            </Button>
            <Button
                v-if="!auth.loggedIn"
                class="btn-ghost"
                @click="auth.openLogin"
            >
                登录
            </Button>
            <Profile v-else />
        </div>
        <div
            v-else
            class="flex-fixed"
        >
            <Button
                v-if="auth.loggedIn"
                :class="[
                    { 'fm-playing': playMode === 'radio' && currentSong?.status === 'playing' },
                    'btn-primary',
                    'btn-square',
                    'btn-sm',
                    'mr-2'
                ]"
                @click="onRadioClick"
            >
                <template #icon>
                    <i-solar-play-stream-line-duotone class="h-6 w-6" />
                </template>
            </Button>
        </div>

        <MobileMenu v-if="lessThan1024" />
    </nav>
</template>

<style lang="scss">
nav.navbar {
    padding-top: env(safe-area-inset-top);
    transition: background 200ms;

    .link {
        text-decoration: none;
    }
}

button.fm-playing {
    animation: fm-playing 2s infinite !important;
}

@keyframes fm-playing {
    0% {
        box-shadow: 0px 0px 0px 0px hsl(var(--p) / 0.7);
    }

    100% {
        box-shadow: 0px 0px 0px 7px hsl(var(--p) / 0);
    }
}

::view-transition-new(search-input),
::view-transition-old(search-input) {
    height: 100%;
}
</style>

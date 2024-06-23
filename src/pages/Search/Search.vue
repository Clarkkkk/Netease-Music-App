<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useDeviceType } from 'services'
import { SEARCH } from 'api'
import { Tabs } from 'components'
import { wait } from '../../utils/wait'
import { AlbumPanel, LyricsPanel, MixedPanel, SonglistPanel, SongPanel } from './components'

const tabs = [
    {
        name: '综合',
        value: SEARCH.MIXED
    },
    {
        name: '专辑',
        value: SEARCH.ALBUM
    },
    {
        name: '歌单',
        value: SEARCH.PLAYLIST
    },
    {
        name: '歌曲',
        value: SEARCH.SINGLE
    },
    {
        name: '歌词',
        value: SEARCH.LYRICS
    }
] as const

const keyword = ref('')
const { isMobile } = useDeviceType()
const viewTransitionEnded = ref(false)

function onSearch(val: string) {
    keyword.value = val
}

onMounted(async () => {
    await wait(1000)
    viewTransitionEnded.value = true
})
</script>

<template>
    <search
        id="search"
        class="container mx-auto flex flex-col items-center px-6 pt-16 md:px-12"
        role="search"
    >
        <form
            class="relative mt-2 flex w-full justify-center md:mt-12 md:w-auto"
            action=""
            @submit.prevent="() => {}"
        >
            <i-solar-magnifer-line-duotone
                v-view-transition-name="{ 'search-icon': !isMobile && !viewTransitionEnded }"
                class="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-primary md:h-6 md:w-6"
            />
            <input
                v-view-transition-name="{ 'search-input': !viewTransitionEnded }"
                type="search"
                autofocus
                class="input input-primary input-sm w-full rounded-full bg-transparent pl-10 text-base md:input-md md:w-128 md:pl-14 md:text-lg"
                @keydown.enter="(e) => onSearch((e.target as HTMLInputElement).value)"
            />
        </form>

        <Tabs
            v-show="keyword"
            :tabs="tabs"
            class="flex w-full flex-col items-center"
            tab-class="mt-6"
            tab-pane-class="mt-2"
        >
            <template #综合="{ currentTab }">
                <MixedPanel
                    :active="currentTab.name === '综合'"
                    :keyword="keyword"
                />
            </template>
            <template #专辑="{ currentTab }">
                <AlbumPanel
                    :active="currentTab.name === '专辑'"
                    :keyword="keyword"
                />
            </template>
            <template #歌单="{ currentTab }">
                <SonglistPanel
                    :active="currentTab.name === '歌单'"
                    :keyword="keyword"
                />
            </template>
            <template #歌曲="{ currentTab }">
                <SongPanel
                    :active="currentTab.name === '歌曲'"
                    :keyword="keyword"
                />
            </template>
            <template #歌词="{ currentTab }">
                <LyricsPanel
                    :active="currentTab.name === '歌词'"
                    :keyword="keyword"
                />
            </template>
        </Tabs>
    </search>
</template>

<style lang="scss"></style>

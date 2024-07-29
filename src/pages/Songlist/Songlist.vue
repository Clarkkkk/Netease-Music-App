<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSonglist } from 'services'
import { IntersectionObserver } from 'components'
import { Info, List } from './components'
import { provide } from './context'

const route = useRoute()
const { info, songlist, onFullLoad, onIncrementalLoad, initSonglist, more, reset } = useSonglist()

provide({
    id: Number(route.params.id),
    reload: () => initSonglist(Number(route.params.id))
})

async function onChange(visible: boolean) {
    if (!visible) return
    onIncrementalLoad()
}

watch(
    route,
    (val) => {
        if (!val.path.includes('songlist')) return
        if (!info.value || !route.path.includes(info.value.id.toString())) {
            initSonglist(Number(val.params.id))
            reset()
        }
    },
    {
        immediate: true
    }
)
</script>

<template>
    <div
        id="songlist-page"
        class="container mx-auto mt-6 px-6 pt-16 md:px-12"
    >
        <Info :info="info" />
        <List
            :list="songlist"
            :on-full-load="onFullLoad"
        />
        <IntersectionObserver
            v-if="songlist.length"
            :is-bottom="!more"
            @change="onChange"
        />
    </div>
</template>

<style></style>

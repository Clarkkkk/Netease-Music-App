<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAlbum } from 'services'
import { Info, List } from './components'

const route = useRoute()
const { album, info, initAlbum, extraInfo, updateExtraInfo, reset } = useAlbum()

watch(
    route,
    (val) => {
        if (!val.path.includes('album')) return
        if (!info.value || !route.path.includes(info.value.id.toString())) {
            initAlbum(+val.params.id.toString())
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
        <Info
            :info="info"
            :extra-info="extraInfo"
        />
        <List
            :id="Number(route.params.id)"
            :list="album"
            :extra-info="extraInfo"
            @change="() => updateExtraInfo(Number(route.params.id))"
        />
    </div>
</template>

<style></style>

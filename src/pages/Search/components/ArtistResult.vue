<script setup lang="ts">
import ListItem from './ListItem.vue'

interface Artist {
    id: number
    name: string
    subName?: string
    picUrl: string
}

defineProps<{ list: Artist[] }>()
</script>

<template>
    <div class="w-full rounded-xl bg-gradient-to-b from-primary/5 to-50% p-4">
        <div class="flex w-full">
            <h2
                class="flex h-6 items-center border-l-4 border-primary px-2 text-lg font-bold text-base-content"
            >
                歌手
            </h2>
        </div>
        <ListItem
            v-for="artist in list"
            :key="artist.id"
            :list-item="{
                name: artist.name,
                creator: artist.subName || '',
                cover: artist.picUrl,
                id: artist.id
            }"
            type="artist"
            class="flex items-center"
        />
    </div>
</template>

<style lang="scss"></style>

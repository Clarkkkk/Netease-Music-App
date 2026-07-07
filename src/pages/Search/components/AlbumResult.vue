<script setup lang="ts">
import ListItem from './ListItem.vue'

interface SonglistItem {
    name: string
    creator: string
    creatorId?: number
    cover: string
    id: number
}

defineProps<{ list: SonglistItem[] }>()
</script>

<template>
    <div class="w-full rounded-xl bg-gradient-to-b from-accent/5 to-50% p-4">
        <div class="flex w-full">
            <h2
                class="flex h-6 items-center border-l-4 border-accent px-2 text-lg font-bold text-base-content"
            >
                专辑
            </h2>
        </div>
        <ListItem
            v-for="songlist in list"
            :key="songlist.id"
            :list-item="songlist"
            type="album"
            class="flex items-center"
        />
    </div>
</template>

<style lang="scss"></style>

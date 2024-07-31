<script setup lang="ts">
import { toRef } from 'vue'
import { useVirtualList } from '@vueuse/core'
import { SongItem } from 'components'

const props = defineProps<{
    list: Song[]
}>()

const listRef = toRef(() => props.list)

const {
    list: visibleList,
    containerProps,
    wrapperProps
} = useVirtualList(listRef, { itemHeight: 72, overscan: 15 })
</script>

<template>
    <ul
        :class="[
            'song-list',
            'list',
            'relative',
            'w-full',
            'overflow-x-visible',
            'overflow-y-scroll',
            { 'is-empty': !list.length }
        ]"
        v-bind="containerProps"
    >
        <div v-bind="wrapperProps">
            <SongItem
                v-for="item in visibleList"
                :key="item.data.id"
                :song="item.data"
            />
        </div>
    </ul>
</template>

<style lang="scss">
#new-songs {
    .song-list::after {
        content: '';
        position: sticky;
        bottom: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 15px;
        background: linear-gradient(to top, hsl(var(--b1)) 0%, hsl(var(--b1) / 0%));
    }

    .song-list.is-empty::after {
        display: none;
    }
}
</style>

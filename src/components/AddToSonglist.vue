<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ComponentExposed } from 'vue-component-type-helpers'
import { storeToRefs } from 'pinia'
import { Image } from 'components'
import type { ApiPlaylistTracks } from 'src/api'
import { useSonglistsStore } from 'src/stores'
import { post } from 'src/utils'
import { ContextMenu, ContextMenuItem } from './ContextMenu'

const menuRef = ref<ComponentExposed<typeof ContextMenu>>()
const { updateSonglists } = useSonglistsStore()
const { createdSonglists } = storeToRefs(useSonglistsStore())
const songIdToAdd = ref(0)

onMounted(() => {
    console.log('mounted')
})

async function onClick(songlistId: number) {
    if (!songIdToAdd.value || !songlistId) return
    await post<ApiPlaylistTracks>('/playlist/tracks', {
        op: 'add',
        pid: songlistId,
        tracks: [songIdToAdd.value].join(',')
    })
    await updateSonglists()
}

defineExpose({
    show: (id?: number) => {
        menuRef.value?.showMenu()
        if (id) {
            songIdToAdd.value = id
        }
    },
    hide: () => {
        menuRef.value?.hideMenu()
        songIdToAdd.value = 0
    }
})
</script>

<template>
    <ContextMenu
        ref="menuRef"
        placement="right"
        size="large"
    >
        <template #menu>
            <ContextMenuItem
                v-for="songlist in createdSonglists"
                :key="songlist.id"
                @click="() => onClick(songlist.id)"
            >
                <div class="flex items-center">
                    <Image
                        :src="songlist.coverImgUrl"
                        class="mr-4 h-8 w-8 rounded"
                    />
                    {{ songlist.name }}
                </div>
            </ContextMenuItem>
        </template>
    </ContextMenu>
</template>

<style lang="scss"></style>

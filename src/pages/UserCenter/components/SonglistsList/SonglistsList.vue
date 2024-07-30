<script setup lang="ts">
import { computed, ref } from 'vue'
import { useVirtualList } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useSonglistsStore } from 'stores'
import ListItem from 'src/pages/Search/components/ListItem.vue'

const currentTab = ref<'created-list' | 'collected-list'>('created-list')
const { createdSonglists, collectedSonglists } = storeToRefs(useSonglistsStore())

const songlistArr = computed(() => {
    const list =
        currentTab.value === 'created-list' ? createdSonglists.value : collectedSonglists.value
    return list.map((item) => {
        return {
            name: item.name,
            creator: item.creator.nickname,
            cover: item.coverImgUrl,
            id: item.id
        }
    })
})
const { list, containerProps, wrapperProps } = useVirtualList(songlistArr, { itemHeight: 72 })

async function onTabChange() {
    currentTab.value = currentTab.value === 'created-list' ? 'collected-list' : 'created-list'
}
</script>

<template>
    <div
        id="songlists-list"
        class="mt-8 flex w-full flex-col rounded-lg bg-base-100 bg-gradient-to-b from-primary/5 to-30% p-4"
    >
        <div class="mb-4 flex w-full items-center">
            <template v-if="currentTab === 'created-list'">
                <h2 class="border-l-4 border-primary px-2 text-lg/5 font-bold">我创建的歌单</h2>
                <div class="h-4 w-px bg-base-content/10"></div>
                <button
                    class="ml-2 text-sm"
                    @click="onTabChange"
                >
                    我收藏的歌单
                </button>
            </template>
            <template v-else>
                <h2 class="border-l-4 border-primary px-2 text-lg/5 font-bold">我收藏的歌单</h2>
                <div class="h-4 w-px bg-base-content/10"></div>
                <button
                    class="ml-2 text-sm"
                    @click="onTabChange"
                >
                    我创建的歌单
                </button>
            </template>
        </div>

        <ul
            class="songlists-list relative flex h-[800px] w-full flex-wrap overflow-y-auto overflow-x-visible"
            v-bind="containerProps"
        >
            <div v-bind="wrapperProps">
                <ListItem
                    v-for="item in list"
                    :key="item.data.id"
                    :list-item="item.data"
                    type="songlist"
                    class="flex items-center"
                />
            </div>
        </ul>
    </div>
</template>

<style lang="scss"></style>

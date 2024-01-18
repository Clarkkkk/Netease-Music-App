<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAnimation } from 'services'
import { useLikeStore, usePlaylistStore } from 'stores'
import { Button, ContextMenu, ContextMenuItem, Playlist } from 'components'

const router = useRouter()
const { animating, onAnimationEnd, startAnimation } = useAnimation()
const { getLikeStatus, switchLikeStatus, dislikeThisSong } = useLikeStore()
const { currentSong } = storeToRefs(usePlaylistStore())
const likingCurrentSong = computed(() => {
    if (!currentSong.value) return false
    return getLikeStatus(currentSong.value)
})

async function onLikeClick() {
    if (!currentSong.value) return
    await switchLikeStatus(currentSong.value)
    startAnimation()
}

async function onDislikeClick() {
    if (!currentSong.value) return
    await dislikeThisSong(currentSong.value)
}

function onCommentClick() {
    alert('敬请期待')
}

async function onAlbumJumpClick() {
    if (!currentSong.value) return
    await router.push(`/album/${currentSong.value.albumId}`)
}
</script>

<template>
    <div
        id="playing-operations"
        class="flex w-80 items-center justify-around text-slate-500"
    >
        <Button
            class="btn btn-square btn-ghost h-10 min-h-10 w-10"
            @click="onLikeClick"
        >
            <template #icon>
                <i-solar-heart-bold
                    v-if="likingCurrentSong"
                    :class="['h-6', 'w-6', 'text-rose-500', { 'like-appear': animating }]"
                    @animationend="onAnimationEnd"
                />
                <i-solar-heart-line-duotone
                    v-else
                    class="h-6 w-6"
                />
            </template>
            <template #loading>
                <i-solar-heart-bold-duotone
                    v-if="likingCurrentSong"
                    class="zooming h-6 w-6"
                />
                <i-solar-heart-line-duotone
                    v-else
                    class="zooming h-6 w-6"
                />
            </template>
        </Button>
        <Button
            class="btn btn-square btn-ghost h-10 min-h-10 w-10"
            @click="onDislikeClick"
        >
            <template #icon>
                <i-solar-heart-broken-line-duotone class="h-6 w-6" />
            </template>
        </Button>
        <Button
            class="btn btn-square btn-ghost h-10 min-h-10 w-10"
            @click="onCommentClick"
        >
            <template #icon>
                <i-solar-chat-dots-line-duotone class="h-6 w-6" />
            </template>
        </Button>
        <Playlist
            class="h-10 w-10"
            icon-class="h-6 w-6"
            placement="right"
        />
        <ContextMenu>
            <Button class="btn btn-square btn-ghost h-10 min-h-10 w-10">
                <template #icon>
                    <i-solar-menu-dots-line-duotone class="h-6 w-6" />
                </template>
            </Button>

            <template #menu>
                <ContextMenuItem @click="onAlbumJumpClick">
                    <i-solar-vinyl-line-duotone class="h-5 w-5" />
                    查看专辑
                </ContextMenuItem>
            </template>
        </ContextMenu>
    </div>
</template>

<style lang="scss" scoped>
.zooming {
    animation: zoom 600ms infinite alternate;
}

.like-appear {
    animation: zoom-appear cubic-bezier(0, 1.45, 0.71, 1.61) 500ms;
}

@keyframes zoom {
    from {
        transform: scale(1);
    }

    to {
        transform: scale(0.8);
    }
}

@keyframes zoom-appear {
    from {
        transform: scale(0.7);
    }

    to {
        transform: scale(1);
    }
}
</style>

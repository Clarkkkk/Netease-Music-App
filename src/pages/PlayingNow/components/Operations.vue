<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ComponentExposed } from 'vue-component-type-helpers'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAnimation, useDeviceType } from 'services'
import { useLikeStore, usePlaylistStore } from 'stores'
import { Button, ContextMenu, ContextMenuItem, Playlist, Tooltip, VolumeControl } from 'components'
import AddToSonglist from 'components/AddToSonglist.vue'
import { isAppleMobileDevice } from 'utils'

const router = useRouter()
const { animating, onAnimationEnd, startAnimation } = useAnimation()
const { isMobile } = useDeviceType()
const { getLikeStatus, switchLikeStatus, dislikeThisSong } = useLikeStore()
const { currentSong, playMode } = storeToRefs(usePlaylistStore())
const { updatePlayMode } = usePlaylistStore()
const tooltipRef = ref<ComponentExposed<typeof Tooltip>>()
const addToSonglistRef = ref<ComponentExposed<typeof AddToSonglist>>()

const likingCurrentSong = computed(() => {
    if (!currentSong.value) return false
    return getLikeStatus(currentSong.value)
})

const playModeText = computed(() => {
    if (playMode.value === 'list-loop') {
        return '列表循环'
    } else if (playMode.value === 'list-sequent') {
        return '列表顺序'
    } else if (playMode.value === 'song-loop' || playMode.value === 'radio-song-loop') {
        return '单曲循环'
    } else if (playMode.value === 'radio') {
        return '电台顺序'
    } else {
        return ''
    }
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

function onAddToSonglistClick() {
    addToSonglistRef.value?.show(currentSong.value?.id)
}

async function onAlbumJumpClick() {
    if (!currentSong.value) return
    await router.push(`/album/${currentSong.value.albumId}`)
}

async function onArtistJumpClick() {
    if (!currentSong.value) return
    await router.push(`/artist/${currentSong.value.artistId}`)
}

let timeoutId = 0
function onPlayModeClick() {
    clearTimeout(timeoutId)
    tooltipRef.value?.show()

    if (playMode.value === 'list-sequent') {
        updatePlayMode('list-loop')
    } else if (playMode.value === 'list-loop') {
        updatePlayMode('song-loop')
    } else if (playMode.value === 'song-loop') {
        updatePlayMode('list-sequent')
    } else if (playMode.value === 'radio') {
        updatePlayMode('radio-song-loop')
    } else if (playMode.value === 'radio-song-loop') {
        updatePlayMode('radio')
    }

    timeoutId = window.setTimeout(() => {
        tooltipRef.value?.hide()
    }, 2000)
}
</script>

<template>
    <div
        id="playing-operations"
        class="flex w-80 items-center justify-around text-slate-500"
    >
        <Tooltip
            ref="tooltipRef"
            :content="playModeText"
        >
            <Button
                class="btn btn-square btn-ghost h-10 min-h-10 w-10"
                @click="onPlayModeClick"
            >
                <template #icon>
                    <i-solar-repeat-line-duotone
                        v-if="playMode === 'list-loop'"
                        class="h-6 w-6"
                    />
                    <i-solar-repeat-one-line-duotone
                        v-if="playMode === 'song-loop' || playMode === 'radio-song-loop'"
                        class="h-6 w-6"
                    />
                    <i-solar-list-down-minimalistic-line-duotone
                        v-if="playMode === 'list-sequent'"
                        class="h-6 w-6"
                    />
                    <i-solar-radio-line-duotone
                        v-if="playMode === 'radio'"
                        class="h-6 w-6"
                    />
                </template>
            </Button>
        </Tooltip>
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
                <div
                    v-if="!isMobile && !isAppleMobileDevice()"
                    class="mb-2"
                >
                    <VolumeControl />
                </div>
                <ContextMenuItem @click="onAddToSonglistClick">
                    <i-solar-playlist-minimalistic-3-line-duotone class="h-5 w-5" />
                    收藏到歌单
                </ContextMenuItem>
                <ContextMenuItem @click="onAlbumJumpClick">
                    <i-solar-vinyl-line-duotone class="h-5 w-5" />
                    查看专辑
                </ContextMenuItem>
                <ContextMenuItem @click="onArtistJumpClick">
                    <i-solar-users-group-rounded-line-duotone class="h-5 w-5" />
                    查看歌手
                </ContextMenuItem>
                <ContextMenuItem @click="onCommentClick">
                    <i-solar-chat-dots-line-duotone class="h-5 w-5" />
                    查看评论
                </ContextMenuItem>
            </template>
        </ContextMenu>

        <AddToSonglist ref="addToSonglistRef" />
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

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlaylistStore } from 'stores'
import { Tooltip } from 'components'

const { currentSong } = storeToRefs(usePlaylistStore())
</script>

<template>
    <div class="flex flex-col items-center">
        <Tooltip :content="currentSong?.subName">
            <h1
                v-view-transition-name="'playing-name'"
                class="px-4 text-center text-lg font-bold text-base-content sm:text-xl"
            >
                {{ currentSong?.name || '未播放' }}
            </h1>
        </Tooltip>
        <!-- <h2
            v-if="currentSong?.subName && currentSong?.subName !== 'null'"
            v-view-transition-name="'playing-subname'"
            class="px-4 text-center text-xs text-base-content/70 sm:text-sm"
        >
            ({{ currentSong?.subName || '--' }})
        </h2> -->
        <p
            v-if="currentSong?.artist"
            v-view-transition-name="'playing-artist'"
            class="mt-1 flex items-center text-center text-xs text-base-content sm:text-sm"
        >
            <i-solar-microphone-bold-duotone class="mr-1 h-4 w-4 text-primary sm:h-5 sm:w-5" />
            {{ currentSong?.artist || '--' }}
        </p>
    </div>
</template>

<style></style>

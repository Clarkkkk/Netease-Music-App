<script setup lang="ts">
import { ref } from 'vue'
import type { ApiUserPlaylist } from 'api'
import { storeToRefs } from 'pinia'
import { useLoginService } from 'services'
import { useProfileStore } from 'stores'
import { Image } from 'components'
import { post } from '../../utils/request'
import { AlbumList, FavoriteSongs, RecentSongs, SonglistsList, UserInfo } from './components'

const { profile } = storeToRefs(useProfileStore())
const { onProfileLoaded } = useLoginService()
const offset = ref(0)
const favoriteListId = ref(0)

onProfileLoaded((p) => {
    post<ApiUserPlaylist>('/user/playlist', {
        uid: p.profile.userId,
        limit: 30,
        offset: offset.value
    }).then((res) => {
        favoriteListId.value = res.playlist[0].id
    })
})
</script>

<template>
    <div
        id="user-center"
        class="relative w-screen bg-base-100 pt-16"
    >
        <Image
            v-if="profile"
            id="profile-background"
            :src="profile.profile.backgroundUrl"
        />
        <div class="container relative z-10 mx-auto">
            <UserInfo />
            <AlbumList />
            <div class="px-4 lg:flex">
                <div class="w-full lg:w-2/3">
                    <FavoriteSongs :id="favoriteListId" />
                </div>
                <div class="mt-12 w-full lg:ml-12 lg:mt-0 lg:w-1/3">
                    <RecentSongs />
                </div>
            </div>
            <div class="px-4 lg:flex">
                <SonglistsList />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
#user-center {
    #profile-background {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 0;
        mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.3), transparent 100%);
        filter: blur(30px) saturate(150%) brightness(1.3);
        transform: scale(1.1);
        width: 100%;
        height: 300px;

        img {
            object-fit: cover;
        }
    }
}
</style>

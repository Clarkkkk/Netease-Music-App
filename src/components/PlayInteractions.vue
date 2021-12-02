<template>
  <div id="play-interactions">
    <app-like-icon class="like" />
    <app-icon
      icon="comment"
      class="comments"
      @click="notReady"
    />
    <app-icon
      icon="vertical-dots"
      class="info"
      @click="onDotsClick"
    />
    <app-pop-menu
      v-model:show="showMenu"
      :menu-arr="menuArr"
    />
    <app-pop-menu v-model:show="showList">
      <div
        v-for="list in songlistArr"
        :key="list.id"
        class="song-list-item"
        @click="addSong(list.id)"
      >
        <app-image
          :src="list.coverImgUrl"
          width="50"
        />
        <div class="song-list-info">
          <span>{{ list.name }}</span>
          <span>{{ list.trackCount + '首' }}</span>
        </div>
      </div>
    </app-pop-menu>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import {useStore} from 'vuex';
import AppLikeIcon from '@/components/AppLikeIcon.vue';
import AppPopMenu from './AppPopMenu.vue';
import AppImage from './AppImage.vue';
import fetchJSON from '@/functions/fetchJSON.js';

const showMenu = ref(false);
const showList = ref(false);
const more = ref(false);
const page = ref(0);
const LIMIT = 30;
const createdCount = ref(-1);
const songlistArr = reactive([]);
const songlistLoading = ref(false);
const store = useStore();
console.log(store)
const userID = computed(() => store.state.auth.userID);
const songId = computed(() => store.getters.currentSong.id);
const menuArr = reactive([
  {
    name: '收藏到歌单',
    callback: () => {
      showList.value = true;
      songlistLoading.value = true;
      const limit = Math.min(createdCount.value, LIMIT);
      console.log({
        uid: userID.value,
        limit,
        offset: page.value * LIMIT
      })
      fetchJSON('/user/playlist', {
        uid: userID.value,
        limit,
        offset: page.value * LIMIT
      }, false).then((res) => {
        more.value = res.more && limit < createdCount.value;
        songlistArr.push(...res.playlist.slice(1));
        page.value += 1;
        setTimeout(() => {
          songlistLoading.value = false;
        }, 100);
      });
    }
  }
]);

fetchJSON('/user/subcount').then((res) => {
  createdCount.value = res.createdPlaylistCount;
});

function notReady() {
  alert('待开发');
}

function onDotsClick() {
  showMenu.value = !showMenu.value;
}

function addSong(listId) {
  fetchJSON('/playlist/tracks', {
    op: 'add',
    pid: listId,
    tracks: songId.value.toString()
  }).then(() => {
    showList.value = false;
  });
}
</script>

<style scoped>
#play-interactions {
  display: grid;
  grid-row: interactions;
  grid-template-columns: 0.5fr repeat(3, 1fr) 0.5fr;
  grid-template-rows: [start] 3rem [end];
  width: 100%;
  height: 100%;
  place-items: center;
}

.like {
  grid-column: 2 / 3;
  width: 1.8rem;
  height: 1.8rem;
  font-size: 1.8rem;
  cursor: pointer;
}

.comments {
  grid-column: 3 / 4;
  width: 1.8rem;
  height: 1.8rem;
  font-size: 1.8rem;
  cursor: pointer;
}

.info {
  grid-column: 4 / 5;
  width: 1.8rem;
  height: 1.8rem;
  font-size: 1.8rem;
  cursor: pointer;
}
</style>

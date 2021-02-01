<template>
  <div id="discover-search-result">
    <div
      v-if="loading"
      class="loading"
    >
      <app-loading-icon />
    </div>
    <div
      v-else
      class="content"
    >
      <div class="multimatch">
        <span>你可能感兴趣</span>
        <div
          v-for="item in matchResult"
          :key="item.id"
          class="multimatch-item"
        >
          <img :src="item.picUrl" alt="封面图片">
          <span>{{ item.type + '：' + item.name }}</span>
          <span v-if="item.artist">{{ item.artist.name }}</span>
        </div>
      </div>

      <div class="mixed">
        <span>单曲</span>
        <app-song-entry
          v-for="song in mixedResult"
          :key="song.id"
          :song-name="song.name"
          :song-artist="song.artist"
          :song-album="song.album"
          :song-id="song.id"
          :song-cover="song.cover"
        />
        <span>{{ mixedResult.moreText }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import fetchJSON from '@/functions/fetchJSON.js';
import AppSongEntry from '@/components/AppSongEntry.vue';
import AppLoadingIcon from '@/components/AppLoadingIcon.vue';
export default {
  props: ['searchText'],
  data: function() {
    return {
      loading: true,
      songResult: [],
      matchResult: [],
      mixedResult: []
    };
  },

  components: {
    AppSongEntry,
    AppLoadingIcon
  },

  created: function() {
    fetchJSON('/search/multimatch', {keywords: this.searchText})
      .then((data) => {
        console.log(data);
        // 需要为不同的结果编写不同代码，待续
        const orders = data.result.orders;
        if (orders) {
          for (const type of orders) {
            this.matchResult = this.matchResult.concat(data.result[type]);
          }
        }
      });

    fetchJSON('/search', {
      keywords: this.searchText,
      type: '1018'
    }).then((data) => {
      // 先写展示歌曲结果的部分
      // const order = data.result.order;
      // const song = data.result.song.songs;
      console.log(data);
      this.mixedResult = data.result.song.songs.map((song) => {
        const arString = song.ar.map((ar) => ar.name).join('/');
        return {
          id: song.id,
          name: song.name,
          artist: arString,
          album: song.al.name,
          albumId: song.al.id,
          cover: song.al.picUrl
        };
      });
      this.loading = false;
    });
  },

  methods: {
    arString(ar) {
      console.log(ar.join('/'));
      return ar.join('/');
    }
  }
};
</script>

<style scoped>
#discover-search-result {
  width: 100%;
  height: 100%;
}

.content {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows:
    [start list-start] 1fr [list-end end];
  align-items: start;
  justify-items: center;
}

/* multimatch result */
.multimatch {
  grid-row: list-start / list-end;
  /* needs further editing */
  display: none;
  grid-template-rows: [title-start] 3rem [title-end];
  grid-auto-flow: row;
  grid-auto-rows: 3rem;
  width: 100%;
}

.multimatch-item {
  display: grid;
  grid-template-rows: [start title-start] 1fr [title-end author-start] 1fr [author-end end];
  grid-template-columns: [start pic-start] 4rem [pic-end text-start] 1fr [text-end end];
}

.multimatch-item img {
  grid-row: start / end;
  grid-column: pic-start / pic-end;
  width:100%;
}
/* multimatch result */

/* mixed result */
.mixed {
  grid-row: list-start / list-end;
  width: 100%;
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: max-content;
}

.mixed > span:first-child {
  padding: 0 1rem;
  font-size: 1.2rem;
  height: 3rem;
  line-height: 3rem;
  font-weight: bold;
  border-bottom: 1px solid #eee;
  user-select: none;
}

.mixed > span:last-child {
  text-align: center;
  height: 3rem;
  line-height: 3rem;
  font-size: 0.8rem;
  color: #666;
  user-select: none;
  cursor: pointer;
  width: 10rem;
  justify-self: center;
}
/* mixed result */
</style>

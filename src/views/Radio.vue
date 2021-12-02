<template>
  <div id="radio" @scroll="onScroll">
    <img alt="背景图片" class="background fade-in" :src="picUrl">

    <div class="content">
      <div class="header">
        <app-back-button />
        <span class="title">私人FM</span>
      </div>

      <radio-cover class="cover" />

      <app-loop-text :text="currentSong.name" class="song-name" />
      <div class="song-artist">{{ currentSong.artist }}</div>

      <play-progress-bar :update-list="updateList" />
      <radio-controls />
    </div>
  </div>
</template>

<script>
import AppBackButton from '@/components/AppBackButton.vue';
import AppLoopText from '@/components/AppLoopText.vue';
import PlayProgressBar from '@/components/PlayProgressBar.vue';
import RadioControls from '@/components/RadioControls.vue';
import RadioCover from '@/components/RadioCover.vue';
import fetchJSON from '@/functions/fetchJSON.js';
import {mapState, mapGetters, mapMutations} from 'vuex';
export default {
  components: {
    AppBackButton,
    AppLoopText,
    PlayProgressBar,
    RadioControls,
    RadioCover
  },
  computed: {
    ...mapState('playStatus', ['playing']),
    ...mapGetters('radioPlay', ['currentSong']),
    ...mapState('radioPlay', ['radioIndex', 'radioList']),
    picUrl() {
      return this.currentSong.cover ?
        this.currentSong.cover : require('@/assets/default-pic.jpg');
    }
  },

  watch: {
    radioIndex(newIndex) {
      console.log(newIndex);
      if (newIndex > 0 && this.radioList.length - newIndex <= 2) {
        console.log(this.radioList);
        this.updateList();
      }
    }
  },

  mounted() {
    console.log(this.radioList)
    console.log(this.radioIndex)
    if (this.radioList.length <= 3 || this.radioList.length - this.radioIndex <= 2) {
      console.log('activated update list');
      this.updateList();
    }
  },

  activated() {
    if (this.radioList.length <= 3) {
      console.log('activated update list');
      this.updateList();
    }
  },

  methods: {
    ...mapMutations('radioPlay', ['radioListUpdate']),
    updateList() {
      return fetchJSON('/personal_fm')
        .then((res) => {
          console.log(res);
          this.tempList = res.data.map((song) => {
            const arString = song.artists.map((item) => item.name).join('/');
            const url = song.album.picUrl.replace('http:', 'https:');
            const cover = url ? url + '?param=600y600' : '';
            return {
              id: song.id,
              name: song.name,
              artist: arString,
              album: song.album.name,
              cover: cover,
              timestamp: Date.now()
            };
          });
          const ids = this.tempList.map((song) => song.id).join(',');
          return fetchJSON('/song/url', {id: ids});
        }).then((res) => {
          // get url of the songs
          for (const song of this.tempList) {
            for (const data of res.data) {
              if (data.id === song.id) {
                song.url = data.url;
                break;
              }
            }
          }
          this.radioListUpdate(this.tempList);
          this.tempList.length = 0;
        });
    },
    onScroll(event) {
      event.preventDefault();
      return false;
    }
  }
};
</script>

<style scoped>
#radio {
  width: 100vw;
  height: 100vh;
  color: white;
  background-color: #666;
}

.background {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  object-fit: cover;
  filter: blur(30px) brightness(100%);
  opacity: 0.6;
  transform: scale(1.12);
}

.content {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 10;
  left: 0;
  top: 0;
  display: grid;
  grid-template-areas:
    "header"
    "..."
    "cover"
    "loop-text"
    "artist"
    "..."
    "progress-bar"
    "controls";
  grid-template-rows:
    [start] 4.5rem 1fr min(80vw, 65vh) 3rem 1rem 2fr 2rem 5rem [end];
  grid-template-columns: [start] 100% [end];
  place-items: center;
}

/* header */
.header {
  grid-row: header;
  width: 100%;
  height: 2.5rem;
  margin-top: env(safe-area-inset-top);
  display: grid;
  grid-template-rows: [start] 100% [end];
  grid-template-columns:
    [start back-start] 3rem [back-end title-start]
    1fr [title-end] 3rem [end];
  grid-auto-flow: column;
  align-items: center;
  justify-items: center;
  user-select: none;
}

.title {
  grid-row: start / end;
  grid-column: title;
  font-size: 1.2rem;
  font-weight: bold;
}
/* header */

.cover {
  grid-row: cover;
  height: 100%;
}

/* song info */
.song-name {
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 1.2rem;
  height: 1.2rem;
}

.song-artist {
  grid-row: artist;
  grid-column: start / end;
  font-size: 0.8rem;
}
/* song info */
</style>

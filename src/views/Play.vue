<template>
  <div id="play">
    <img alt="背景图片" class="background" :src="picUrl">

    <div class="content">
      <div class="header">
        <app-back-button/>
        <app-loop-text :text="playName" class="song-name"/>
        <div class="song-artist">{{ playArtist }}</div>
      </div>

      <play-cover/>
      <play-interactions/>
      <play-progress-bar/>
      <play-controls v-model:showPlayList="showPlayList"/>

      <transition name="play-list">
        <play-list
          v-if="showPlayList"
          v-model:show="showPlayList"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import AppBackButton from '@/components/AppBackButton.vue';
import AppLoopText from '@/components/AppLoopText.vue';
import PlayCover from '@/components/PlayCover.vue';
import PlayInteractions from '@/components/PlayInteractions.vue';
import PlayProgressBar from '@/components/PlayProgressBar.vue';
import PlayControls from '@/components/PlayControls.vue';
import PlayList from '@/components/PlayList.vue';
import {createNamespacedHelpers} from 'vuex';
const {mapState} = createNamespacedHelpers('playStatus');
import {mapGetters} from 'vuex';
export default {
  data: function() {
    return {
      showPlayList: false
    };
  },

  computed: {
    ...mapGetters('commonPlay', ['currentSong']),
    ...mapState(['playing']),
    picUrl() {
      return this.playCover || require('@/assets/default-cover.png');
    },
    playName() {
      return this.currentSong.name || '';
    },
    playCover() {
      console.log(this.$store);
      return this.currentSong.cover || '';
    },
    playArtist() {
      return this.currentSong.artist || '';
    }
  },

  components: {
    AppBackButton,
    AppLoopText,
    PlayCover,
    PlayInteractions,
    PlayProgressBar,
    PlayControls,
    PlayList
  }
};
</script>

<style scoped>
#play {
  width: 100vw;
  height: 100vh;
  color: white;
  background-color: #666;
  overflow: hidden;
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
    "..."
    "interactions"
    "progress-bar"
    "controls";
  grid-template-rows: [start] 4.5rem 1fr 70vmin 1fr 3rem 2rem 5rem [end];
  place-items: center;
}

/* header */
.header {
  grid-row: header;
  width: 100%;
  height: 2.5rem;
  margin-top: env(safe-area-inset-top);
  display: grid;
  grid-template-columns:
    [start back-start] 3rem [back-end info-start loop-text-start]
    1fr [info-end loop-text-end] 3rem [end];
  grid-template-rows:
    [start loop-text-start] 1.2fr [loop-text-end artist-start]
    1fr [artist-end end];
  align-items: center;
  justify-items: center;
  user-select: none;
}

.song-name {
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 1.2rem;
  height: 1.2rem;
}

.song-artist {
  grid-row: artist;
  grid-column: info;
  font-size: 0.8rem;
}
/* header */

.play-list-enter-from, .play-list-leave-to {
  opacity: 0;
}

.play-list-enter-active, .play-list-leave-active {
  transition: opacity 300ms;
}
</style>

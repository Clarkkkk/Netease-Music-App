<template>
  <div id="play-controls">
    <app-icon
      icon="like-slash"
      class="dislike"
      @click="dislike"
    />
    <app-like-icon class="like" />
    <div
      class="play"
      @click="onPlay"
    >
      <app-icon :icon="playing ? 'pause' : 'play'" />
    </div>
    <app-icon
      icon="next-song"
      class="next"
      @click="onNext"
    />
    <app-icon
      icon="comment"
      class="comment"
      @click="comment"
    />
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import fetchJSON from '@/functions/fetchJSON.js';
import AppLikeIcon from '@/components/AppLikeIcon.vue';
export default {
  components: {
    AppLikeIcon
  },
  props: ['updateList'],
  computed: {
    ...mapState('playStatus', ['playing']),
    ...mapState('radioPlay', ['radioIndex', 'radioList']),
    ...mapGetters(['currentSong']),
    playID() {
      return this.currentSong.id;
    }
  },
  methods: {
    ...mapMutations('radioPlay', ['next', 'radioListUpdate']),
    ...mapActions('playStatus', ['playOrPause']),
    dislike() {
      fetchJSON('/fm_trash', {id: this.playID})
        .then((res) => {
          if (res.code === 200) {
            this.next();
          }
        });
    },

    onPlay() {
      if (Date.now() - this.currentSong.timestamp > 20 * 60 * 1000) {
        this.updateUrl(this.currentSong.id).then(() => {
          this.playOrPause();
        });
      } else {
        this.playOrPause();
      }
    },

    onNext() {
      const nextSong = this.radioList[this.radioIndex + 1];
      if (!nextSong) {
        this.updateList().then(() => {
          return this.$nextTick();
        }).then(() => {
          this.next();
        });
      } else {
        if (Date.now() - nextSong.timestamp > 20 * 60 * 1000) {
          this.updateUrl(nextSong.id).then(() => {
            this.next();
          });
        } else {
          this.next();
        }
      }
    },

    updateUrl(id) {
      const newList = this.radioList.slice();
      const targetIndex = this.radioList.findIndex((item) => item.id === id);
      if (targetIndex === -1) return;
      return fetchJSON('/song/url', {id: [id]}).then((res) => {
        const [song] = res.data;
        if (song && song.id === id) {
          newList[targetIndex].url = song.url;
          this.radioListUpdate(newList);
        }
        return this.$nextTick();
      });
    },

    comment() {
      alert('待开发');
    }
  }
};
</script>

<style scoped>
#play-controls {
  grid-row: controls;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas: "... dislike like play next comment ...";
  grid-template-columns: 1fr repeat(5, minmax(4rem, 1fr)) 1fr;
  grid-template-rows: [start] 100% [end];
  place-items: center;
}

/* controls */
.dislike {
  grid-column: dislike;
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1.5rem;
  cursor: pointer;
}

.like {
  grid-column: like;
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1.5rem;
  cursor: pointer;
}

.play {
  grid-column: play;
  width: 4rem;
  height: 4rem;
  font-size: 4rem;
  cursor: pointer;
}

.next {
  grid-column: next;
  width: 2.3rem;
  height: 2.3rem;
  font-size: 2.3rem;
  cursor: pointer;
}

.comment {
  grid-column: comment;
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1.5rem;
  cursor: pointer;
}
/* controls */

</style>

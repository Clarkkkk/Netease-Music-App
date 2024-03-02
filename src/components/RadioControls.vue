<template>
  <div id="play-controls">
    <app-icon
      icon="like-slash"
      class="dislike"
      @click.native="dislike"
    />
    <app-like-icon class="like" />
    <div
      class="play"
      @click="playOrPause"
    >
      <app-icon :icon="playing ? 'pause' : 'play'" />
    </div>
    <app-icon
      icon="next-song"
      class="next"
      @click.native="next"
    />
    <app-icon
      icon="comment"
      class="comment"
      @click.native="comment"
    />
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex';
import fetchJSON from '@/functions/fetchJSON.js';
import AppLikeIcon from '@/components/AppLikeIcon.vue';
export default {
  computed: {
    ...mapState('playStatus', ['playing']),
    playID() {
      return this.$store.getters['currentSong'].id;
    }
  },
  components: {
    AppLikeIcon
  },
  methods: {
    ...mapMutations('radioPlay', ['next']),
    ...mapActions('playStatus', ['playOrPause']),
    dislike() {
      fetchJSON('/fm_trash', {id: this.playID})
        .then((res) => {
          if (res.code === 200) {
            this.next();
          }
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

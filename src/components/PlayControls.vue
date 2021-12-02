<template>
  <div id="play-controls">
    <!-- controls for playing -->
    <div
      class="mode"
      @click="switchMode"
    >
      <app-icon :icon="mode" />
    </div>
    <app-icon
      icon="last-song"
      class="prev"
      @click="last"
    />
    <div
      class="play"
      @click="playOrPause"
    >
      <app-icon :icon="playing ? 'pause' : 'play'" />
    </div>
    <app-icon
      icon="next-song"
      class="next"
      @click="next"
    />
    <app-icon
      icon="playlist"
      class="list"
      @click="$emit('update:showPlayList', true)"
    />
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex';
export default {
  prop: ['showPlayList'],
  computed: {
    ...mapState('commonPlay', ['mode']),
    ...mapState('playStatus', ['playing'])
  },
  methods: {
    ...mapMutations('commonPlay', ['switchMode', 'last', 'next']),
    ...mapActions('playStatus', ['playOrPause'])
  }
};
</script>

<style scoped>
#play-controls {
  grid-row: controls;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas: "... mode prev play next list ...";
  grid-template-columns: 1fr repeat(5, minmax(4rem, 1fr)) 1fr;
  grid-template-rows: [start] 100% [end];
  place-items: center;
}

/* controls */
.mode {
  grid-column: mode;
  width: 1.8rem;
  height: 1.8rem;
  font-size: 1.8rem;
  cursor: pointer;
}

.prev {
  grid-column: prev;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 2.5rem;
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
  width: 2.5rem;
  height: 2.5rem;
  font-size: 2.5rem;
  cursor: pointer;
}

.list {
  grid-column: list;
  width: 1.9rem;
  height: 1.9rem;
  font-size: 1.9rem;
  cursor: pointer;
}
/* controls */

</style>

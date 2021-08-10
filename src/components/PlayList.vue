<template>
  <div id="playing-list" @pointerdown.self="hide">
    <transition name="list">
      <div v-if="showList" class="container">
        <div class="header">
          <span class="title">当前播放</span>
          <span class="amount">（{{ playList.length }}）</span>
          <app-icon
            icon="trash"
            class="clear"
            @click.native="clear"
          />
        </div>
        <div class="wrapper" ref="wrapper">
          <div class="content">
            <div
              v-for="song in playList"
              :id="'id' + song.id"
              :key="song.id"
              :class="['entry', {'playing': song.id===playID}]"
              @click="playSongOfList(song)"
            >
              <app-icon class="icon" icon="speaker" v-if="song.id===playID"/>
              <div class="song-info">
                {{ song.name + (song.artist ? ' - ' + song.artist : '') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex';
const {mapState, mapGetters, mapMutations} = createNamespacedHelpers('commonPlay');
import createScroll from '@/functions/createScroll.js';
export default {
  data: function() {
    return {
      showList: false
    };
  },
  porps: ['show'],
  computed: {
    ...mapState(['playList']),
    ...mapGetters(['currentSong']),
    playID() {
      return this.currentSong.id || 0;
    }
  },

  mounted() {
    console.log('mount');
    this.showList = true;
    this.$nextTick().
      then(() => {
        this.scroll = createScroll(0, this.$refs.wrapper);
        return this.$nextTick();
      }).then(() => {
        const playing = document.querySelector(`#id${this.playID}`);
        setTimeout(() => this.scroll.scrollToElement(playing, 0), 200);
      });
  },

  update() {
    this.scroll && this.scroll.refresh();
  },

  deactivated() {
    this.scroll && this.scroll.disable();
  },

  activated() {
    this.scroll && this.scroll.enable();
  },

  beforeUnmount() {
    this.scroll && this.scroll.destroy();
  },

  methods: {
    ...mapMutations(['clear', 'playSongOfList']),
    hide() {
      this.showList = false;
      this.$nextTick(() => {
        this.$emit('update:show', false);
      });
    },
    afterLeave() {
      this.$emit('update:show', false);
    }
  }
};
</script>

<style scoped>
/* The shadow background */
#playing-list {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  background-color: #00000080;
}

.container {
  position: fixed;
  bottom: 1rem;
  height: 25rem;
  width: 92vw;
  margin-left: 4vw;
  background-color: transparent;
  box-shadow: 0 0 15px #00000080;
  border-radius: 1.2rem;
  transform: translate3d(0, 0, 0);
  box-sizing: border-box;
  color: #222;
  overflow: hidden;
  display: grid;
  grid-template-rows:
    [start header-start] 3.5rem [header-end wrapper-start] 21.5rem [wrapper-end end];
  grid-template-columns: [start] 100% [end];
  align-items: center;
}

/* header */
.header {
  grid-row: header;
  grid-column: start / end;
  height: 100%;
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
  display: grid;
  align-items: center;
  background-color: #ffffffc0;
  backdrop-filter: blur(20px);
  border-radius: 1.2rem 1.2rem 0 0;
  border-bottom: 1px solid #00000010;
  z-index: 10;
  user-select: none;
  grid-template-columns:
    [start title-start] 5rem [title-end amount-start]
    2rem [amount-end] 1fr [clear-start] 3rem [clear-end];
}

.title {
  grid-column: title;
  font-size: 1.2rem;
  font-weight: bold;
}

.amount {
  grid-column: amount;
  color: #555;
}

.clear {
  grid-column: clear;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0.9rem;
}
/* header */

/* The list */
.wrapper {
  z-index: 0;
  grid-row: wrapper;
  grid-column: start / end;
  padding: 0 1rem;
  box-sizing: border-box;
  border-radius: 0 0 1.2rem 1.2rem;
  background-color: #ffffffc0;
  backdrop-filter: blur(20px);
  height: 100%;
  width: 100%;
  position: relative;
}

.content {
  min-height: 101%;
  width: 100%;
  display: grid;
  align-items: center;
  grid-auto-rows: 2.5rem;
  grid-template-columns: [start] 100% [end];
}

.entry {
  grid-column: start / end;
  font-size: 1rem;
  height: 100%;
  width: 100%;
  border-bottom: 1px solid #00000010;
  display: grid;
  align-items: center;
  user-select: none;
  cursor: pointer;
  grid-template-columns:
    [start icon-start] min-content [icon-end info-start]
    1fr [info-end end];
}

.entry > .icon {
  grid-column: icon;
  margin-right: 0.3rem;
}

.entry > .song-info {
  grid-column: info;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.playing {
  color: var(--app-color);
}
/* The list */

/* transition */
.list-enter-from,
.list-leave-to {
  transform: translateY(25rem) translateZ(0);
}

.list-enter-active {
  transition: transform 300ms ease;
}

.list-leave-active {
  transition: transform 300ms ease;
}
/* transition */
</style>

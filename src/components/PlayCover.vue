<template>
  <div
    id="play-cover"
  >
    <div class="transition-group">
      <div
        v-for="cover in recentCovers"
        :ref="setCoverRefs"
        :id="cover.id"
        :key="cover.id"
        class="image-container"
      >
        <img
          alt="专辑图片"
          :class="['cover', {'rolling': playing && !isPointerDown}]"
          :src="cover.cover || require('@/assets/default-cover.png')"
          @dragstart.prevent
          @pointerdown="pointerDown"
          @pointerup="pointerUp"
          @pointermove="pointerMove"
          @error="onError"
        >
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex';
export default {
  data() {
    return {
      isSwitching: false,
      isPointerDown: false,
      pointerDownX: 0,
      relativeX: 0,
      coverRefs: [],
      recentCovers: []
    };
  },
  computed: {
    ...mapState('playStatus', ['playing']),
    ...mapGetters('commonPlay', ['lastSong', 'currentSong', 'nextSong']),
    playID() {
      return this.currentSong.id;
    }
  },

  watch: {
    loopPics: {
      handler() {
        this.recentCovers.length = 0;
      },
      deep: true
    },
    playID(id) {
      // When playlist is cleared, recentCovers should be cleared too
      if (!id) {
        this.recentCovers.length = 0;
        return;
      }

      // Slide will also cause playID to change
      // Just return in this case
      if (this.isSliding) {
        return;
      }

      // If current song is changed by clicking buttons or end event
      // determine whether it was the last song or the next song
      // and slide the cover accordingly
      // in this case, sliding is passive
      // further pointer events will be canceled
      if (this.recentCovers[2].id === this.currentSong.id) {
        console.log('if left');
        this.slide('left', true);
      } else if (this.recentCovers[0].id === this.currentSong.id) {
        console.log('if right');
        this.slide('right', true);
      } else {
        console.log('else');
        this.recentCovers = this.getRecentCovers();
      }
    }
  },

  activated() {
    this.recentCovers = this.getRecentCovers();
  },

  methods: {
    ...mapMutations('commonPlay', ['next', 'last']),
    setCoverRefs(el) {
      el && this.coverRefs.push(el);
    },

    getRecentCovers() {
      return [
        this.lastSong,
        this.currentSong,
        this.nextSong
      ];
    },

    // when pointer is down, the covers should stay at where they were
    pointerDown(event) {
      
      this.isPointerDown = true;
      // record the position when pointer down
      this.pointerDownX = event.clientX;
      // bind the pointer events to the current element
      event.target.setPointerCapture(event.pointerId);

      // get the current position
      const currentLeft = event.target.getBoundingClientRect().left;
      // terminate all transitions
      for (const cover of this.coverRefs) {
        // cover.style = '' is necessary for Firefox
        // while it is not empty during transition
        cover.style = '';
        cover.dispatchEvent(new TransitionEvent('transitionend'));
      }
      // get the final position when transition ends
      const targetLeft = event.target.getBoundingClientRect().left;
      this.relativeX = currentLeft - targetLeft;
      // move all the covers to where they were when pointer down
      for (const cover of this.coverRefs) {
        cover.style = `transform:translateX(${this.relativeX}px)`;
      }
    },

    // move the covers accordingly when pointer is moving
    pointerMove(event) {
      if (this.isPointerDown) {
        const currentX = event.clientX - this.pointerDownX + this.relativeX;
        for (const cover of this.coverRefs) {
          cover.style =
            `transform:translateX(${currentX}px)`;
        }
      }
    },

    pointerUp(event) {
      // during the song switch process when the current song ends,
      // pointermove and pointerup events should be canceled
      if (!this.isPointerDown) {
        return;
      }
      // to prevent pointer up
      // where the relativa pointer down is from else where
      if (event.target.hasPointerCapture(event.pointerId)) {
        this.isPointerDown = false;
        const pointerMoveX = event.clientX - this.pointerDownX;
        // slide left or right while the movement meets the condition
        // otherwise just let it return to its original position
        if (pointerMoveX > 100) {
          this.slide('right');
        } else if (pointerMoveX < -100) {
          this.slide('left');
        } else {
          for (const cover of this.coverRefs) {
            cover.classList.add('cover-move');
            cover.addEventListener('transitionend', function removeHandler() {
              cover.classList.remove('cover-move');
              cover.removeEventListener('transitionend', removeHandler);
            });
          }
          for (const cover of this.coverRefs) {
            cover.style = '';
          }
        }
      }
    },

    slide(dir, passive = false) {
      // Set isSliding to true to prevent playID watcher's callbck
      this.isSliding = true;
      // if it is a passive sliding
      // which means it is not called by pointer event
      // set isPointerDown to false to prevent further pointer events
      passive && (this.isPointerDown = false);
      // use FLIP to animate(first, last, invert, play)
      const oldLeft = [];
      const newLeft = [];
      const [...movings] = this.coverRefs;
      // record the left coordinate before moving(first)
      movings.forEach((item) => {
        oldLeft.push(getLeft(item));
      });
      if (dir === 'left') {
        // remove the last cover
        this.recentCovers.shift();
        // if not passive, call next()
        !passive && this.next();
      } else if (dir === 'right') {
        // remove the last cover
        // unshift an empty cover to push the current cover to the right
        this.recentCovers.pop();
        this.recentCovers.unshift({src: '', id: 0});
        // if not passive, call last()
        !passive && this.last();
      }

      // wait the view to wait according to the change of recentCovers
      this.$nextTick()
        .then(() => {
          movings.forEach((item, i) => {
            // clear all the style (generated by pointermove)
            item.style = '';
            // get the final position after moving(last)
            newLeft.push(getLeft(item));
            // move it to its before-moving position(invert)
            item.style.transform = `translateX(${oldLeft[i] - newLeft[i]}px)`;
          });

          // flush the browser rendering to force reflow
          this._reflow = document.body.offsetHeight;
          // add transition class and set the position to animate(play)
          movings.forEach((item) => {
            item.classList.add('cover-move');
            item.addEventListener('transitionend', removeMoveClass);
            // item.style = '' will get wrong behavior in Firefox
            item.style.transform = 'translateX(0px)';
          });

          if (dir === 'left') {
            // add the new next cover to the right
            this.recentCovers.push(this.nextSong);
          } else if (dir === 'right') {
            // now it is able to get the new last cover
            // replace the empty cover with this last cover
            this.recentCovers[0] = this.lastSong;
          }

          this.isSliding = false;
        });

      // auxilary functions
      function removeMoveClass(event) {
        event.style = '';
        event.target.classList.remove('cover-move');
        event.target.removeEventListener('transitionend', removeMoveClass);
      }
      function getLeft(el) {
        return el.getBoundingClientRect().left;
      }
    },

    onError(event) {
      event.target.src = require('@/assets/default-cover.png');
    }
  }
};
</script>

<style scoped>
#play-cover {
  grid-row: cover;
  background-color: #ffffff30;
  width: 64vmin;
  height: 64vmin;
  border-radius: 32vmin;
  display: grid;
  place-items: center;
  justify-content: center;
  box-shadow: 0 0 20px #00000020;
  user-select: none;
}

.transition-group {
  height: 64vmin;
  width: 300vw;
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-flow: column;
}

.cover {
  object-fit: cover;
  height: 60vmin;
  width: 60vmin;
  display: block;
  border-radius: 30vmin;
  box-shadow: 0 0 10px #00000040;
  animation: 30s linear infinite rolling;
  animation-play-state: paused;
}

.cover-move {
  transition: transform 350ms ease;
}

.cover.rolling {
  animation-play-state: running;
}

@keyframes rolling {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

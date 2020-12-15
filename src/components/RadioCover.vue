<template>
  <div id="radio-cover">
    <transition :name="direction">
      <img
        :key="currentCover"
        alt="封面图片"
        :class="['img', {'vibrate': vibrate}]"
        :src="currentCover || require('@/assets/default-pic.jpg')"
        @pointerdown="pointerDown"
        @pointermove="pointerMove"
        @pointerup="pointerUp"
        @animationend="animationEnd"
        @transitionend="transitionEnd"
        @error="onError"
        @dragstart.prevent
      >
    </transition>
    <!-- cache these cover images in the background -->
    <img class="transparent" :src="lastSong.cover">
    <img class="transparent" :src="nextSong.cover">
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex';
const {
  mapState,
  mapGetters,
  mapMutations
} = createNamespacedHelpers('radioPlay');
export default {
  data() {
    return {
      isPointerDown: false,
      pointerDownX: 0,
      direction: '',
      vibrate: false
    };
  },

  computed: {
    ...mapState(['allowBack']),
    ...mapGetters(['currentSong', 'lastSong', 'nextSong']),
    currentCover() {
      // console.log(this.currentSong);
      return this.currentSong.cover;
    }
  },

  methods: {
    ...mapMutations(['last', 'next']),
    pointerDown(event) {
      this.isPointerDown = true;
      // record the position when pointer down
      this.pointerDownX = event.clientX;
    },

    pointerMove(event) {
      if (this.isPointerDown) {
        // the moving distance from pointer down
        const moveX = event.clientX - this.pointerDownX;
        if (moveX < -100) {
          // prevent further pointermove
          this.isPointerDown = false;
          // slide left to switch to the next song
          this.direction = 'left';
          this.next();
        } else if (moveX > 100) {
          this.isPointerDown = false;
          if (this.allowBack) {
            // slide right to switch to the last song
            this.direction = 'right';
            this.last();
          } else {
            // it is not able to switch last song twice in a time
            this.vibrate = true;
          }
        }
      }
    },

    pointerUp(event) {
      this.isPointerDown = false;
    },

    animationEnd(event) {
      this.vibrate = false;
    },

    transitionEnd() {
      this.direction = 'left';
    },

    onError(event) {
      event.target.src = require('@/assets/default-pic.jpg');
    }
  }
};
</script>

<style scoped>
#radio-cover {
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
  grid-template-columns: [start] 100% [end];
  grid-template-rows: [start] 100% [end];
}

.img {
  grid-row: start / end;
  grid-column: start / end;
  height: 100%;
  box-shadow: 0 0 20px #00000030;
  border-radius: 0.5rem;
}

.transparent {
  opacity: 0;
  position: absolute;
  width: 0;
  height: 0;
}

.left-enter-active,
.left-leave-active,
.right-enter-active,
.right-leave-active {
  transition: transform 450ms ease,
  opacity 300ms ease;
  transform: perspective(1000px) rotateY(0deg) translateX(0%) scale(1.0);
}

.right-enter, .left-leave-to {
  transform: perspective(1000px) rotateY(60deg) translateX(-50%) scale(0.6);
  transform-origin: 0% 50%;
  opacity: 0;
}

.right-leave-to, .left-enter {
  transform: perspective(1000px) rotateY(-60deg) translateX(50%) scale(0.6);
  transform-origin: 100% 50%;
  opacity: 0;
}

.vibrate {
  animation: 300ms vibrate;
}

@keyframes vibrate {
  40% {
    transform: translateX(32px);
  }

  55% {
    transform: translateX(-16px);
  }

  70% {
    transform: translateX(8px);
  }

  85% {
    transform: translateX(-4px);
  }
}
</style>

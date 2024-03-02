<template>
  <div id="discover-banner">
    <transition name="fade">
      <div
        v-if="loading"
        key="loading"
        class="default-pic"
      >
        <img src="@/assets/default-pic.jpg">
      </div>
      <div
        v-else
        key="pics"
        class="transition-group"
      >
        <div
          v-for="pic in loopPics"
          :key="pic.bannerId"
          ref="pics"
          class="pic-container"
          @pointerdown="pointerDown"
          @pointerup="pointerUp"
          @pointermove="pointerMove"
        >
          <img
            alt="轮播图片"
            :src="pic.pic + '?param=810y315'"
            @dragstart.prevent
          >
          <span
            class="type-title"
            :type="pic.typeTitle"
          >{{ pic.typeTitle }}</span>
        </div>
      </div>
    </transition>
    <div class="dot-container">
      <div
        v-for="dot in dots"
        :key="dot"
        :class="['dot', {'current-dot': dot===currentIndex}]"
        :current-dot="dot===currentIndex"
      />
    </div>
  </div>
</template>

<script>
import fetchJSON from '@/functions/fetchJSON.js';
export default {
  data: function() {
    return {
      banners: [],
      loopPics: [],
      dots: [],
      currentIndex: 0,
      loading: true
    };
  },

  created: function() {
    // properties that don't need to be reactive
    this.intervalID = 0;
    this.isPointerDown = false;
    this.banners;
    this.amount;
    this.pointerDownX;
    this.relativeX;
    this.pointerDownTime;
    fetchJSON('/banner', {type: '2'})
      .then((res) => {
        console.log(res);
        this.banners = res.banners.map((item) => {
          return {
            pic: item.pic.replace('http:', 'https:'),
            bannerId: item.bannerId,
            typeTitle: item.typeTitle,
            originalData: item
          };
        });
        this.amount = this.banners.length;
        // the last pic on the left, the first pic in the middle
        // and the second pic on the right
        this.loopPics.push(this.banners.pop());
        this.loopPics.push(this.banners.shift());
        this.loopPics.push(this.banners.shift());
        this.currentIndex = 0;
        for (let i = 0; i < this.amount; i++) {
          this.dots[i] = i;
        }
        this.loading = false;
        return this.$nextTick();
      }).then(() => this.loop());
  },

  methods: {
    loop() {
      this.intervalID = setInterval(() => {
        this.slide('left');
      }, 6000);
    },

    pointerDown(event) {
      this.isPointerDown = true;
      // record the position when pointer down
      this.pointerDownX = event.clientX;
      // bind the pointer events to the current element
      event.target.setPointerCapture(event.pointerId);
      // stop looping
      clearInterval(this.intervalID);

      // get the current position
      const currentLeft = event.target.getBoundingClientRect().left;
      // terminate all transitions
      for (const pic of this.$refs.pics) {
        // pic.style = '' is necessary for Firefox
        // while it is not empty during transition
        pic.style = '';
        pic.dispatchEvent(new TransitionEvent('transitionend'));
      }
      // get the final position when transition ends
      const targetLeft = event.target.getBoundingClientRect().left;
      this.relativeX = currentLeft - targetLeft;

      if (this.relativeX === 0) {
        // if the picture is not moving, then it is safe to click
        this.pointerDownTime = Date.now();
      } else {
        // move all the pics to where they were when pointer down
        for (const pic of this.$refs.pics) {
          pic.style = `transform:translateX(${this.relativeX}px)`;
        }
      }
    },

    pointerUp(event) {
      // to prevent pointer up
      // where the relativa pointer down is from else where
      if (event.target.hasPointerCapture(event.pointerId)) {
        this.isPointerDown = false;
        const pointerMoveX = event.clientX - this.pointerDownX;
        // slide left or right while the movement meets the condition
        // otherwise just let go as normal
        if (pointerMoveX > 50) {
          this.slide('right');
        } else if (pointerMoveX < -50) {
          this.slide('left');
        } else {
          for (const pic of this.$refs.pics) {
            pic.classList.add('banner-move');
            pic.addEventListener('transitionend', function removeHandler() {
              pic.classList.remove('banner-move');
              pic.removeEventListener('transitionend', removeHandler);
            });
          }
          for (const pic of this.$refs.pics) {
            pic.style = '';
          }

          if (
            this.pointerDownTime &&
            Math.abs(pointerMoveX) < 10 &&
            Date.now() - this.pointerDownTime < 600
          ) {
            const banner = this.loopPics[1].originalData;
            if (banner.targetType === 1) {
              this.$store.commit('commonPlay/addToPlay', {
                id: banner.song.id,
                name: banner.song.name,
                artist: banner.song.ar.map((item) => item.name).join('/'),
                album: banner.song.al.name,
                albumId: banner.song.al.id,
                cover: banner.song.al.picUrl.replace('http:', 'https:')
              });
              this.$router.push('/play');
            } else if (banner.targetType === 1000) {
              console.log(this.loopPics[1].originalData);
            }
          }
        }
        // resume to loop
        this.loop();
      }
    },

    pointerMove(event) {
      if (this.isPointerDown) {
        const currentX = event.clientX - this.pointerDownX + this.relativeX;
        for (const pic of this.$refs.pics) {
          pic.style =
            `transform:translateX(${currentX}px)`;
        }
      }
    },

    slide(dir) {
      // use FLIP to animate(first, last, invert, play)
      const oldLeft = [];
      const newLeft = [];
      const movings = [...this.$refs.pics];
      // record the left coordinate before moving(first)
      movings.forEach((item) => {
        oldLeft.push(getLeft(item));
      });
      if (dir === 'left') {
        // move the red dot to the next right position by increasing index
        this.currentIndex = ++this.currentIndex % this.amount;
        // add a new pic to the right and remove the most left pic
        this.loopPics.push(this.banners.shift());
        this.banners.push(this.loopPics.shift());
      } else if (dir === 'right') {
        // similar to the 'left' process but in opposite direction
        this.currentIndex = (this.currentIndex - 1 + this.amount) % this.amount;
        this.loopPics.unshift(this.banners.pop());
        this.banners.unshift(this.loopPics.pop());
      }

      // wait the view to change according to the change of loopPics
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
            item.classList.add('banner-move');
            item.addEventListener('transitionend', removeMoveClass);
            // item.style = '' will get wrong behavior in Firefox
            item.style.transform = 'translateX(0px)';
          });
        });

      // auxilary functions
      function removeMoveClass(event) {
        event.style = '';
        event.target.classList.remove('banner-move');
        event.target.removeEventListener('transitionend', removeMoveClass);
      }
      function getLeft(el) {
        return el.getBoundingClientRect().left;
      }
    },
  }
};
</script>

<style scoped>
#discover-banner {
  width: 100%;
  max-width: 45rem;
  overflow: hidden;
  height: 40vw;
  max-height: 18rem;
  grid-row: banner;
  place-self: center;
  display: grid;
  grid-template-columns: [start] 1fr [end];
  grid-template-rows: [start] 1fr [dot-start] 2rem [dot-end end];
  justify-items: center;
  align-items: center;
  justify-content: space-around;
  user-select: none;
}

.default-pic {
  grid-row: start / end;
  grid-column: start / end;
  height: 90%;
  width: 90%;
  border-radius: 1rem;
  overflow: hidden;
}

.default-pic > img {
  width: 100%;
  height: 100%;
}

.transition-group {
  grid-row: start / end;
  grid-column: start / end;
  width: 300%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-items: center;
}

.pic-container {
  height: 90%;
  width: 90%;
  border-radius: 1rem;
  display: grid;
  overflow: hidden;
  grid-template-rows: [start] 1fr [title-start] max-content [title-end end];
  grid-template-columns: [start] 1fr [title-start] max-content [title-end end];
}

.pic-container img {
  grid-row: start / end;
  grid-column: start / end;
  width: 100%;
  height: 100%;
  object-fit: cover;
  touch-action: none;
}

.type-title {
  grid-row: title;
  grid-column: title;
  background-color: #fc5244;
  color: white;
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  border-radius: 1rem 0 1rem 0;
  user-select: none;
}

.type-title[type="数字专辑"] {
  background-color: #43a5f0;
}

.banner-move {
  transition: transform 500ms ease;
}

.dot-container {
  grid-row: dot;
  grid-column: start / end;
  width: 30%;
  min-width: 10rem;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(auto-fit, 1rem);
  justify-content: space-around;
}

.dot {
  height: 0.5rem;
  width: 0.5rem;
  background-color: #88888880;
  border-radius: 50%;
  z-index: 10;
  transition: background-color, 200ms;
}

.current-dot {
  background-color: var(--app-color);
}
</style>

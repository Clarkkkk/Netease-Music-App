<template>
  <div id="play-progress-bar">
    <div class="time">
      {{ playTime }}
    </div>
    <div
      class="container"
      ref="container"
      @pointerdown="pointerDown"
      @pointermove="pointerMove"
      @pointerup="pointerUp"
      :class="{'pointer-down': isPointerDown}"
    >
      <div :class="['groove', {'pointer-down': isPointerDown}]">
        <div
          class="played-section"
          ref="played"
        ></div>
        <div
          :class="['pointer', {'pointer-down': isPointerDown}, {'waiting': waiting}]"
          ref="pointer"
        ></div>
      </div>
    </div>
    <div class="time">
      {{ playDuration }}
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex';
const {mapState, mapMutations} = createNamespacedHelpers('playStatus');
export default {
  data: function() {
    return {
      isPointerDown: false
    };
  },

  computed: {
    ...mapState(['currentTime', 'duration', 'waiting']),
    playTime: function() {
      return this.formatTime(this.currentTime);
    },
    playDuration: function() {
      return this.formatTime(this.duration);
    }
  },

  mounted() {
    this.$nextTick()
      .then(() => {
        this.rect = this.$refs.container.getBoundingClientRect();
      });
  },


  watch: {
    currentTime(current) {
      if (this.isPointerDown) {
        return;
      }
      const percentage = Math.max(current / this.duration, 0);
      // no need to animate when switching songs
      this.$refs.pointer.style.transition =
        percentage < 0.01 ? 'none' : '';
      // minus pointer's width to prevent it going beyond the right end
      this.$refs.pointer.style.transform =
        `translateX(calc(${percentage * 60}vw - 0.5rem))`;
      this.$refs.played.style.width = `${percentage * 100}%`;
    }
  },

  methods: {
    ...mapMutations(['seek']),
    formatTime(time) {
      if (isNaN(time)) {
        return '-- : --';
      }
      const timeInt = Math.floor(time);
      const second = timeInt % 60;
      const minute = (timeInt - second) / 60;
      const formatSecond = second < 10 ? '0' + second : second;
      const formatMinute = minute < 10 ? '0' + minute : minute;
      return formatMinute + ':' + formatSecond;
    },

    pointerDown(event) {
      this.isPointerDown = true;
      const rect = this.$refs.container.getBoundingClientRect();
      this.rectLeft = rect.left + 12;
      this.rectRight = rect.right - 12;
      this.width = this.rectRight - this.rectLeft;
      let relativeLeft;
      if (event.clientX - this.rectLeft > this.width) {
        relativeLeft = this.width;
      } else if (event.clientX - this.rectLeft < 0) {
        relativeLeft = 0;
      } else {
        relativeLeft = event.clientX - this.rectLeft;
      }
      this.$refs.pointer.style.transform =
        `translateX(${relativeLeft - 8}px`;
      this.$refs.played.style.width = `${relativeLeft / this.width * 100}%`;
      event.target.setPointerCapture(event.pointerId);
    },

    pointerMove(event) {
      if (this.isPointerDown) {
        let relativeLeft;
        if (event.clientX - this.rectLeft > this.width) {
          relativeLeft = this.width;
        } else if (event.clientX - this.rectLeft < 0) {
          relativeLeft = 0;
        } else {
          relativeLeft = event.clientX - this.rectLeft;
        }
        this.$refs.pointer.style.transform =
          `translateX(${relativeLeft - 8}px`;
        this.$refs.played.style.width =
          `${relativeLeft / this.width * 100}%`;
      }
    },

    pointerUp(event) {
      this.isPointerDown = false;
      this.$refs.pointer.classList.add('smooth-move');
      const percentage =
        (event.clientX - this.rectLeft) / (this.rectRight - this.rectLeft);
      this.seek(this.duration * percentage);
    }
  }
};
</script>

<style scoped>
#play-progress-bar {
  grid-area: progress-bar;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns:
    [start current-start] minmax(3.5rem, 1fr) [current-end bar-start]
    70vw [bar-end duration-start] minmax(3.5rem, 1fr) [duration-end end];
  grid-template-rows: 1fr;
  place-items: center;
  user-select: none;
}

.container {
  grid-column: bar;
  height: 1.6rem;
  display: grid;
  place-items: center;
  cursor: pointer;
  touch-action: none;
  padding: 0 12px;
  border-radius: 1.6rem;
  transition: background-color 300ms;
}

.container.pointer-down {
  background-color: #00000030;
}

.time:first-child {
  justify-self: end;
}

.time:last-child {
  justify-self: start;
}

.groove {
  width: 60vw;
  height: 0.1rem;
  border-radius: 0.1rem;
  background-color: #dddddd80;
  display: grid;
  grid-template-columns: [start] 100% [end];
  grid-template-rows: [start] 100% [end];
  align-items: center;
  align-content: center;
  justify-items: start;
  transition: all 100ms;
}

.groove.pointer-down {
  height: 0.2rem;
  border-radius: 0.2rem;
}

.pointer {
  grid-row: start / end;
  grid-column: start / end;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 5px #666666a0;
  cursor: pointer;
  touch-action: none;
  transition:
    height linear 100ms,
    width linear 100ms,
    transform linear 500ms;
}

.played-section {
  grid-row: start / end;
  grid-column: start / end;
  height: 0.1rem;
  background-color: #ffffffa0;
  transition: all 100ms;
}

.played-section.pointer-down{
  height: 0.2rem;
}

.pointer.pointer-down {
  height: 1.2rem;
  width: 1.2rem;
  transition: none;
  transition:
    height linear 100ms,
    width linear 100ms;
}

.pointer.waiting {
  animation: waiting 1000ms alternate ease infinite;
}

@keyframes waiting {
  from {
    background-color: white;
  }

  to {
    background-color: var(--app-color);
  }
}
</style>

<template>
  <div id="app-loop-text">
    <div
      ref="text"
      class="text"
    >
      {{ text }}
    </div>
    <div
      ref="clone"
      class="clone"
    >
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['text'],
  data: function() {
    return {
      intervalID: 0
    };
  },

  watch: {
    text() {
      this.$nextTick()
        .then(() => {
          this.boxWidth = this.$el.clientWidth;
          this.textWidth = this.$refs.text.clientWidth;
          clearInterval(this.intervalID);
          if (this.boxWidth < this.textWidth) {
            this.animate();
            this.intervalID = setInterval(this.animate, 12000);
          }
        });
    },
  },

  created() {
    this.animate = this._animate.bind(this);
  },

  mounted() {
    this.$nextTick()
      .then(() => {
        this.boxWidth = this.$el.clientWidth;
        this.textWidth = this.$refs.text.clientWidth;
        if (this.boxWidth < this.textWidth) {
          this.animate();
          this.intervalID = setInterval(this.animate, 12000);
        }
      });
  },

  methods: {
    _animate() {
      this.$refs.text.classList.remove('loop');
      this.$refs.clone.classList.remove('loop');
      this.$refs.text.style.transform = `translateX(0px)`;
      this.$refs.clone.style.transform = `translateX(${this.textWidth}px)`;
      document.body.offsetWidth;
      this.$refs.text.classList.add('loop');
      this.$refs.clone.classList.add('loop');
      this.$refs.text.style.transform = `translateX(${-this.textWidth}px)`;
      this.$refs.clone.style.transform = `translateX(0px)`;
    }
  }
};
</script>

<style scoped>
#app-loop-text {
  grid-row: loop-text;
  grid-column: loop-text;
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr [start] min-content [end] 1fr;
  grid-template-rows: [start] 100% [end];
  justify-items: center;
  justify-content: start;
}

.text {
  grid-row: start / end;
  grid-column: start / end;
  white-space: nowrap;
  padding: 0 1rem;
  width: max-content;
}

.clone {
  grid-row: start / end;
  grid-column: start / end;
  white-space: nowrap;
  padding: 0 1rem;
  width: max-content;
}

.loop {
  transition: transform 8000ms linear 2000ms;
}
</style>

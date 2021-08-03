<template>
  <div id="app-intersection-observer">
    <span
      v-if="isBottom"
      class="text"
    >
      — 到底啦 —
    </span>
    <app-loading-icon v-else/>
  </div>
</template>

<script>
import AppLoadingIcon from '@/components/AppLoadingIcon.vue';
export default {
  components: {
    AppLoadingIcon
  },
  props: ['seen', 'is-bottom'],
  created() {
    const options = {
      rootMargin: '0px 0px 65% 0px',
      threshold: 0.0
    };
    const callback = (entries, observer) => {
      console.log(entries)
      console.log(this.isBottom)
      entries.forEach((entry) => {
        if (entry.target === this.$el && !this.seen && entry.isIntersecting) {
          console.log('seen')
          this.$emit('update:seen', true);
        }
      });
      if (this.isBottom) {
        this.observer.unobserve(this.$el);
      }
    };
    this.observer = new IntersectionObserver(callback, options);
  },

  mounted() {
    this.$nextTick()
      .then(() => this.observer.observe(this.$el));
  },

  beforeUnmount() {
    this.observer.disconnect();
  }
};
</script>

<style scoped>
#app-intersection-observer {
  height: 20px;
  width: 100%;
  background-color: transparent;
}

.text {
  font-size: 0.8rem;
  line-height: 20px;
  color: #ddd;
  display: inline-block;
  width: 100%;
  text-align: center;
}
</style>

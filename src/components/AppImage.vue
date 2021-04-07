<template>
  <img
    v-if="picSrc"
    class="app-image fade-in"
    :src="picSrc"
    :alt="picAlt"
    loading="lazy"
    @error="load"
  >
  <img
    v-else
    src="@/assets/default-pic.jpg"
    :alt="picAlt"
    class="app-image"
  >
</template>

<script>
export default {
  props: ['src', 'alt', 'width', 'height'],
  data() {
    return {
      picSrc: '',
      reloadTimes: 0
    };
  },
  computed: {
    picAlt() {
      return this.alt ? this.alt : '图片';
    }
  },

  watch: {
    src(val) {
      this.load(val);
    }
  },

  created() {
    this.load();
  },

  methods: {
    load(val) {
      const src = typeof val === 'string' ? val : this.src;
      this.picSrc = '';
      if (this.reloadTimes < 5 && src) {
        setTimeout(() => {
          const width = this.width;
          const height = this.height ? this.height : this.width;
          if (src.includes('http')) {
            this.picSrc = src.replace('http:', 'https:') +
              (width && height ? `?param=${width}y${height}` : '');
          } else {
            this.picSrc = src;
          }
        }, 30 * this.reloadTimes);
        this.reloadTimes++;
      } else {
        this.reloadTimes = 0;
      }
    }
  }
};
</script>

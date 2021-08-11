<template>
  <div class="app-back-button" @click="back">
    <app-icon icon="go-back" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      lastClick: 0
    };
  },

  methods: {
    back(event) {
      // avoid duplicate click fired by both click and tap
      if (Date.now() - this.lastClick < 100) {
        console.log('duplicate click');
        return;
      }
      this.lastClick = Date.now();
      const lastRoute = this.$store.getters['routeHistory/lastRoute'];
      console.log(lastRoute)
      if (lastRoute) {
        this.$router.push({
          name: lastRoute.name,
          params: {
            ...lastRoute.params,
            back: true
          }
        });
      } else {
        this.$router.push({
          name: 'discover',
          params: {
            back: true
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.app-back-button {
  grid-column: back;
  grid-row: start / end;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  font-size: 1.5rem;
  display: grid;
  align-items: center;
  justify-items: center;
}
</style>

<template>
  <div id="discover">
    <router-view v-slot="{Component}">
      <transition :name="transitionName">
        <keep-alive :include="includeNames">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script>
const childRoutes = {
  'discover': 'home',
  'discover-search': 'search',
  'discover-recommendation': 'songlist',
  'discover-songlist': 'songlist'
};
export default {
  computed: {
    transitionName() {
      return this.$store.state.routeHistory.transitionName;
    },

    // cache the current page when routing to a new page
    includeNames() {
      const history = this.$store.state.routeHistory.history;
      const result = history.map((item, i, arr) => {
        if (childRoutes[item.name]) {
          return childRoutes[item.name];
        } else {
          return item.name;
        }
      });
      return result;
    }
  }
};
</script>

<style>
#discover {
  z-index: 0;
  background-color:white;
  height: 100%;
}
</style>

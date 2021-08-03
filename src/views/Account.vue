<template>
  <div id="account">
    <div v-if="!$store.state.auth.login" class="header">
      <span>未登录</span>
    </div>
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
  'account': 'profile',
  'account-songlist': 'songlist',
  'account-favorite': 'songlist',
  'account-rank': 'rank'
}
export default {
  computed: {
    transitionName() {
      return this.$store.state.routeHistory.transitionName;
    },

    // cache the current page when routing to a new page
    includeNames() {
      let history = [...this.$store.state.routeHistory.history];
      history.forEach((item, i, arr) => {
        if (childRoutes[item]) {
          arr[i] = childRoutes[item];
        }
      });
      return history;
    }
  }
}
</script>

<style scoped>
#account {
  height: 100vh;
  display: grid;
  background-color: white;
  grid-template-rows:
    [start header-start] min-content [header-end login-start]
    25rem [login-end] 1fr [end];
  grid-template-columns:
    [start] 1fr [login-start]
    minmax(min-content, 20rem) [login-end] 1fr [end];
}

.header {
  grid-row: header;
  grid-column: start / end;
  width: 100%;
  height: calc(3rem + env(safe-area-inset-top));;
  background-color: var(--app-color);
  display: grid;
  font-size: 1.2rem;
  color: white;
  font-weight: bold;
  place-items: center;
  user-select: none;
}

.header > span {
  padding-top: env(safe-area-inset-top);
}
</style>

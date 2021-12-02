<template>
  <div id="app">
    <app-loading-icon class="loading" v-if="loading" />
    <router-view v-else v-slot="{ Component }">
      <transition :name="transitionName">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>

    <transition :name="transitionName">
      <app-dock />
    </transition>
    <div class="hidden-bar" />
    <app-audio-player />
  </div>
</template>

<script>
import AppAudioPlayer from '@/components/AppAudioPlayer.vue';
import AppDock from '@/components/AppDock.vue';
import AppLoadingIcon from '@/components/AppLoadingIcon';
export default {
  components: {
    AppAudioPlayer,
    AppDock,
    AppLoadingIcon
  },

  data() {
    return {
      loading: true
    };
  },

  computed: {
    transitionName() {
      return this.$store.state.routeHistory.transitionName;
    },

    login() {
      return this.$store.state.auth.login;
    },

    userID() {
      return this.$store.state.auth.userID;
    }
  },

  watch: {
    login(isLogin) {
      isLogin && this.$store.dispatch('updateLikelist');
    }
  },

  created() {
    // relavant to Safari back gesture
    if (navigator.userAgent.includes('Safari')) {
      this.$store.commit('routeHistory/agent', true);
      document.documentElement.addEventListener('touchend', (event) => {
        this.$store.commit('routeHistory/touchEnd');
      });
    }
    // check app version
    this.$store.dispatch('checkVersion');
    this.$store.dispatch('auth/checkLogin').then(() => {
      this.loading = false;
    });
  },

  mounted() {
    // Since the body is scrollable, it is necessary to prevent touchmove event
    this.$el.addEventListener('touchmove', (event) => {
      event.preventDefault();
    });
  }
};
</script>

<style>
::-webkit-scrollbar {
  width: 9px;               /* width of the entire scrollbar */
}

::-webkit-scrollbar-track {
  background: transparent;        /* color of the tracking area */
}

::-webkit-scrollbar-thumb {
  border: none;  /* creates padding around scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  background-color: #ddd;    /* color of the scroll thumb */
}

* {
  scrollbar-width: thin;          /* "auto" or "thin" */
  scrollbar-color: #ddd #fff;   /* scroll thumb and track */
}

html,
body,
#app {
  scrollbar-width: none;
}

html::-webkit-scrollbar {
  width: 0;
}

body {
  height: 100vh;
  margin: 0;
  background-color: black;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  letter-spacing: 0.03em;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  --app-color: #ff3932;
  --app-color-rgb: 255, 57, 50;
}

#app {
  position: fixed;
  z-index: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
}

.loading {
  position: fixed;
  top: 0;
  width: 100vw !important;
  height: 100vh !important;
  background-color: white;
}

.hidden-bar {
  position: absolute;
  z-index: 10000;
  top: 7vh;
  left: 0;
  width: 15px;
  height: 90vh;
  background-color: transparent;
}

.fade-in {
  animation: fadeIn 300ms ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms;
  opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0.5;
}

/* slide-left */
.slide-left-enter-from {
  transform: translateX(100vw) !important;
}

.slide-left-leave-to {
  transform: translateX(-30vw) !important;
}

.slide-left-leave-active {
  z-index: 0;
  transition: transform 360ms ease;
}

.slide-left-enter-active {
  position: fixed !important;
  z-index: 12000 !important;
  top: 0;
  left: 0;
  transition: transform 360ms ease;
}

/* slide-left */

/* slide-right */
.slide-right-leave-to {
  transform: translateX(100vw) !important;
}

.slide-right-enter-from {
  transform: translateX(-30vw) !important;
}

.slide-right-enter-active {
  z-index: 0;
  transition: transform 360ms ease;
}

.slide-right-leave-active {
  position: fixed !important;
  z-index: 12000 !important;
  top: 0;
  left: 0;
  transition: transform 360ms ease;
}

/* slide-right */

/* expand */
.expand-leave-active {
  z-index: 0;
  animation: shrink 360ms;
}

.expand-enter-active {
  position: fixed;
  z-index: 13000 !important;
  top: 0;
  left: 0;
  animation: expand 560ms ease;
}

@keyframes expand {
  from {
    transform: translateY(-45vh) translateX(42vw) scale(0.1);
    opacity: 0.5;
  }

  50% {
    opacity: 1;
  }

  75% {
    transform: scale(1.06);
  }

  to {
    transform: scale(1);
  }
}

@keyframes shrink {
  to {
    transform: scale(0.8);
  }
}

/* expand */

.no-transition-enter-active,
no-transition-leave-active {
  transition: none !important;
  opacity: 1;
}

</style>

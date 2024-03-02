<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <app-loading-icon
          v-if="loading"
          class="loading"
        />
        <router-view v-else />
      </keep-alive>
    </transition>
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
      document.documentElement.addEventListener('touchend', () => {
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
html {
  scrollbar-width: none;
}

html::-webkit-scrollbar {
  width: 0;
}
body {
  height: 100vh;
  margin: 0;
  font-size: 14px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  letter-spacing: 0.03em;
  background-color: black;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
  --app-color: #ff3932;
  --app-color-rgb: 255, 57 ,50;
}

#app {
  height: 100vh;
  width: 100vw;
  background-color: black;
  position: fixed;
  top: 0;
  z-index: 0;
}

.loading {
  height: 100vh !important;
  width: 100vw !important;
  background-color: white;
  position: fixed;
  top: 0;
}

.hidden-bar {
  position: absolute;
  top: 7vh;
  left: 0;
  width: 15px;
  height: 90vh;
  background-color: transparent;
  z-index: 10000;
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

.fade-enter-active, .fade-leave-active {
  opacity: 1;
  transition: opacity 300ms;
}

.fade-enter, .fade-leave-to {
  opacity: 0.5;
}

/* slide-left */
.slide-left-enter {
  transform: translateX(100vw) !important;
}

.slide-left-leave-to {
  transform: translateX(-30vw) !important;
}

.slide-left-leave-active {
  transition: transform 360ms ease;
  z-index: 0;
}

.slide-left-enter-active {
  transition: transform 360ms ease;
  position: fixed !important;
  left: 0;
  top: 0;
  z-index: 12000 !important;
}
/* slide-left */

/* slide-right */
.slide-right-leave-to {
  transform: translateX(100vw) !important;
}

.slide-right-enter {
  transform: translateX(-30vw) !important;
}

.slide-right-enter-active {
  transition: transform 360ms ease;
  z-index: 0;
}

.slide-right-leave-active {
  transition: transform 360ms ease;
  position: fixed !important;
  left: 0;
  top: 0;
  z-index: 12000 !important;
}
/* slide-right */

/* expand */
.expand-leave-active {
  animation: shrink 360ms;
  z-index: 0;
}

.expand-enter-active {
  z-index: 13000 !important;
  position: fixed;
  left: 0;
  top: 0;
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

.no-transition-enter-active, no-transition-leave-active {
  transition: none !important;
  opacity: 1;
}
</style>

<template>
  <div
    v-if="show"
    id="app-dock"
  >
    <div
      :class="['category', {'active': active==='discover'}]"
      @click="click('discover')"
    >
      <app-icon
        v-if="active==='discover'"
        icon="compass-fill"
      />
      <app-icon
        v-else
        icon="compass"
      />
      <span>发现</span>
    </div>
    <div
      :class="['category', {'active': active==='account'}]"
      @click="click('account')"
    >
      <app-icon
        v-if="active==='account'"
        icon="person-fill"
      />
      <app-icon
        v-else
        icon="person"
      />
      <span>我的</span>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      active: '',
      show: true
    };
  },

  watch: {
    '$route': function(route) {
      if (route.path.includes('account')) {
        this.active = 'account';
      } else {
        this.active = 'discover';
      }
      if (route.path.includes('play') || route.path.includes('radio')) {
        this.show = false;
      } else {
        this.show = true;
      }
    }
  },

  created() {
    if (this.$route.path.includes('account')) {
      this.active = 'account';
    } else {
      this.active = 'discover';
    }
  },

  methods: {
    click(category) {
      if (category === this.active) {
        return;
      }
      switch (category) {
        case 'discover': {
          this.$router.replace({
            name: 'discover',
            params: {
              dock: true
            }
          });
          break;
        }
        case 'account': {
          if (this.$store.state.auth.login) {
            this.$router.replace({
              name: 'account',
              params: {
                dock: true
              }
            });
          } else {
            this.$router.replace({
              name: 'login',
              params: {
                dock: true
              }
            });
          }
          break;
        }
      }
    }
  }
};
</script>

<style scoped>
#app-dock {
  position: fixed;
  z-index: 11000;
  transform: translate3d(0px, 0px, 2px);
  bottom: 0;
  padding-bottom: env(safe-area-inset-bottom);
  height: 2.5rem;
  width: 100%;
  background-color: #eee;
  display: grid;
  grid-auto-flow: column;
  justify-content: space-around;
}

@supports(backdrop-filter: blur(50px)) {
  #app-dock {
    background-color: #eeeeeec0;
    backdrop-filter: blur(30px);
  }
}

.category {
  height: 100%;
  width: 4rem;
  display: grid;
  grid-template-rows: 1.5fr 1fr;
  place-items: center;
  cursor: pointer;
}

.category.active {
  color: var(--app-color);
}

.category > span{
  font-size: 0.7rem;
  user-select: none;
}

.category > svg {
  font-size: 1.1rem;
}
</style>

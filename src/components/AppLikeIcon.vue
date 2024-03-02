<template>
  <div
    id="app-like-icon"
    @click="click"
  >
    <transition
      name="like"
      mode="out-in"
    >
      <app-icon
        :key="iconName"
        :icon="iconName"
        :class="{'liked': isLiked}"
      />
    </transition>
  </div>
</template>

<script>
import fetchJSON from '@/functions/fetchJSON.js';
export default {
  computed: {
    login() {
      return this.$store.state.auth.login;
    },

    playID() {
      return this.$store.getters['currentSong'].id;
    },

    likelist() {
      return this.$store.state.likelist;
    },

    isLiked() {
      return this.likelist.includes(this.playID);
    },

    iconName() {
      return this.isLiked ? 'like-fill' : 'like';
    }
  },

  methods: {
    click() {
      if (this.login) {
        fetchJSON('/like', {
          id: this.playID,
          like: this.isLiked ? false : true
        }).then((res) => {
          console.log(res);
          if (res.code === 200) {
            this.$store.dispatch('updateLikelist');
          }
        });
      } else if (window.confirm('该功能需要登录，是否前往登录？')) {
        this.$router.push({name: 'login', params: {dock: true}});
      }
    }
  }
};
</script>

<style scoped>
.liked {
  color: var(--app-color);
}

.like-enter, .like-leave-to {
  opacity: 0.5;
  transform: scale(0.3);
}

.like-enter-active, .like-leave-active {
  transition:
    opacity 200ms,
    transform 200ms;
}
</style>

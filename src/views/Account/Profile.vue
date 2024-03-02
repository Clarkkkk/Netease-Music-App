<template>
  <div
    id="profile"
    ref="wrapper"
  >
    <div
      ref="bg"
      class="background fade-in"
      :style="`background: url(${bgSrc}) 50% 50%/cover;`"
    />
    <div class="fixed-container">
      <div
        ref="card"
        class="card"
      >
        <img
          ref="avatar"
          class="avatar fade-in"
          :src="avtSrc"
        >
        <span
          ref="nickname"
          class="nickname"
        >{{ nickname }}</span>
        <span
          ref="level"
          class="level"
        >{{ 'LV. ' + level }}</span>
        <div
          ref="logout"
          class="logout"
          @tap="logout"
        >
          <app-icon icon="log-out" />
          <span>登出</span>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="placeholder" />
      <div class="features">
        <div
          class="feature-container"
          @tap="routeTo('rank')"
        >
          <app-icon icon="bar-chart" />
          <span>听歌排行</span>
        </div>
        <div
          class="feature-container"
          @tap="routeTo('favorite')"
        >
          <div class="icon-container">
            <app-icon icon="like-fill" />
          </div>
          <span>我喜欢的音乐</span>
        </div>
      </div>

      <div class="lists-container">
        <nav class="nav">
          <span
            :class="{active: listsType === 'created'}"
            @tap="navTo('created')"
          >
            创建歌单
          </span>
          <span
            :class="{active: listsType === 'saved'}"
            @tap="navTo('saved')"
          >
            收藏歌单
          </span>
        </nav>
        <keep-alive>
          <profile-song-lists
            v-if="listCount > 0"
            :key="listsType"
            :type="listsType"
            :count="listCount"
            :sum="listSum"
            :scroll="scroll"
          />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import fetchJSON from '@/functions/fetchJSON.js';
import createScroll from '@/functions/createScroll.js';
import ProfileSongLists from '@/components/ProfileSongLists.vue';
export default {
  name: 'Profile',

  components: {
    ProfileSongLists
  },
  data: function() {
    return {
      nickname: '',
      level: '',
      listenSongs: '',
      avtSrc: require('@/assets/default-pic.jpg'),
      bgSrc: require('@/assets/default-pic.jpg'),
      favoriteList: [],
      createdCount: -1,
      savedCount: -1,
      listsType: 'created',
      loading: true
    };
  },

  computed: {
    userID: function() {
      return this.$store.state.auth.userID;
    },

    listCount() {
      return this.listsType === 'created' ?
        this.createdCount : this.savedCount;
    },

    listSum() {
      return this.createdCount + this.savedCount;
    }
  },

  created() {
    // user basic info
    fetchJSON('/user/detail', {uid: this.userID})
      .then((res) => {
        this.nickname = res.profile.nickname;
        this.level = res.level;
        this.listenSongs = res.listenSongs;
        this.avtSrc = res.profile.avatarUrl.replace('http:', 'https:');
        this.bgSrc = res.profile.backgroundUrl.replace('http:', 'https:');
      });

    // user owned lists
    fetchJSON('/user/subcount')
      .then((res) => {
        console.log(res);
        this.createdCount = res.createdPlaylistCount;
        this.savedCount = res.subPlaylistCount;
      });

    // favorite list
    fetchJSON('/user/playlist', {uid: this.userID, limit: 1}, false)
      .then((res) => {
        this.favoriteList = res.playlist[0];
      });
  },

  mounted() {
    this.$nextTick()
      .then(() => {
        this.scroll = createScroll(2, this.$refs.wrapper, onScroll);
        const self = this;
        function onScroll(pos) {
          if (pos.y > 0) {
            self.$refs.bg.style.height =
              `calc(15rem + env(safe-area-inset-top) + ${pos.y}px)`;
          } else {
            const progress = (-pos.y) / 210 < 1 ? (-pos.y) / 210 : 1;
            const bgOpacity = progress;
            self.$refs.bg.style.height =
              `calc(${15 - 12 * progress}rem + env(safe-area-inset-top))`;
            self.$refs.card.style =
              `background-color: rgba(var(--app-color-rgb), ${bgOpacity});
              height: calc(${15 - 12 * progress}rem + env(safe-area-inset-top));`;
            self.$refs.avatar.style =
              `height: ${5.4 - 3.2 * progress}rem;
              transform: translateY(${-progress * 3.5}rem)`;
            self.$refs.nickname.style =
              `transform: translateX(${progress * 3}rem)
                translateY(${-progress * 9}rem)`;
            self.$refs.level.style = self.$refs.logout.style =
              `opacity: ${1 - progress};
              transform: translateY(${-progress * 6.5}rem)`;
          }
        }
      });
  },

  // refresh the scroll after all the content is loaded
  updated() {
    this.scroll.refresh();
  },

  deactivated() {
    this.scroll.disable();
  },

  activated() {
    if (this.scroll) {
      this.scroll.enable();
      this.scroll.refresh();
    }
  },

  beforeDestroy() {
    this.scroll.destroy();
  },

  methods: {
    navTo(position) {
      console.log(position);
      this.listsType = position;
    },

    routeTo(page) {
      if (page === 'favorite') {
        this.$router.push({
          name: 'account-favorite',
          params: {listId: this.favoriteList.id}
        });
      } else if (page === 'rank') {
        this.$router.push({name: 'account-rank'});
      }
    },

    logout() {
      if (window.confirm('你想退出登录吗？')) {
        this.$store.dispatch('logout')
          .then(() => {
            this.$router.replace({
              name: 'login',
              params: {
                dock: true
              }
            });
          });
      }
    }
  }
};
</script>

<style scoped>
#profile {
  grid-row: start / end;
  grid-column: start / end;
  height: 100vh;
  width: 100%;
  background-color: white;
  display: grid;
  grid-template-rows: [start] 100% [end];
  grid-template-columns: [start] 100% [end];
  position: relative;
  z-index: 0;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: calc(15rem + env(safe-area-inset-top));
}

.fixed-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: calc(15rem + env(safe-area-inset-top));
  pointer-events: none;
  transform: translate3d(0px, 0px, 2px);
}

/* brief info card */
.card {
  height: 100%;
  width: 100%;
  color: white;
  padding: 1rem;
  box-sizing: border-box;
  pointer-events: auto;
  display: grid;
  grid-template-rows:
    [start] 3rem [avatar-start]
    6rem [avatar-end name-start] 2rem
    [name-end info-start] 2rem [info-end end];
  align-items: start;
  z-index: 10;
}

.avatar {
  grid-row: avatar;
  height: 90%;
  border-radius: 50%;
  border: 3.5px solid white;
  box-sizing: border-box;
  box-shadow: 0 0 5px #444;
  margin-top: env(safe-area-inset-top);
}

.nickname {
  grid-row: name;
  font-size: 1.2rem;
  line-height: 1.2rem;
  font-weight: bold;
  margin-top: env(safe-area-inset-top);
}

.level {
  grid-row: info;
  background: #dddddd80;
  font-size: 0.7rem;
  width: 2.8rem;
  text-align: center;
  border-radius: 1rem;
  padding: 0.1rem;
  margin-top: env(safe-area-inset-top);
}

.logout {
  grid-row: start / end;
  align-self: start;
  justify-self: end;
  height: 1.5rem;
  margin-top: env(safe-area-inset-top);
  padding: 0.2rem 0.6rem;
  font-size: 0.8rem;
  line-height: 0.8rem;
  background-color: #22222290;
  border-radius: 1.5rem;
  display: grid;
  grid-auto-flow: column;
  place-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.logout > svg {
  font-size: 1rem;
}

/* brief info card */

.content {
  grid-row: start / end;
  grid-column: start / end;
  min-height: 101%;
  height: min-content;
  width: 100%;
  padding-top: env(safe-area-inset-top);
  display: grid;
  grid-template-rows:
    [start placeholder-start] 15rem [placeholder-end features-start]
    min-content [features-end list-start] min-content [list-end];
  grid-template-columns: [start] 1fr [end];
  z-index: 0;
}

/* middle buttons */
.features {
  grid-row: features;
  padding: 1.5rem 1rem;
  box-sizing: border-box;
  height: 6.5rem;
  width: 100%;
  display: grid;
  grid-template-columns: 40vw 40vw;
  justify-content: space-around;
  place-items: center;
}

.feature-container {
  width: 100%;
  max-width: 10rem;
  height: 100%;
  display: grid;
  grid-template-columns: min-content;
  grid-auto-flow: column;
  place-items: center;
  justify-content: center;
  border-radius: 0.6rem;
  box-shadow: 0 0 10px #ddd;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  transition: all 300ms;
}

.feature-container:hover {
  transform: scale(1.02);
  box-shadow: 0 0 30px #ddd;
}

.feature-container:active {
  transform: scale(1);
  box-shadow: 0 0 30px #ddd;
}

.feature-container > svg {
  font-size: 1.8rem;
  justify-self: end;
  color: var(--app-color);
  margin-right: 0.3rem;
}

.feature-container > span {
  justify-self: start;
}

.icon-container {
  height: 1.4rem;
  width: 1.4rem;
  margin-right: 0.3rem;
  border-radius: 0.2rem;
  background-color: var(--app-color);
  display: grid;
  place-items: center;
  color: white;
  font-size: 0.8rem;
}
/* middle buttons */

/* song lists */
.lists-container {
  grid-row: list;
  grid-column: start / end;
  display: grid;
  padding: 1rem;
  padding-bottom: 3.5rem;
  box-sizing: border-box;
  grid-template-rows:
    [start nav-start] 3rem [nav-end lists-start]
    min-content [lists-end bottom-start] min-content [bottom-end];
}

.nav {
  grid-row: nav;
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
}

.nav > span {
  cursor: pointer;
}

.active {
  border-bottom: 2px solid var(--app-color);
}
/* song lists */
</style>

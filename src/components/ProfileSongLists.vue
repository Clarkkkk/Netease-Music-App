<template>
  <div id="profile-song-lists">
    <div class="title">
      {{ titleString }}
    </div>
    <app-loading-icon v-if="loading" />
    <div
      v-for="list in lists"
      :key="list.id"
      class="list"
      @tap="tap(list.id)"
    >
      <app-image
        :src="list.coverImgUrl"
        width="50"
      />
      <span class="list-name">{{ list.name }}</span>
      <span class="list-info">{{ list.trackCount + '首' }}</span>
    </div>
    <app-intersection-observer
      v-if="!loading"
      :seen.sync="seen"
      :is-bottom="!more"
    />
  </div>
</template>

<script>
import fetchJSON from '@/functions/fetchJSON.js';
import AppLoadingIcon from '@/components/AppLoadingIcon.vue';
import AppImage from '@/components/AppImage.vue';
import AppIntersectionObserver from '@/components/AppIntersectionObserver.vue';
export default {
  components: {
    AppLoadingIcon,
    AppImage,
    AppIntersectionObserver
  },

  props: ['type', 'count', 'sum', 'scroll'],

  data() {
    return {
      lists: [],
      loading: true,
      seen: false,
      more: false
    };
  },

  computed: {
    titleString: function() {
      if (this.type === 'created') {
        return '创建歌单';
      } else {
        return '收藏歌单';
      }
    },

    userID: function() {
      return this.$store.state.auth.userID;
    },
  },

  watch: {
    seen(val) {
      if (val && this.more) {
        this.offset += 15;
        const limit = this.type === 'created' ?
          Math.min(this.count - this.offset, 15) : 15;
        console.log(this.offset);
        fetchJSON('/user/playlist', {
          uid: this.userID,
          limit: limit,
          offset: this.offset
        }, false).then((res) => {
          this.lists = [...this.lists, ...res.playlist];
          this.more = this.type === 'created' ?
            this.offset < this.count : res.more;
          return this.$nextTick();
        }).then(() => this.seen = false);
      }
    }
  },

  created() {
    if (this.count === 0) {
      return;
    }

    const limit = Math.min(this.count, 15);
    this.offset = this.type === 'created' ? 0 : this.sum - this.count;
    fetchJSON('/user/playlist', {
      uid: this.userID,
      limit: limit,
      offset: this.offset
    }, false).then((res) => {
      console.log(res);
      this.lists = this.type === 'created' ?
        res.playlist.slice(1) : res.playlist;
      this.more = res.more && limit < this.count;
      return this.$nextTick();
    }).then(() => {
      setTimeout(() => {
        this.loading = false;
      }, 100);
    });
  },

  updated() {
    if (this.scroll) {
      this.scroll.refresh();
    }
  },

  methods: {
    tap(id) {
      this.$router.push({
        name: 'account-songlist',
        params: {listId: id}
      });
    }
  }
};
</script>

<style scoped>
#profile-song-lists {
  grid-row: lists;
  display: grid;
  grid-template-rows: [title-start] 1rem [title-end];
  grid-auto-rows: 4rem;
  align-items: center;
}

.title {
  grid-row: title;
  color: #888;
  font-size: 0.7rem;
}

.list {
  height: 4rem;
  display: grid;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  grid-template-rows:
    [start name-start] 1.2fr [name-end info-start]
    1fr [info-end end];
  grid-template-columns:
    [start pic-start] 3rem [pic-end text-start]
    1fr [text-end];
  align-items: center;
  cursor: pointer;
  user-select: none;
  transition: all 300ms;
}

.list:hover {
  background-color: #eee;
}

.list > img {
  grid-row: start / end;
  grid-column: pic;
  height: 90%;
  width: 90%;
  border-radius: 0.2rem;
}

.list-name {
  grid-row: name;
  grid-column: text;
  font-size: 0.9rem;
  line-height: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.list-info {
  grid-row: info;
  grid-column: text;
  font-size: 0.7rem;
  line-height: 0.7rem;
}
</style>

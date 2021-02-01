<template>
  <div id="song-list" ref="wrapper">
    <div class="background-container" ref="backgroundBox">
      <div
        class="background fade-in"
        ref="background"
        :style="bgStyle"
      ></div>
    </div>
    <div :class="['fixed-container', {'blur': type==='songlist'}]">

      <div class="header">
        <app-back-button/>
        <div class="title">
          {{ title ? title : '歌单' }}
        </div>
        <div class="right">
          <slot name="right"></slot>
        </div>
      </div>

      <div class="info" ref="info">
        <div class="cover" v-if="type==='songlist'">
          <app-image
            :src="cover"
            width="150"
            alt="歌单封面"
          />
        </div>
        <div class="name" v-if="name">
          {{ name }}
        </div>
        <div class="creator" v-if="creator">
          {{ creator }}
        </div>
        <div class="description" v-if="description">
          {{ description }}
        </div>
        <div class="date" v-if="type==='recommendation'">
          {{ dateString }}
        </div>
      </div>

      <div class="playall" @tap="playAll">
        <app-icon icon="play-circle"/>
        <span>播放全部</span>
      </div>
    </div>

    <div class="list">
      <div class="placeholder"></div>
      <app-loading-icon v-if="loading"/>
      <app-song-entry
        v-for="song in list"
        class="entry"
        :key="song.id"
        :songName="song.name"
        :songArtist="song.artist"
        :songId="song.id"
        :songAlbum="song.album"
        :songAlbumId="song.albumId"
        :songCover="song.cover"
      />
      <app-intersection-observer
        v-if="!loading"
        :seen.sync="seen"
        :is-bottom="!more"
      />
    </div>
  </div>
</template>

<script>
import AppBackButton from '@/components/AppBackButton.vue';
import AppSongEntry from '@/components/AppSongEntry.vue';
import AppLoadingIcon from '@/components/AppLoadingIcon';
import AppImage from '@/components/AppImage.vue';
import AppIntersectionObserver from '@/components/AppIntersectionObserver.vue';
import fetchJSON from '@/functions/fetchJSON.js';
import createScroll from '@/functions/createScroll.js';
export default {
  name: 'songlist',
  data: function() {
    return {
      // basic info
      loading: true,
      title: '',
      name: '',
      creator: '',
      description: '',
      cover: require('@/assets/default-pic.jpg'),
      tags: [],
      list: [],
      // lazy load properties
      seen: false,
      more: false,
      ids: [],
      index: -1
    };
  },

  props: ['type', 'listId'],

  computed: {
    // date string in everyday recommendation page
    dateString: function() {
      const today = new Date();
      const hours = today.getHours();
      let greetings = '你好';
      if (hours >= 6 && hours <= 12) {
        greetings = '早上好';
      } else if (hours >= 13 && hours <= 18) {
        greetings = '下午好';
      } else if (hours >= 19 && hours <= 24) {
        greetings = '晚上好';
      } else if (hours >= 0 && hours <= 5) {
        greetings = '早点睡哦';
      }
      return `${today.getMonth() + 1}月${today.getDate()}日，${greetings}`;
    },

    bgStyle: function() {
      if (this.type === 'songlist') {
        return `background-image:url(${this.cover})`;
      } else {
        return `background-image:linear-gradient( 135deg, #FEB692 10%, #EA5455 100%)`;
      }
    }
  },

  components: {
    AppBackButton,
    AppSongEntry,
    AppLoadingIcon,
    AppImage,
    AppIntersectionObserver
  },

  created() {
    if (this.type === 'recommendation') {
      this.title = '每日推荐';
      fetchJSON('/recommend/songs')
        .then((res) => {
          if (res.code === 200) {
            this.createList(res.data.dailySongs)
              .then(() => this.loading = false);
          }
        });
    } else if (this.type === 'songlist') {
      fetchJSON('/playlist/detail', {id: this.listId})
        .then((res) => {
          if (res.code === 200) {
            console.log(res);
            this.name = res.playlist.name;
            this.creator = res.playlist.creator.nickname;
            this.description = res.playlist.description;
            this.cover = res.playlist.coverImgUrl.replace('http:', 'https:');
            this.tags = res.playlist.tags;
            this.ids = res.playlist.trackIds.map((item) => item.id);
            this.index = res.playlist.tracks.length;
            if (this.index < this.ids.length) {
              // there is more songs to load
              this.more = true;
            }
            this.createList(res.playlist.tracks)
              .then(() => {
                setTimeout(() => {
                  this.loading = false;
                }, 100);
              });
          }
        });
    }
  },

  mounted() {
    if (!this.cover) {
      this.$refs.background.style.backgroundImage =
        'linear-gradient( 135deg, #FEB692 10%, #EA5455 100%)';
    }
  },

  updated() {
    if (this.scroll) {
      this.scroll.refresh();
    }
  },

  deactivated() {
    this.scroll.disable();
  },

  activated() {
    if (this.scroll) {
      this.scroll.enable();
    }
  },

  beforeDestroy() {
    this.scroll.destroy();
  },

  watch: {
    loading(isLoading) {
      if (!isLoading) {
        this.$nextTick()
          .then(() => {
            // mount the observer component and initialize better-scroll
            // when the list is loaded
            this.scroll = createScroll(2, this.$refs.wrapper, onScroll);
            const self = this;
            function onScroll(pos) {
              const percentage = (-pos.y) / 200 < 1 ? (-pos.y) / 200 : 1;
              self.$refs.info.style.opacity = `${1 - percentage}`;
              self.$refs.info.style.height = `calc(12rem + (${pos.y}px))`;
              self.$refs.backgroundBox.style.height =
                `calc(15rem + (${pos.y}px) + env(safe-area-inset-top))`;
              self.$refs.background.style.height =
                `calc(15rem + (${pos.y}px) + env(safe-area-inset-top))`;
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },

    seen(val) {
      // when the page is close to the bottom, load 15 more songs
      if (val && this.more) {
        console.log('load more');
        this.more = this.ids.length > this.index + 15;
        const end = this.more ? this.index + 15 : this.ids.length;
        const ids = this.ids.slice(this.index, end).join(',');
        fetchJSON('/song/detail', {ids: ids})
          .then((res) => {
            console.log('detail');
            console.log(res);
            if (res && res.code === 200) {
              this.createList(res.songs)
                .then(() => this.seen = false);
            }
          });
        this.index = end;
      }
    }
  },

  methods: {
    playAll() {
      console.log('ids: ' + this.ids.length);
      console.log('index: ' + this.index);
      if (this.more) {
        const ids = this.ids.slice(this.index).join(',');
        fetchJSON('/song/detail', {ids: ids})
          .then((res) => {
            if (res && res.code === 200) {
              this.createList(res.songs);
              this.$store.commit('commonPlay/playTheList', this.list);
              this.$router.push('/play');
            }
          });
      } else {
        this.$store.commit('commonPlay/playTheList', this.list);
        this.$router.push('/play');
      }
    },

    createList(songs) {
      // extract useful information and map it to an array,
      // then append the array to this.list
      const appendList = songs.map((song) => {
        const arString = song.ar.map((item) => item.name).join('/');
        return {
          id: song.id,
          name: song.name,
          artist: arString,
          album: song.al.name,
          albumId: song.al.id,
          cover: song.al.picUrl.replace('http:', 'https:')
        };
      });
      this.list = [...this.list, ...appendList];
      return this.$nextTick();
    }
  }
};
</script>

<style scoped>
#song-list {
  grid-column: start / end;
  width: 100%;
  height: calc(100vh - 2.5rem);
  background-color: white;
  position: relative;
}

.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(15rem + env(safe-area-inset-top));
  min-height: calc(3rem + env(safe-area-inset-top));
  overflow: hidden;
  transform: translate3d(0px, 0px, 2px);
  z-index: 10;
}

.background {
  background-color: #000;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transform: scale(1.1);
  width: 100%;
  height: calc(15rem + env(safe-area-inset-top));
  min-height: calc(3rem + env(safe-area-inset-top));
  overflow: hidden;
}

@supports not (backdrop-filter: blur(30px)) {
  .background {
    filter: brightness(0.2);
  }
}

@supports (backdrop-filter: blur(30px)) {
  .blur {
    backdrop-filter: blur(30px);
  }
}

/* fixed container */
.fixed-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 20;
  transform: translate3d(0px, 0px, 2px);
  background-color: #00000010;
  display: grid;
  grid-template-rows:
    [start header-start] min-content [header-end info-start]
    min-content [info-end button-start] 3rem
    [button-end end];
  grid-template-columns: [start] 100% [end];
}

/* filter build another stack context, z-index is required */
.header {
  grid-row: header;
  grid-column: start / end;
  height: calc(3rem + env(safe-area-inset-top));
  width: 100%;
  display: grid;
  grid-template-columns:
    [back-start] 2rem [back-end title-start]
    1fr [title-end right-start] 2rem [right-end];
  grid-auto-flow: column;
  place-items: center;
  color: white;
  user-select: none;
  z-index: 10;
}

.title {
  grid-row: title;
  font-size: 1.2rem;
  font-weight: bold;
}

.info {
  grid-row: info;
  grid-column: start / end;
  z-index: 10;
  height: 12rem;
  width: 100%;
  display: grid;
  padding: 0 1rem;
  box-sizing: border-box;
  overflow: hidden;
  grid-template-rows:
    [start] 1fr [cover-start name-start]
    min-content [name-end creator-start] 2rem
    [creator-end des-start] 3rem [des-end]
    min-content [cover-end] 1fr [end];
  grid-template-columns:
    [cover-start] min-content [cover-end info-start]
    1fr [info-end];
  gap: 0 1rem;
  align-items: center;
}

.cover {
  grid-row: cover;
  grid-column: cover;
  height: 8rem;
  width: 8rem;
  object-fit: cover;
}

.cover > img {
  height: 100%;
  width: 100%;
  border-radius: 0.3rem;
}

.name {
  grid-row: name;
  grid-column: info;
  font-size: 1rem;
  font-weight: bold;
  color: white;
}

.creator {
  grid-row: creator;
  grid-column: info;
  font-size: 0.8rem;
  color: #eee;
}

.description {
  font-size: 0.7rem;
  line-height: 1rem;
  grid-row: des;
  grid-column: info;
  color: #eee;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.date {
  grid-row: span 1 / cover-end;
  grid-column: info;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.playall {
  background-color: white;
  position: sticky;
  grid-row: button;
  grid-column: start / end;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns:
    [icon-start] 2rem [icon-end text-start]
    1fr [text-end];
  padding: 0 1rem;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  align-items: center;
  font-size: 1rem;
  cursor: pointer;
}
/* fixed container */

/* list */
.list {
  min-height: 101%;
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.5rem;
  padding-top: env(safe-area-inset-top);
  display: grid;
  grid-template-rows: [placeholder-start] min-content [placeholder-end];
  grid-auto-rows: 3rem;
  grid-template-columns: [start] 100% [end];
  align-items: center;
}

.placeholder {
  height: 18rem;
  width: 100%;
  grid-row: placeholder;
}
/* list */
</style>

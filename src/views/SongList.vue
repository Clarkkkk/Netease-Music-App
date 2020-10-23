<template>
  <div id="song-list" ref="wrapper">

    <div class=fixed-container>
      <div class="background" ref="background">
        <img :src="cover" v-if="cover">
      </div>
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
        <div class="cover" v-if="cover">
          <img :src="cover">
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
      <app-song-entry
        v-for="song in list"
        class="entry"
        :key="song.id"
        :songName="song.name"
        :songArtist="song.artist"
        :songId="song.id"
        :songAlbum="song.album"
      />
    </div>
  </div>
</template>

<script>
import AppBackButton from '@/components/AppBackButton.vue';
import AppSongEntry from '@/components/AppSongEntry.vue';
import fetchJSON from '@/functions/fetchJSON.js';
import createScroll from '@/functions/createScroll.js';
export default {
  data: function() {
    return {
      title: '',
      name: '',
      creator: '',
      description: '',
      cover: '',
      tags: [],
      list: []
    };
  },

  props: ['type', 'listId'],

  computed: {
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
      return `${today.getMonth()}月${today.getDate()}日，${greetings}`;
    }
  },

  components: {
    AppBackButton,
    AppSongEntry
  },

  created() {
    if (this.type === 'recommendation') {
      this.title = '每日推荐';
      fetchJSON('/recommend/songs')
        .then((res) => {
          if (res.code === 200) {
            // extract useful information and map it to songList
            this.list = res.data.dailySongs.map((song) => {
              const arString = song.ar.map((item) => item.name).join('/');
              return {
                id: song.id,
                name: song.name,
                artist: arString,
                album: song.al.name,
                cover: song.al.picUrl
              };
            });
          }
        });
    } else if (this.type === 'songlist') {
      fetchJSON('/playlist/detail', {id: this.listId})
        .then((res) => {
          console.log(res);
          if (res.code === 200) {
            this.name = res.playlist.name;
            this.creator = res.playlist.creator.nickname;
            this.description = res.playlist.description;
            this.cover = res.playlist.coverImgUrl;
            this.tags = res.playlist.tags;
            const ids = res.playlist.trackIds.map((item) => item.id).join(',');
            return fetchJSON('/song/detail', {ids: ids});
          }
        }).then((res) => {
          console.log(res);
          if (res.code === 200) {
            // extract useful information and map it to songList
            this.list = res.songs.map((song) => {
              const arString = song.ar.map((item) => item.name).join('/');
              return {
                id: song.id,
                name: song.name,
                artist: arString,
                album: song.al.name,
                cover: song.al.picUrl
              };
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
    this.$nextTick()
      .then(() => {
        this.scroll = createScroll(1, this.$refs.wrapper, onScroll);
        const self = this;
        function onScroll(pos) {
          const percentage = (-pos.y) / 200 < 1 ? (-pos.y) / 200 : 1;
          self.$refs.info.style.opacity = `${1 - percentage}`;
          self.$refs.info.style.height = `calc(12rem + (${pos.y}px))`;
          self.$refs.background.style.height = `calc(15rem + (${pos.y}px))`;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },

  updated() {
    this.scroll.refresh();
  },

  methods: {
    playAll() {
      this.$router.push('/play');
      this.$store.commit('playTheList', this.list);
    }
  }
};
</script>

<style scoped>
#song-list {
  grid-column: start / end;
  width: 100%;
  height: calc(100vh - 2.5rem);
  overflow: hidden;
  position: relative;
}

/* fixed container */
.fixed-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 20;
  display: grid;
  grid-template-rows:
    [start header-start] 3rem [header-end info-start]
    min-content [info-end button-start] 3rem
    [button-end end];
  grid-template-columns: [start] 100% [end];
}

.background {
  grid-row: start / info-end;
  grid-column: start / end;
  background-color: #000;
  top: 0;
  left: 0;
  width: 100%;
  height: 15rem;
  min-height: 3rem;
  overflow: hidden;
}

.background > img {
  object-fit: cover;
  width: 100%;
  transform: scale(1.1);
  filter: blur(30px) saturate(1.2);
  opacity: 0.8;
}

/* filter build another stack context, z-index is required */
.header {
  grid-row: header;
  grid-column: start / end;
  height: 100%;
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
}
/* fixed container */

/* list */
.list {
  min-height: 101%;
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.5rem;
  display: grid;
  grid-template-rows: [placeholder-start] min-content [placeholder-end];
  grid-auto-rows: 3rem;
  grid-template-columns: [start] 100% [end];
}

.placeholder {
  height: 18rem;
  width: 100%;
  grid-row: placeholder;
}
</style>
<template>
  <div id="rank">
    <div class="header">
      <app-back-button/>
      <div class="title">我的听歌排行</div>
    </div>
    <nav class="nav">
      <div
        @click="nav='week-list'"
        :class="{'active': nav==='week-list'}"
      >
        最近一周
      </div>
      <div
        @click="nav='all-list'"
        :class="{'active': nav==='all-list'}"
      >
        所有时间
      </div>
    </nav>
    <div class="list" ref="wrapper">
      <div class="content">
        <app-song-entry
          v-for="song in currentList"
          :key="song.id"
          :songId="song.id"
          :songName="song.name"
          :songArtist="song.artist"
          :songAlbum="song.album"
          :songAlbumId="song.albumId"
          :songCover="song.cover"
        >
          <template v-slot:count>
            <span class="count">{{ song.playCount + '次' }}</span>
          </template>
        </app-song-entry>
      </div>
    </div>
  </div>
</template>

<script>
import fetchJSON from '@/functions/fetchJSON.js';
import createScroll from '@/functions/createScroll.js';
import AppBackButton from '@/components/AppBackButton.vue';
import AppSongEntry from '@/components/AppSongEntry.vue';
export default {
  name: 'rank',
  data() {
    return {
      weekList: [],
      allList: [],
      nav: 'week-list'
    };
  },

  computed: {
    currentList() {
      if (this.nav === 'week-list') {
        return this.weekList;
      } else {
        return this.allList;
      }
    }
  },

  components: {
    AppBackButton,
    AppSongEntry
  },

  created() {
    fetchJSON('/user/record', {
      uid: this.$store.state.auth.userID,
      type: 1
    }).then((res) => {
      console.log(res);
      if (res.code === 200) {
        this.weekList = res.weekData.map((item) => {
          const arString = item.song.ar.map((ar) => ar.name).join('/');
          return {
            id: item.song.id,
            name: item.song.name,
            artist: arString,
            album: item.song.al.name,
            cover: item.song.al.picUrl,
            playCount: item.playCount
          };
        });
      }
      return fetchJSON('/user/record', {
        uid: this.$store.state.auth.userID,
        type: 0
      });
    }).then((res) => {
      console.log(res);
      if (res.code === 200) {
        this.allList = res.allData.map((item) => {
          const arString = item.song.ar.map((ar) => ar.name).join('/');
          return {
            id: item.song.id,
            name: item.song.name,
            artist: arString,
            album: item.song.al.name,
            albumId: item.song.al.id,
            cover: item.song.al.picUrl,
            playCount: item.playCount
          };
        });
      }
    });
  },

  mounted() {
    this.$nextTick()
      .then(() => {
        this.scroll = createScroll(0, this.$refs.wrapper);
      });
  },

  updated() {
    this.scroll.refresh();
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
};
</script>

<style scoped>
#rank {
  height: calc(100vh - 2.5rem);
  width: 100vw;
  display: grid;
  background-color: white;
  grid-template-rows:
    [start header-start] min-content [header-end nav-start]
    2.5rem [nav-end list-start] 1fr [list-end];
  grid-template-columns:
    [start] 100% [end];
}

.header {
  height: 3rem;
  padding-top: env(safe-area-inset-top);
  width: 100%;
  grid-row: header;
  background-color: var(--app-color);
  color: white;
  grid-column: start / end;
  display: grid;
  grid-template-columns:
    [back-start] 3rem [back-end title-start]
    1fr [title-end right-start] 3rem [right-end];
  grid-template-rows: [start] 100% [end];
  place-items: center;
}

.title {
  grid-column: title;
  grid-row: start / end;
  font-size: 1.1rem;
  font-weight: bold;
}

.nav {
  grid-row: nav;
  display: grid;
  grid-column: 1fr 1fr;
  grid-auto-flow: column;
  place-items: center;
}

.active {
  border-bottom: 2px solid var(--app-color);
}

.list {
  width: 100%;
  height: 100%;
  grid-row: list;
  overflow: hidden;
  grid-column: start / end;
  position: relative;
}

.content {
  width: 100%;
  min-height: 101%;
  display: grid;
  grid-auto-rows: 3rem;
}
</style>

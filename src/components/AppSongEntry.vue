<template>
  <div class="app-song-entry" @click="play" @tap="play">
    <span class="name">
      {{ songName }}
    </span>
    <span class="info">
      {{ songInfoString }}
    </span>
    <slot name="count"></slot>
  </div>
</template>

<script>
import fetchJSON from '@/functions/fetchJSON.js';
export default {
  data() {
    return {
      lastClick: 0
    };
  },
  props: ['songName', 'songArtist', 'songAlbum', 'songId', 'songCover', 'songAlbumId'],
  computed: {
    songInfoString: function() {
      if (this.songAlbum) {
        return this.songArtist + ' - ' + this.songAlbum;
      } else {
        return this.songArtist;
      }
    }
  },
  methods: {
    play() {
      // avoid duplicate click fired by both click and tap
      if (Date.now() - this.lastClick < 100) {
        return;
      }
      this.lastClick = Date.now();
      fetchJSON('/check/music', {id: this.songId})
        .then((result) => {
          console.log(result);
          if (result.success) {
            this.$store.commit('commonPlay/addToPlay', {
              id: this.songId,
              name: this.songName,
              artist: this.songArtist,
              album: this.songAlbum,
              albumId: this.songAlbumId,
              cover: this.songCover.replace('http:', 'https:')
            });
            this.$router.push('/play');
          } else {
            alert('这首歌暂无版权');
          }
        });
    }
  }
};
</script>

<style scoped>
.app-song-entry {
  width: 100%;
  height: 100%;
  padding: 0.3rem 1rem;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: [start name-start] 1.2fr [name-end info-start] 1fr [info-end end];
  grid-template-columns: [info-start] 1fr [info-end count-start] max-content [count-end];
  justify-items: start;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.name {
  width: 100%;
  height: 100%;
  grid-row: name;
  grid-column: info;
  font-size: 1rem;
  color: black;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.info {
  width: 100%;
  height: 100%;
  grid-row: info;
  grid-column: info;
  font-size: 0.8rem;
  color: #666;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.count {
  grid-row: start / end;
  grid-column: count;
  height: 100%;
  justify-self: end;
  font-size: 0.8rem;
  color: #666;
}
</style>

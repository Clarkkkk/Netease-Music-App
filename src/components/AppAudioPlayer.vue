<template>
  <audio
    id="app-audio-player"
    ref="audio"
    :src="src"
    :loop="mode==='song-loop' && !radio"
    @canplay="durationChange($event.target.duration)"
    @durationchange="durationChange($event.target.duration)"
    @timeupdate="timeUpdate($event.target.currentTime)"
    @play="played"
    @pause="paused"
    @waiting="waiting(true)"
    @playing="waiting(false)"
    @ended="ended"
  />
</template>

<script>
import fetchJSON from '@/functions/fetchJSON.js';
import {mapState, mapGetters, createNamespacedHelpers} from 'vuex';
const {mapMutations, mapActions} = createNamespacedHelpers('playStatus');
export default {
  data: function() {
    return {
      src: ''
    };
  },

  computed: {
    ...mapState('commonPlay', ['mode']),
    ...mapState(['radio']),
    ...mapGetters(['currentSong']),
    playID() {
      // console.log(this.currentSong);
      // console.log(this.$store);
      return this.currentSong.id || 0;
    },
  },

  created: function() {
    if (this.playID) {
      this.getUrl(this.playID);
    }
  },

  mounted: function() {
    this.setPlayer(this.$refs.audio);
  },

  watch: {
    playID: function(newID) {
      if (newID) {
        this.getUrl(newID)
          .then(() => this.$refs.audio.play())
          .catch((e) => {
            console.log(e);
            if (e.message.includes('interact')) {
              alert('请手动点击播放键');
            } else {
              this.ended();
            }
          });
      } else {
        this.$refs.audio.pause();
        this.src = '';
      }
    }
  },

  methods: {
    ...mapMutations([
      'setPlayer', 'durationChange', 'timeUpdate',
      'played', 'paused', 'waiting'
    ]),
    ...mapActions(['ended']),
    getUrl(id) {
      if (id) {
        return fetchJSON('/check/music', {id: id})
          .then((res) => {
            if (res.success) {
              return fetchJSON('/song/url', {id: id});
            } else {
              alert('这首歌暂无版权');
              throw new Error('这首歌暂无版权');
            }
          }).then((obj) => {
            if (obj.code === 200 && obj.data[0]) {
              this.src = obj.data[0].url.replace('http:', 'https:');
            } else {
              alert('这首歌暂无版权');
              throw (new Error('url not exited: ' + JSON.stringify(obj)));
            }
          })
          .catch((e) => {
            console.log(e.message);
            this.ended();
          });
      }
    }
  }
};
</script>

<template>
  <audio
    id="app-audio-player"
    ref="audio"
    :src="src"
    :loop="mode==='song-loop' && !radio"
    @canplay="durationChange($event.target.duration)"
    @durationchange="durationChange($event.target.duration)"
    @timeupdate="timeUpdate($event.target.currentTime)"
    @play="played();updateMeta()"
    @pause="paused"
    @waiting="waiting(true)"
    @playing="waiting(false)"
    @ended="ended"
  />
</template>

<script>
import fetchJSON from '@/functions/fetchJSON.js';
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
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
    this.setActionhandlers();
    if (this.playID) {
      this.getUrl();
    }
  },

  mounted: function() {
    this.setPlayer(this.$refs.audio);
  },

  watch: {
    playID: function(newID) {
      if (newID) {
        this.getUrl()
          .then(() => this.$refs.audio.play())
          .catch((e) => {
            console.log(e);
            // autoplay is not allowed
            // if user doesn't interact with the webpage first
            if (e.message.includes('interact')) {
              alert('请手动点击播放键');
              return Promise.resolve();
            } else {
              this.ended();
              return Promise.reject(new Error(e));
            }
          }).then(() => {
            return fetchJSON('/scrobble', {
              id: newID,
              sourceid: this.currentSong.albumId,
              time: this.$el.duration
            });
          }).then((res) => console.log(res));
      } else {
        this.$refs.audio.pause();
        this.src = '';
      }
    },

    radio: function() {
      this.setActionhandlers();
    }
  },

  methods: {
    ...mapMutations('playStatus', [
      'setPlayer', 'durationChange', 'timeUpdate',
      'played', 'paused', 'waiting', 'seek'
    ]),
    ...mapMutations('commonPlay', {
      commonPlayLast: 'last',
      commonPlayNext: 'next'
    }),
    ...mapMutations('radioPlay', {
      radioPlayNext: 'next'
    }),
    ...mapActions('playStatus', ['ended']),

    // get the current song's url
    getUrl() {
      const id = this.currentSong.id;
      const url = this.currentSong.url;
      // if this.currentSong.url exists, use it
      // else fetch the url
      if (url) {
        this.src = url.replace('http:', 'https:');
        return Promise.resolve();
      } else {
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
    },

    updateMeta() {
      if ('mediaSession' in navigator) {
        console.log(MediaMetadata);
        navigator.mediaSession.metadata = new MediaMetadata({
          title: this.currentSong.name || '',
          artist: this.currentSong.artist || '',
          album: this.currentSong.album || '',
          artwork: [
            {
              src: this.currentSong.cover + '?param=512y512',
              type: 'image/jpg',
              sizes: '512x512'
            }
          ]
        });
        console.log(navigator.mediaSession.metadata);
      } else {
        console.log('mediasession not available');
      }
    },

    setActionhandlers() {
      const isRadio = this.radio;
      let actionHandlers;
      if (isRadio) {
        actionHandlers = [
          ['previoustrack', null],
          ['nexttrack', this.radioPlayNext],
          ['seekto', (details) => this.seek(details.seekTime)]
        ];
      } else {
        actionHandlers = [
          ['previoustrack', this.commonPlayLast],
          ['nexttrack', this.commonPlayNext],
          ['seekto', (details) => this.seek(details.seekTime)]
        ];
      }

      for (const [action, handler] of actionHandlers) {
        try {
          navigator.mediaSession.setActionHandler(action, handler);
        } catch (error) {
          console.log(error);
          console.log(`${error}: The media session action "${action}" is not supported yet.`);
        }
      }
    }
  }
};
</script>

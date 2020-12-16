import Vue from 'vue';
import Vuex from 'vuex';
import fetchJSON from '@/functions/fetchJSON.js';
import auth from './module/auth.js';
import commonPlay from './module/commonPlay.js';
import radioPlay from './module/radioPlay.js';
import playStatus from './module/playStatus.js';
import routeHistory from './module/routeHistory.js';
import {getItem, setItem} from '@/functions/storage.js';

Vue.use(Vuex);
const VERSION = '0.12.1';

const store = new Vuex.Store({
  modules: {
    auth,
    commonPlay,
    radioPlay,
    playStatus,
    routeHistory
  },

  state: {
    radio: getItem('radio', 'boolean'),
    likelist: [],
    version: getItem('version', 'string')
  },

  getters: {
    currentSong(state) {
      return state.radio ?
        store.getters['radioPlay/currentSong'] :
        store.getters['commonPlay/currentSong'];
    }
  },

  mutations: {
    playRadio(state, isRadio) {
      state.radio = isRadio;
      setItem('radio', state.radio);
    },

    updateLikelist(state, list) {
      state.likelist = list;
    },

    setVersion(state) {
      state.version = VERSION;
      setItem('version', state.version);
    }
  },

  actions: {
    checkVersion({commit, state}) {
      // if app version doesn't match, clear all the play data
      // to prevent potential error
      if (state.version !== VERSION) {
        commit('setVersion');
        commit('radioPlay/clear');
        commit('commonPlay/clear');
      }
    },

    updateLikelist(context) {
      fetchJSON('/likelist', context.state.auth.userID)
        .then((res) => {
          console.log(res);
          context.commit('updateLikelist', res.ids);
        });
    },

    logout({commit, state}) {
      return fetchJSON('/logout')
        .then((res) => {
          if (res.code === 200) {
            commit('auth/logout');
            if (state.radio) {
              commit('radioPlay/clear');
            } else {
              commit('commonPlay/clear');
            }
          }
        });
    }
  }
});

export default store;

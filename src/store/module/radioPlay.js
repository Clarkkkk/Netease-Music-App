import {getItem, setItem} from '@/functions/storage.js';

export default {
  namespaced: true,
  state: {
    radioIndex: getItem('radioIndex', 'number'),
    radioList: getItem('radioList', 'array'),
    allowBack: false
  },

  getters: {
    currentSong({radioIndex, radioList}) {
      if (radioIndex > radioList.length - 1) {
        console.log('radioIndex exceeds!');
        console.log('radioIndex: ' + radioIndex);
        console.log(radioList);
        throw new Error('radioIndex exceeds the boundary of radioList!');
      }
      return radioIndex >= 0 ? radioList[radioIndex] : {};
    },
    lastSong({radioIndex, radioList}) {
      return radioIndex >= 1 ? radioList[radioIndex - 1] : {};
    },
    nextSong({radioIndex, radioList}) {
      return radioIndex >= 0 ? radioList[radioIndex + 1] : {};
    }
  },

  mutations: {
    next(state) {
      console.log('next:');
      // if index exceeds the list(which happens when list update fails)
      if (state.radioIndex > state.radioList.length - 1) {
        console.log('radioIndex exceeds!');
        console.log('radioIndex: ' + state.radioIndex);
        console.log(state.radioList);
        return;
      }
      state.radioIndex++;
      setItem('radioIndex', state.radioIndex);
      state.allowBack = true;
      console.log(state);
    },

    last(state) {
      console.log('last:');
      console.log(state);
      if (state.allowBack) {
        state.radioIndex--;
        setItem('radioIndex', state.radioIndex);
        state.allowBack = false;
      }
      console.log(state);
    },

    radioListUpdate(state, list) {
      if (state.radioIndex < 0) {
        state.radioIndex++;
      }
      // if the list is too long, clear the played songs
      if (state.radioList.length > 10) {
        state.radioList = state.radioList.slice(state.radioIndex - 1);
        state.radioIndex = 1;
      }
      state.radioList = state.radioList.concat(list);
      setItem('radioIndex', state.radioIndex);
      setItem('radioList', state.radioList);
      console.log('list update');
      console.log(state);
    },

    clear(state) {
      state.radioIndex = -1;
      state.radioList.length = 0;
      state.allowBack = false;
      setItem('radioIndex', state.radioIndex);
      setItem('radioList', state.radioList);
    }
  },

  actions: {
    ended({commit}) {
      commit('next');
    },

    clear({commit}) {
      commit('clear');
      commit('playStatus/clear', null, {root: true});
    }
  }
};

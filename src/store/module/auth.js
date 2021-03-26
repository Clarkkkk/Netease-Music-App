import {getItem, setItem} from '@/functions/storage.js';
import fetchJSON from '@/functions/fetchJSON';
export default {
  namespaced: true,
  state: {
    login: getItem('login', 'boolean'),
    userID: getItem('userID', 'number')
  },

  mutations: {
    login(state, id) {
      console.log('commit login');
      state.login = true;
      state.userID = id;
      setItem('login', state.login);
      setItem('userID', state.userID);
    },

    logout(state) {
      state.login = false;
      state.userID = '';
      setItem('login', state.login);
      setItem('userID', state.userID);
    }
  },

  actions: {
    checkLogin({commit}) {
      return fetchJSON('/login/status').then((res) => {
        console.log(res);
        const profile = res.data.profile;
        if (profile) {
          commit('login', profile.userId);
        } else {
          commit('logout');
        }
      });
    }
  }
};

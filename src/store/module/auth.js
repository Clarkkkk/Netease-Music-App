import {getItem, setItem} from '@/functions/storage.js';

export default {
  namespaced: true,
  state: {
    login: getItem('login', 'boolean'),
    userID: getItem('userID', 'number')
  },

  mutations: {
    login(state, res) {
      console.log('commit login');
      state.login = true;
      state.userID = res.profile.userId;
      setItem('login', state.login);
      setItem('userID', state.userID);
    },

    logout(state) {
      state.login = false;
      state.userID = '';
      setItem('login', state.login);
      setItem('userID', state.userID);
    }
  }
};

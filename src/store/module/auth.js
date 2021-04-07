import fetchJSON from '@/functions/fetchJSON';
export default {
  namespaced: true,
  state: {
    login: undefined,
    userID: 0
  },

  mutations: {
    login(state, id) {
      console.log('commit login');
      state.login = true;
      state.userID = id;
    },

    logout(state) {
      state.login = false;
      state.userID = '';
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

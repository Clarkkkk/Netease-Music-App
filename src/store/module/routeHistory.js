export default {
  namespaced: true,
  state: {
    isSafari: false,
    lastTouch: 0,
    transitionName: 'fade',
    history: []
  },

  getters: {
    lastRoute({history}) {
      return history[history.length - 2];
    }
  },

  mutations: {
    touchEnd(state) {
      state.lastTouch = Date.now();
    },

    agent(state, isSafari) {
      state.isSafari = isSafari;
    },

    transition(state, transition) {
      state.transitionName = transition;
    },

    push(state, route) {
      state.history.push(route);
    },

    pop(state) {
      state.history.pop();
    },

    clear(state) {
      state.history = [];
    }
  }
};

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import AppIcon from './components/AppIcon.vue';
import './registerServiceWorker.js';

Vue.config.productionTip = false;

Vue.component('app-icon', AppIcon);
const req = require.context('./assets/icons', false, /\.svg$/);
req.keys().map(req);

// check if logged in first
store.dispatch('auth/checkLogin').then(() => {
  new Vue({
    router,
    store,
    render: (h) => {
      return h(App);
    }
  }).$mount('#app');
});



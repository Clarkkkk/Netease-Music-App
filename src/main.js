import Vue from 'vue';
import { createApp, h } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import AppIcon from './components/AppIcon.vue';
import './registerServiceWorker.js';

//Vue.config.productionTip = false;

//Vue.component('app-icon', AppIcon);
const req = require.context('./assets/icons', false, /\.svg$/);
req.keys().map(req);

const app = createApp({
  render() {
    return h(App);
  }
});

app.use(router);
app.use(store);
app.component('app-icon', AppIcon);
app.mount('#app');

/*
new Vue({
  router,
  store,
  render: (h) => {
    return h(App);
  }
}).$mount('#app');
*/

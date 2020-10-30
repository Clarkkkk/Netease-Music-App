import Vue from 'vue';
import VueRouter from 'vue-router';
import Discover from '@/views/Discover.vue';
import Home from '@/views/Discover/Home.vue';
import Account from '@/views/Account.vue';
import store from '@/store';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Discover,
    children: [
      {
        path: '',
        name: 'discover',
        component: Home
      },
      {
        path: 'search',
        component: () =>
          import(/* webpackChunkName: "search" */ '@/views/Discover/Search.vue'),
        children: [
          {
            path: '',
            name: 'discover-search',
            component: () =>
              import(/* webpackChunkName: "search" */ '@/views/Discover/SearchDefault.vue')
          },
          {
            path: 'result/:searchText',
            name: 'discover-search-result',
            props: true,
            component: () =>
              import(/* webpackChunkName: "search" */ '@/views/Discover/SearchResult.vue')
          }
        ]
      },
      {
        path: 'recommendation',
        name: 'discover-recommendation',
        props: {type: 'recommendation'},
        component: () =>
          import(/* webpackChunkName: "songlist" */ '@/views/SongList.vue')
      },
      {
        path: 'songlist/:listId',
        name: 'discover-songlist',
        props: (route) => {
          return {
            listId: route.params.listId,
            type: 'songlist'
          };
        },
        component: () =>
          import(/* webpackChunkName: "songlist" */ '@/views/SongList.vue')
      }
    ]
  },
  {
    path: '/account',
    component: Account,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () =>
          import(
            /* webpackChunkName: "account" */
            /* webpackPrefetch: true */
            '@/views/Account/Login.vue'
          )
      },
      {
        path: '',
        name: 'account',
        component: () =>
          import(
            /* webpackChunkName: "account" */
            /* webpackPrefetch: true */
            '@/views/Account/Profile.vue'
          ),
        beforeEnter: (to, from, next) => {
          console.log(from);
          console.log(store.state.auth);
          if (store.state.auth.login || from.name === 'login') {
            next();
          } else {
            next({name: 'login'});
          }
        }
      },
      {
        path: 'songlist/:listId',
        name: 'account-songlist',
        props: (route) => {
          return {
            listId: route.params.listId,
            type: 'songlist'
          };
        },
        component: () =>
          import(/* webpackChunkName: "songlist" */ '@/views/SongList.vue')
      },
      {
        path: 'favorite-songs',
        name: 'account-favorite',
        props: (route) => {
          return {
            listId: route.params.listId,
            type: 'songlist'
          };
        },
        component: () =>
          import(/* webpackChunkName: "songlist" */ '@/views/SongList.vue')
      },
      {
        path: 'listening-rank',
        name: 'account-rank',
        component: () =>
          import('@/views/Account/Rank.vue')
      }
    ]
  },
  {
    path: '/play',
    name: 'play',
    beforeEnter: (to, from, next) => {
      if (store.state.radio) {
        store.commit('playRadio', false);
        store.commit('radioPlay/clear');
      }
      next();
    },
    component: () =>
      import('@/views/Play.vue')
  },
  {
    path: '/radio',
    name: 'radio',
    beforeEnter: (to, from, next) => {
      if (!store.state.radio) {
        store.commit('playRadio', true);
        store.commit('commonPlay/clear');
      }
      next();
    },
    component: () =>
      import('@/views/Radio.vue')
  }
];

const router = new VueRouter({
  // mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(store);
  console.log(store.getters);
  console.log(store.getters['routeHistory/lastRoute']);
  const state = store.state.routeHistory;
  const transition = store.commit.bind(null, 'routeHistory/transition');
  const push = store.commit.bind(null, 'routeHistory/push');
  const pop = store.commit.bind(null, 'routeHistory/pop');
  const clear = store.commit.bind(null, 'routeHistory/clear');

  if (to.name === from.name) {
    console.log('Same path.');
    return;
  }

  // route to the page directly by tapping dock
  if (to.params.dock) {
    console.log('dock');
    transition('no-transition');
    clear();
    push(to.name);
  // route to the play/radio page with 'expand' animation
  } else if (to.params.indicator) {
    console.log('expand');
    transition('expand');
    push(to.name);
  // route back by tapping the back button component
  } else if (to.params.back) {
    console.log('back');
    transition('slide-right');
    pop();
  // route back by system or browser
  } else if (to.name === store.getters['routeHistory/lastRoute']) {
    // slide back in Safari
    if (state.isSafari && Date.now() - state.lastTouch < 377) {
      console.log('safari');
      transition('no-transition');
      pop();
    } else {
      console.log('back');
      transition('slide-right');
      pop();
    }
  // route forward
  } else if (state.history.length > 0) {
    console.log('forward');
    transition('slide-left');
    push(to.name);
  // the first route, or other exceptions
  } else {
    push(to.name);
    console.log(store);
  }
  next();
});

export default router;

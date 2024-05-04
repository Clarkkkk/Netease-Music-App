import Home from './pages/Home/Home.vue'

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/radio',
        component: () => import('./pages/Radio/Radio.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/playing',
        component: () => import('./pages/PlayingNow/PlayingNow.vue')
    },
    {
        path: '/songlist/:id',
        component: () => import('./pages/Songlist/Songlist.vue')
    },
    {
        path: '/album/:id',
        component: () => import('./pages/Album/Album.vue')
    },
    {
        path: '/search',
        component: () => import('./pages/Search/Search.vue')
    },
    {
        path: '/user-center',
        component: () => import('./pages/UserCenter/UserCenter.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/setting',
        component: () => import('./pages/Setting/Setting.vue')
    }
]

export default routes

import { createApp } from 'vue'
import PrefetchPlugin from 'vue-route-prefetch'
import { createRouter, createWebHistory } from 'vue-router'
import { startViewTransition, ViewTransitionsPlugin } from 'vue-view-transitions'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/useAuthStore'
import App from './App.vue'
import routes from './routes'
import './global.css'

const router = createRouter({
    history: createWebHistory('/music'),
    routes
})
router.beforeEach((to, from) => {
    if (to.path === '/index.html') {
        return '/'
    }

    const auth = useAuthStore()
    if (to.meta.requiresAuth && !auth.loggedIn) {
        auth.openLogin()
        if (from.meta.requiresAuth || from.matched.length === 0) {
            return '/'
        } else {
            return false
        }
    } else {
        return true
    }
})

let promise = Promise.resolve()

router.beforeResolve(async () => {
    promise = new Promise((resolve) => {
        router.afterEach(() => resolve())
    })
    const viewTransition = startViewTransition(async () => {
        await promise // start the view transition after `afterEach`
    })
    await viewTransition.captured
})

createApp(App)
    .use(router)
    .use(PrefetchPlugin)
    .use(createPinia())
    .use(ViewTransitionsPlugin())
    .mount('#app')

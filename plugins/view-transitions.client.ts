import { ViewTransitionsPlugin } from 'vue-view-transitions'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(ViewTransitionsPlugin())
})

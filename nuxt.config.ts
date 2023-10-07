import vue from '@vitejs/plugin-vue'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { fileURLToPath } from 'url'
import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    components: [{ path: '~/components/Globals', pathPrefix: false }, '~/components'],
    modules: ['@pinia/nuxt', 'unplugin-icons/nuxt', '@nuxtjs/tailwindcss'],
    alias: {
        common: fileURLToPath(new URL('./common', import.meta.url)),
        services: fileURLToPath(new URL('./services', import.meta.url)),
        api: fileURLToPath(new URL('./api', import.meta.url)),
        utils: fileURLToPath(new URL('./utils', import.meta.url)),
        stores: fileURLToPath(new URL('./stores', import.meta.url))
    },
    vite: {
        plugins: [
            // vue(),
            svgLoader({
                defaultImport: 'component',
                svgo: false
            }),
            Components({
                resolvers: [IconsResolver()]
            }),
            Icons({})
        ]
    },
    nitro: {
        // proxy the request from client
        devProxy: {
            '/api': {
                target: 'https://api.carllllo.work/music',
                changeOrigin: true,
                headers: {
                    referer: 'https://carllllo.work'
                }
            }
        },
        // redirect the request from server
        routeRules: {
            '/api/**': {
                proxy: 'https://api.carllllo.work/music/**',
                headers: {
                    referer: 'https://carllllo.work'
                }
            }
        },
        plugins: [fileURLToPath(new URL('./nitro.ts', import.meta.url))]
    },
    experimental: {
        viewTransition: true
    }
})

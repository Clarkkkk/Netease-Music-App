/// <reference types="vitest" />
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import { codeInspectorPlugin } from 'code-inspector-plugin'
import * as path from 'path'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
// import turboConsole from 'unplugin-turbo-console/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vitePluginImp from 'vite-plugin-imp'
// import checker from 'vite-plugin-checker'
import { VitePWA } from 'vite-plugin-pwa'
import svgLoader from 'vite-svg-loader'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(() => {
    return {
        base: '/music/',
        envDir: './env',
        define: {
            __VUE_OPTIONS_API__: false
        },
        clearScreen: false,
        plugins: [
            vue(),
            vueJsx(),
            // codeInspectorPlugin({
            //     bundler: 'vite'
            // }),
            // checker({
            //     vueTsc: true,
            //     eslint: {
            //         lintCommand: 'eslint "./src/**/*.{ts,vue}"'
            //     },
            //     terminal: false,
            //     overlay: {
            //         initialIsOpen: false
            //     }
            // }),
            // turboConsole(),
            svgLoader({
                defaultImport: 'component',
                svgo: false
            }),
            tsconfigPaths({
                loose: true
            }),
            vitePluginImp({
                libList: [
                    {
                        libName: 'lodash',
                        libDirectory: '',
                        camel2DashComponentName: false
                    }
                ]
            }),
            Icons(),
            Components({
                dirs: [],
                types: [],
                dts: 'src/types/components.d.ts',
                resolvers: [IconsResolver()]
            }),
            VitePWA({
                injectRegister: 'inline',
                registerType: 'autoUpdate',
                manifest: {
                    name: 'Music',
                    short_name: 'Music',
                    description: 'A Music web app',
                    theme_color: '#5f19f7',
                    start_url: 'https://carllllo.work/music/index.html',
                    id: 'carllllo-music',
                    scope: '/',
                    icons: [
                        {
                            src: 'pwa-64x64.png',
                            sizes: '64x64',
                            type: 'image/png'
                        },
                        {
                            src: 'pwa-192x192.png',
                            sizes: '192x192',
                            type: 'image/png'
                        },
                        {
                            src: 'pwa-512x512.png',
                            sizes: '512x512',
                            type: 'image/png',
                            purpose: 'any'
                        },
                        {
                            src: 'maskable-icon-512x512.png',
                            sizes: '512x512',
                            type: 'image/png',
                            purpose: 'maskable'
                        }
                    ]
                },
                workbox: {
                    skipWaiting: true,
                    clientsClaim: true,
                    globPatterns: ['**/{main,vendor,index}*.{js,css}'],
                    globIgnores: ['**/*.html', '**/*.webmanifest'],
                    maximumFileSizeToCacheInBytes: 50 * 1000 * 1000,
                    sourcemap: false,
                    navigateFallback: undefined,
                    cleanupOutdatedCaches: true,
                    runtimeCaching: [
                        {
                            urlPattern: /^https:\/\/carllllo.work\/music.*\.(js|css)$/,
                            handler: 'CacheFirst',
                            options: {
                                cacheName: 'app-shell',
                                cacheableResponse: {
                                    statuses: [200]
                                },
                                expiration: {
                                    maxAgeSeconds: 30 * 24 * 60 * 60
                                }
                            }
                        },
                        {
                            urlPattern: /\.(?:png|gif|jpg|jpeg|webp|svg)$/i,
                            handler: 'CacheFirst',
                            options: {
                                cacheName: 'app-images',
                                cacheableResponse: {
                                    statuses: [200]
                                },
                                expiration: {
                                    maxAgeSeconds: 60 * 24 * 60 * 60,
                                    maxEntries: 100
                                }
                            }
                        }
                    ]
                }
            })
        ],
        server: {
            port: 3200,
            host: '127.0.0.1',
            open: 'http://127.0.0.1:3200/music',
            proxy: {
                '/api': {
                    target: 'https://api.carllllo.work/music',
                    changeOrigin: true,
                    rewrite: (url) => url.replace(/^\/api/, ''),
                    headers: {
                        Referer: 'https://carllllo.work/'
                    }
                }
            }
        },
        build: {
            outDir: 'dist',
            chunkSizeWarningLimit: 1024,
            rollupOptions: {
                output: {
                    entryFileNames: path.posix.join('assets', 'main.[hash].js')
                }
            }
        },
        preview: {
            port: 6400
        },
        test: {
            environment: 'jsdom'
        }
    }
})

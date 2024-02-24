/// <reference types="vitest" />
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import * as path from 'path'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import turboConsole from 'unplugin-turbo-console/vite'
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
            turboConsole(),
            svgLoader({
                defaultImport: 'component',
                svgo: false
            }),
            tsconfigPaths({
                // loose: true
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
            // Icons(),
            // Components({
            //     dirs: [],
            //     types: [],
            //     dts: 'src/types/components.d.ts',
            //     resolvers: [IconsResolver()]
            // }),
        ],
        server: {
            port: 3200,
            host: '127.0.0.1',
            open: false,
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

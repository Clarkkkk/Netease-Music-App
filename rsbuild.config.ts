import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginVue2 } from "@rsbuild/plugin-vue2";
import { GenerateSW } from "@aaroon/workbox-rspack-plugin";

const { publicVars: vueEnvs } = loadEnv({ prefixes: ["VUE_APP_"] });

const sourceMapFlag =
  process.env.NODE_ENV === "production" ? "cheap-source-map" : false;

export default defineConfig(({ envMode, env }) => {
  return {
    plugins: [pluginVue2()],
    dev: {
      assetPrefix: "/",
      progressBar: true,
    },
    output: {
      assetPrefix: "/music",
      sourceMap: {
        js: sourceMapFlag,
        css: !!sourceMapFlag,
      },
    },
    server: {
      port: 8100,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      proxy: {
        "/api": {
          target: "https://api.carllllo.work/music",
          changeOrigin: true,
          pathRewrite: { "^/api": "" },
          headers: {
            Referer: "https://carllllo.work",
          },
        },
      },
    },
    source: {
      alias: {
        "@": "./src",
      },
      define: {
        ...vueEnvs,
        "process.env": {
          ...process.env,
        },
      },
      entry: {
        index: "./src/main.js",
      },
    },
    html: {
      template: "./public/index.html",
      templateParameters: {
        title: "Music",
      },
    },
    tools: {
      rspack: {
        mode:
          env === "development" || envMode === "alpha2"
            ? "development"
            : "production",
        devtool: sourceMapFlag,
        resolve: {
          extensions: [".vue", ".js", ".jsx", ".tsx", ".ts", ".json"],
        },
        plugins: [
          new GenerateSW({
            skipWaiting: true,
            clientsClaim: true,
            exclude: [/\.txt$/, /\.map$/],
            // globPatterns: ['**/{main,vendor,index}*.{js,css}'],
            // globIgnores: ['**/*.html', '**/*.webmanifest'],
            maximumFileSizeToCacheInBytes: 50 * 1000 * 1000,
            sourcemap: false,
            navigateFallback: undefined,
            cleanupOutdatedCaches: true,
            runtimeCaching: [
              {
                urlPattern: /^https:\/\/carllllo.work\/music.*\.(js|css)$/,
                handler: "CacheFirst",
                options: {
                  cacheName: "app-shell",
                  cacheableResponse: {
                    statuses: [200],
                  },
                  expiration: {
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                  },
                },
              },
              {
                urlPattern: /\.(?:png|gif|jpg|jpeg|webp|svg)$/i,
                handler: "CacheFirst",
                options: {
                  cacheName: "app-images",
                  cacheableResponse: {
                    statuses: [200],
                  },
                  expiration: {
                    maxAgeSeconds: 60 * 24 * 60 * 60,
                    maxEntries: 100,
                  },
                },
              },
              {
                urlPattern: /^https:\/\/.*126.net\/.*\.(mp3|flac)$/i,
                handler: "StaleWhileRevalidate",
                options: {
                  cacheName: "music",
                  cacheableResponse: {
                    statuses: [200, 206],
                  },
                  expiration: {
                    maxEntries: 50,
                  },
                  rangeRequests: true,
                },
              },
            ],
          }),
        ],
      },
    },
    performance: {
      removeMomentLocale: true,
      removeConsole:
        process.env.NODE_ENV === "production" ? ["log"] : undefined,
    },
  };
});

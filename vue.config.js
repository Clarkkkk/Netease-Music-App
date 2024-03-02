const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.carllllo.work/music',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        headers: {
          Referer: 'https://carllllo.work'
        }
      }
    }
  },
  pwa: {
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      importWorkboxFrom: 'local', // 从''cdn"导入workbox,也可以‘local’
      skipWaiting: true, // 安装完SW不等待直接接管网站
      clientsClaim: true,
      navigateFallback: '/index.html',
      exclude: [/\.(?:map)$/], // 在预缓存中排除sourceMap
      // 定义运行时缓存
      runtimeCaching: [
        {
          // To match cross-origin requests, use a RegExp that matches
          // the start of the origin:
          urlPattern: new RegExp(/^https?:\/\/.*126\.net/),
          handler: 'StaleWhileRevalidate',
          options: {
            // Configure which responses are considered cacheable.
            cacheableResponse: {
              statuses: [200]
            }
          }
        },
        {
          // Use a RegExp that matches the start of the origin:
          urlPattern: new RegExp('^https://carllllo.work'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'appShell',
            // Configure which responses are considered cacheable.
            cacheableResponse: {
              statuses: [200]
            },
            expiration: {
              maxAgeSeconds: 7 * 24 * 60 * 60
            }
          }
        }
      ]
    },
    // 这里的设置会反映在index.html中
    name: 'neteasemusic',
    themeColor: '#ff3932',
    msTileColor: '#ff3932',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    manifestPath: 'public/manifest.json',
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      androidChrome: 'img/icons/android-chrome-192x192.png',
      appleTouchIcon: 'img/icons/apple-touch-icon.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/mstile-150x150.png'
    }
  },
  css: {
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
        esModule: false
      }
    }
  },
  configureWebpack: {
    plugins: [
      // copy sw.js path.resolve(__dirname, ‘sw.js所在路径’)
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, './src/service-worker.js'),
          to: path.resolve(__dirname, './dist'),
          ignore: ['.*']
        }
      ])
    ]
  },
  chainWebpack: (config) => {
    config.module.rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end();
    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include
      .add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite')
      .loader('svg-sprite-loader')
      .options({
        symbolId: '[name]'
      })
      .end();
  },
  // productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/music/',
};

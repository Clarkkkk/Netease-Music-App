import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginVue2 } from "@rsbuild/plugin-vue2";
import Icons from "unplugin-icons/webpack";
import { FileSystemIconLoader } from "unplugin-icons/loaders";

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
      },
    },
    performance: {
      removeMomentLocale: true,
      removeConsole:
        process.env.NODE_ENV === "production" ? ["log"] : undefined,
    },
  };
});

/* eslint-disable import/no-extraneous-dependencies */
import path, { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteSvgIcons from 'vite-plugin-svg-icons'

// inject title
import { createHtmlPlugin } from 'vite-plugin-html'
// setup name
import VueSetupExtend from 'vite-plugin-vue-setup-extend-plus'

// auto import element-plus has some issue
import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// auto import vue https://www.npmjs.com/package/unplugin-auto-import
import AutoImport from 'unplugin-auto-import/vite'

//  import image
//  直接使用 <img :src="Logo" />
// import ViteImages from 'vite-plugin-vue-images'
import setting from './src/settings'

import { loadEnv } from 'vite'

import { optimizeDepsArr } from './optimize-include'

/* use child_process to exec shell */
const child_process = require('child_process')

let commitHash = ''
try {
  commitHash = child_process.execSync('git rev-parse --short HEAD').toString().trim()
} catch (e) {
  console.log('.git仓库为空或者未安装git')
}

const pathSrc = path.resolve(__dirname, 'src')
export default ({ command, mode }) => {
  return {
    base: setting.viteBasePath,
    // define global var
    define: {
      // fix "path" module issue
      'process.platform': null,
      'process.version': null,
      // define global var
      GLOBAL_VAR: {
        GIT_COMMIT_ID: commitHash,
      },
    },
    clearScreen: false,
    server: {
      hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
      // 服务配置
      port: 5006, // 类型： number 指定服务器端口;
      open: true, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      cors: true, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      proxy: {
        '/api': {
          target: loadEnv(mode, process.cwd()).VITE_APP_PROXY_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    preview: {
      port: 5006,
      host: '0.0.0.0',
      strictPort: true,
    },
    plugins: [
      vue({ reactivityTransform: true }),
      vueJsx(),
      viteSvgIcons({
        // config svg dir that can config multi
        iconDirs: [
          path.resolve(process.cwd(), 'src/icons/common'),
          path.resolve(process.cwd(), 'src/icons/nav-bar'),
        ],
        // appoint svg icon using mode
        symbolId: 'icon-[dir]-[name]',
      }),
      VueSetupExtend(),
      AutoImport({
        // resolvers: [ElementPlusResolver()],
        imports: [
          'vue',
          'pinia',
          'vue-router',
          {
            '@/hooks/global/useCommon': ['useCommon'],
            '@/hooks/global/useElement': ['useElement'],
            '@/hooks/global/useVueRouter': ['useVueRouter'],
            '@/utils/axiosReq': ['axiosReq'],
          },
        ],
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        dts: true, // auto generation auto-imports.d.ts file
      }),
      createHtmlPlugin({
        inject: {
          // Inject data into ejs template
          data: {
            title: setting.title,
          },
        },
      }),
    ],
    build: {
      minify: 'terser',
      brotliSize: false,
      chunkSizeWarningLimit: 5000,
      terserOptions: {
        compress: {
          drop_console: false,
          pure_funcs: ['console.log', 'console.info'],
          drop_debugger: true,
        },
      },
      assetsDir: 'static/assets',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
    resolve: {
      alias: {
        '~/': `${pathSrc}/`,
        '@/': `${pathSrc}/`,
        // remove i18n waring
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      },
    },
    optimizeDeps: {
      include: [
        'element-plus/es',
        'moment-mini',
        'echarts/core',
        'echarts/components',
        'echarts/charts',
        'echarts/features',
        'echarts/renderers',
        ...optimizeDepsArr(),
      ],
    },
  }
}

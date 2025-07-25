import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: env.BASE,
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // 设置 `@` 指向 `src` 目录
        // '/comps/': path.resolve(__dirname, './src/components'),
        'vue': 'vue/dist/vue.esm-bundler.js',
      },
    },
  }
})

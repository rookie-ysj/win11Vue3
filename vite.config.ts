import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 设置 `@` 指向 `src` 目录
      // 这里可以继续添加其他别名
      // '/comps/': path.resolve(__dirname, './src/components'),
    },
  },
})

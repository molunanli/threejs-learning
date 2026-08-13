import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 确保这样配置
      '~': path.resolve(__dirname, 'src')  // 可选添加 ~ 别名
    }
  },
  base: process.env.NODE_ENV === 'production'
    ? '/threejs-learning/' // 替换为你的 GitHub 仓库名
    : '/'
})

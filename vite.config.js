import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 关键：添加 base 配置。
  // 如果你的仓库名是 stardew-helper，这里就填 '/stardew-helper/'
  // 注意前后都有斜杠
  base: '/stardew-helper/',
})
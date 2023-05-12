import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

//nodejs内置模块---处理路径相关
import path from "path"


// https://vitejs.dev/config/
export default defineConfig({
  // 配置路径别名
  resolve: {
    alias: {
      //__dirname拿到当前目录的路径，在指定一下它的src
      "~": path.resolve(__dirname, "src")
    }
  },
  // 解决跨域问题
  server: {
    proxy: {
      '/api': {
        target: 'http://ceshi13.dishait.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },

    plugins: [vue(), WindiCSS(),]
  })

import {fileURLToPath, URL} from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import imagemin from 'unplugin-imagemin/vite'
import viteCompression from 'vite-plugin-compression'
import {visualizer} from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    visualizer({open: false}),
    react(),
    viteCompression({
      verbose: true, // 是否在控制台中输出压缩结果
      disable: false,
      threshold: 10240, // 如果体积大于阈值，将被压缩，单位为b，体积过小时请不要压缩，以免适得其反
      algorithm: 'gzip', // 压缩算法，可选['gzip'，' brotliccompress '，'deflate '，'deflateRaw']
      ext: '.gz',
      deleteOriginFile: false // 源文件压缩后是否删除
    }),
    imagemin({
      mode: 'sharp',
      compress: {
        jpeg: {
          // 0 ~ 100
          quality: 25,
        },
        png: {
          // 0 ~ 100
          quality: 25,
        },
        webp: {
          // 0 ~ 100
          quality: 25,
        },
      },
      conversion: [
        {from: "png", to: "webp"},
        {from: "jpeg", to: "png"},
      ],
      cache: false,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    target: 'es2020',
    minify: 'terser',
    // rollup 配置
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
        entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
        assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  }
})

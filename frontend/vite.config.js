import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  // 设置 base 选项，根据你的实际情况调整
  base: './', // 如果你的项目部署在根目录下，使用 '/'；如果部署在子目录下，使用 './' 或具体的子目录路径
  plugins: [react()],
  server: {
    proxy: {
      // 仅对以 api 开头的接口进行代理和路径重写
      '^/api': {
        target: 'http://10.82.4.152:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/+/, '')
      }
    }
  }
});

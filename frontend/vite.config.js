/**
 * 오자현 프록시설정 추가
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 프론트엔드에서 /api로 시작하는 요청을 백엔드로 전달
      '/api': {
        target: 'http://localhost:4000',  // 백엔드 서버의 주소와 포트
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),  // /api 부분을 제거하고 백엔드에 전달
      },
    },
  },
});

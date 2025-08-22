import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // 이 부분 추가!
      '/ghouse': {
        target: 'http://192.168.50.128:8080', // Spring Boot 서버 주소
        changeOrigin: true,
      },
      '/ghouse/upload': {
        target: 'http://192.168.50.128:8080', // Spring Boot 서버 주소
        changeOrigin: true,
      },
    },
  },
})

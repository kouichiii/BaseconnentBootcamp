import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // ホストを0.0.0.0に設定し、Dockerコンテナからアクセス可能にする
    port: 5173,       // 使用するポート（docker-compose.ymlで指定したポートに一致させる）
    watch: {
      usePolling: true, // Docker環境でのファイル変更を検知しやすくする
    },
  },
})
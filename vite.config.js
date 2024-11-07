import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve}  from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // 使用目錄下絕對路徑src
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})

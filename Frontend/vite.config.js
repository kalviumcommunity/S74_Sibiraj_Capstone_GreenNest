import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: import.meta.env.BACKEND_URL || 'http://localhost:5002',
        changeOrigin: true,
      },
    },
  },
})

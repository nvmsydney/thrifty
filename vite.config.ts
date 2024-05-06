import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/~24SP_jacksonja13',
  server: {
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
});
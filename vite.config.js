import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // The deferred Three.js scene is intentionally larger than the entry chunk.
    chunkSizeWarningLimit: 1000,
  },
})

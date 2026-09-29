import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // The prerendered HTML is the payload a crawler reads; leaving a stale
    // modulepreload polyfill in it only adds weight.
    modulePreload: { polyfill: false },
  },
})

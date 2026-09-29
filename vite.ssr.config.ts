import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * SSR build — produces the two modules `scripts/prerender.mjs` consumes:
 *
 *   entry-server.js  renderToString for a route's markup
 *   entry-seo.js     the route table and <head> builder (no React)
 *
 * Kept separate from the client config so the browser build never sees them,
 * and so React stays external and is resolved from node_modules at build time.
 */
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-ssr',
    emptyOutDir: true,
    ssr: true,
    ssrEmitAssets: false,
    minify: false,
    target: 'node20',
    rollupOptions: {
      input: {
        'entry-server': 'src/entry-server.tsx',
        'entry-seo': 'src/entry-seo.ts',
      },
      output: {
        format: 'esm',
        entryFileNames: '[name].js',
      },
    },
  },
})

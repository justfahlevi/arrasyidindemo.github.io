import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  // Relative paths so the build works from any folder, e.g. a GitHub Pages repo subpath
  base: './',
  plugins: [react()],
  server: { port: 5173 },
  // `--mode offline` builds one classic (non-module) script, so the site also runs
  // when index.html is opened straight from disk by double-clicking.
  build: mode === 'offline'
    ? { modulePreload: false, rollupOptions: { output: { format: 'iife', inlineDynamicImports: true } } }
    : {},
}))

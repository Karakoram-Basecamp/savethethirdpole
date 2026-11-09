/**
 * Vite configuration.
 *  - `npm run build`        → standard multi-asset production build in /dist
 *  - `npm run build:pages`  → GitHub Pages build (adds 404.html so deep links work)
 *  - `npm run build:single` → everything inlined into one HTML file (used for
 *    static previews / sandboxed hosting). That mode also sets
 *    VITE_STATIC_PREVIEW so the app swaps the router and the map iframe.
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig(({ mode }) => ({
  // Sub-path the site is served from, e.g. "/save-the-third-pole/" on a
  // GitHub Pages project site. Set by the deploy workflow; "/" locally.
  base: mode === 'single' ? './' : process.env.BASE_PATH || '/',
  plugins: [react(), ...(mode === 'single' ? [viteSingleFile()] : [])],
  define: mode === 'single' ? { 'import.meta.env.VITE_STATIC_PREVIEW': JSON.stringify('true') } : {},
  build: { outDir: mode === 'single' ? 'dist-single' : 'dist' },
}));

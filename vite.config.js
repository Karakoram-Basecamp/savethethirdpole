/**
 * Vite configuration.
 *  - `npm run build`        → standard multi-asset production build in /dist
 *  - `npm run build:single` → everything inlined into one HTML file (used for
 *    static previews / sandboxed hosting). That mode also sets
 *    VITE_STATIC_PREVIEW so the app swaps the router and the map iframe.
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig(({ mode }) => ({
  plugins: [react(), ...(mode === 'single' ? [viteSingleFile()] : [])],
  define: mode === 'single' ? { 'import.meta.env.VITE_STATIC_PREVIEW': JSON.stringify('true') } : {},
  base: './',
  build: { outDir: mode === 'single' ? 'dist-single' : 'dist' },
}));

/**
 * @license MIT
 * ============================================================================
 * vite.config.ts — Vite Bundler & Sass Token Compiler for Accessibility Studio
 * Property: https://a11y.raggiesoft.com (raggiesoft-a11y-studio)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW (100-LEVEL VITE CONFIGURATION GUIDE):
 *   What is this file?
 *     Configures Vite 6 to bundle our TypeScript modules, IBM Carbon Design
 *     System Web Components (`@carbon/web-components`), and Carbon Sass design
 *     tokens (`@carbon/styles`) into content-hashed static files inside `dist/`.
 *
 *   Why `preprocessorOptions.scss.quietDeps: true`?
 *     `@carbon/styles` ships upstream Sass modules inside `node_modules/`.
 *     Setting `quietDeps: true` keeps build output crisp while still surfacing
 *     any warnings in our own `src/styles/carbon-studio.scss` stylesheet!
 * ============================================================================
 */

import { defineConfig } from 'vite';

export default defineConfig({
  // Emit root-relative `/assets/*` paths for `https://a11y.raggiesoft.com`
  base: '/',
  css: {
    preprocessorOptions: {
      scss: {
        // Silence third-party Sass deprecation chatter inside `node_modules/@carbon/styles`
        quietDeps: true
      }
    }
  },
  build: {
    // Write client bundles into `dist/`, where `scripts/prerender.mjs` writes static HTML routes
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2022'
  }
});

import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import expressiveCode from 'astro-expressive-code';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://react-responsive-pagination.elantha.com/',
  integrations: [
    react(),
    expressiveCode({
      themes: ['light-plus', 'dark-plus'],
      styleOverrides: {
        codeFontSize: '0.9rem',
      },
    }),
    mdx(),
    sitemap(),
  ],
  trailingSlash: 'never',

  vite: {
    resolve: {
      alias: {
        // temporary here (and not in tsconfig) https://github.com/vitejs/vite/issues/22766
        '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      },
    },
    plugins: [tailwindcss()],
  },
});

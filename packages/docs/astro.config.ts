import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import expressiveCode from 'astro-expressive-code';

export default defineConfig({
  site: 'https://react-responsive-pagination.elantha.com/',
  integrations: [
    react(),
    expressiveCode({
      themes: ['light-plus', 'dark-plus'],
      styleOverrides: {
        codeFontSize: '0.9rem',
        frames: { frameBoxShadowCssValue: 'none' },
      },
    }),
    mdx(),
    sitemap(),
  ],
  trailingSlash: 'never',
});

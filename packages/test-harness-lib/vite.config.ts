import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      formats: ['es'],
      entry: new URL('src/index.tsx', import.meta.url).pathname,
      fileName: 'index',
      name: 'test-harness-lib',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
});

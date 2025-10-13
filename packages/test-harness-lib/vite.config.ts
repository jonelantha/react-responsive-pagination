import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      formats: ['es'],
      entry: {
        index: new URL('src/index.ts', import.meta.url).pathname,
        TestHarnessApp: new URL('src/TestHarnessApp.tsx', import.meta.url).pathname,
      },
      cssFileName: 'index',
      name: 'test-harness-lib',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
});

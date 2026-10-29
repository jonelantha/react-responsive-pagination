// @ts-check

import { defineConfig } from 'eslint/config';
import { baseTsConfig } from '../../eslint.config.js';

export default defineConfig([
  { ignores: ['playwright-report', 'test-results'] },
  baseTsConfig,
]);

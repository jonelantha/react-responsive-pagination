// @ts-check

import { defineConfig } from 'eslint/config';
import { baseReactLegacyRuntimeConfig } from '../../eslint.config.js';

export default defineConfig([
  { ignores: ['./dist', './temp'] },
  baseReactLegacyRuntimeConfig,
]);

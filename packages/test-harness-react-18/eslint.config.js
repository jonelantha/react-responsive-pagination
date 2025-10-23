// @ts-check

import { defineConfig } from 'eslint/config';
import { baseReactConfig } from '../../eslint.config.js';

export default defineConfig([
  {
    ignores: ['dist'],
  },
  baseReactConfig,
]);

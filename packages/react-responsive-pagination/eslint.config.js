// @ts-check

import { defineConfig } from 'eslint/config';
import {
  baseReactLegacyRuntimeConfig,
  baseTsNoParseConfig,
} from '../../eslint.config.js';

const stubs = [
  '**/labelBehaviour.d.ts',
  '**/narrowBehaviour.d.ts',
  '**/presets.d.ts',
  './labelBehaviour.js',
  './narrowBehaviour.js',
  './presets.js',
];

export default defineConfig([
  { ignores: ['./dist', './temp'] },
  {
    ignores: stubs,
    extends: [baseReactLegacyRuntimeConfig],
  },
  {
    files: stubs,
    extends: [baseTsNoParseConfig],
  },
]);

// @ts-check

import astroEslintParser from 'astro-eslint-parser';
import eslintPluginAstro from 'eslint-plugin-astro';
import { defineConfig } from 'eslint/config';
import { baseReactConfig, baseTsConfig } from '../../eslint.config.js';

export default defineConfig([
  {
    ignores: ['dist', '.astro'],
  },
  {
    files: ['**/*.astro'],
    extends: [
      eslintPluginAstro.configs.recommended,
      eslintPluginAstro.configs['flat/jsx-a11y-recommended'],
      baseTsConfig,
    ],
    languageOptions: {
      parser: astroEslintParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
  },
  {
    ignores: ['**/*.astro'],
    extends: baseReactConfig,
  },
]);

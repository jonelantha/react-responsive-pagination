// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';

export const baseTsConfig = defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true },
      ],
    },
  },
]);

export const baseReactLegacyRuntimeConfig = defineConfig([
  baseTsConfig,
  reactPlugin.configs.flat.recommended,
  pluginJsxA11y.flatConfigs.recommended,
  pluginReactHooks.configs.flat.recommended,
  {
    settings: {
      react: { version: 'detect' },
    },
  },
]);

export const baseReactConfig = defineConfig([
  ...baseReactLegacyRuntimeConfig,
  reactPlugin.configs.flat['jsx-runtime'],
]);

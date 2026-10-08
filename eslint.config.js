// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y-x';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';

export const baseTsNoParseConfig = defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { destructuredArrayIgnorePattern: '^_' },
      ],
    },
  },
]);

export const baseTsConfig = defineConfig([
  baseTsNoParseConfig,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      '@typescript-eslint/no-deprecated': 'error',
    },
  },
]);

export const baseReactConfig = defineConfig([
  baseTsConfig,
  pluginJsxA11y.configs.recommended,
  pluginReactHooks.configs.flat.recommended,
]);

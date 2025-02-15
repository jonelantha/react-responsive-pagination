// @ts-check

import astroEslintParser from 'astro-eslint-parser';
import eslintPluginAstro from 'eslint-plugin-astro';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  eslintPluginAstro.configs.recommended,
  eslintPluginAstro.configs['flat/jsx-a11y-recommended'],
  tseslint.configs.recommended,
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroEslintParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
  },
  {
    ignores: ['dist', '.astro', 'postcss.config.cjs'],
  },
  {
    rules: {
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true },
      ],
    },
  },
);

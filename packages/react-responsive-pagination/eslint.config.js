// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config({
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    eslint.configs.recommended,
    tseslint.configs.recommended,
    reactPlugin.configs.flat.recommended,
    pluginJsxA11y.flatConfigs.recommended,
    {
      plugins: { 'react-hooks': pluginReactHooks },
      rules: pluginReactHooks.configs.recommended.rules,
    },
  ],
  rules: {
    '@typescript-eslint/no-unused-expressions': [
      'error',
      { allowShortCircuit: true },
    ],
  },
});

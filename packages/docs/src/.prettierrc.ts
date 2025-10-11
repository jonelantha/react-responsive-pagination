import type { Config } from 'prettier';

const config: Config = {
  trailingComma: 'all',
  plugins: ['prettier-plugin-astro'],
  singleQuote: true,
  printWidth: 85,
  arrowParens: 'avoid',
};

export default config;

import type { Config } from 'prettier';

const config: Config = {
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 85,
  arrowParens: 'avoid',
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  tailwindFunctions: ['tw'],
};

export default config;

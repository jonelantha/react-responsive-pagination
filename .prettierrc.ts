import type { Config } from 'prettier';

const config: Config = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 85,
  arrowParens: 'avoid',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['tw'],
};

export default config;

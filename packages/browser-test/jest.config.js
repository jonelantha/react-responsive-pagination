module.exports = {
  preset: 'jest-playwright-preset',
  globals: {
    harnessUrl: process.env.PROD_TEST
      ? 'http://localhost:5000/'
      : 'http://localhost:3001/',
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testTimeout: 20000,
};

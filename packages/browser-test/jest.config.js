module.exports = {
  preset: 'jest-playwright-preset',
  globals: {
    url: process.env.PROD_TEST ? 'http://localhost:5000' : 'http://localhost:3001',
  },
};

const commonConfig = {
  exitOnPageError: false,
};

if (process.env.PROD_TEST) {
  module.exports = {
    ...commonConfig,
    browsers: ['chromium', 'firefox', 'webkit'],
    serverOptions: {
      command: 'yarn serve-prod',
      port: 5000,
      debug: true,
    },
  };
} else {
  module.exports = {
    ...commonConfig,
    launchOptions: {
      headless: false,
      slowMo: process.env.SLOWMO ?? null,
    },
    browsers:
      process.env.BROWSER === 'all'
        ? ['chromium', 'firefox', 'webkit']
        : [process.env.BROWSER ?? 'chromium'],
  };
}

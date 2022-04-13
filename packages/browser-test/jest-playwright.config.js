const commonConfig = {
  exitOnPageError: true,
};

if (process.env.PROD_TEST) {
  module.exports = {
    ...commonConfig,
    browsers: process.env.BROWSER
      ? [process.env.BROWSER]
      : ['chromium', 'firefox', 'webkit'],
    serverOptions: {
      command: process.env.SERVE_COMMAND,
      port: 3000,
      debug: true,
      launchTimeout: 10000,
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

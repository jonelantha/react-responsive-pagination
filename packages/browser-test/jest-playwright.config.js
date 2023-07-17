const commonConfig = {
  exitOnPageError: true,
};

if (process.env.PROD_TEST) {
  module.exports = {
    ...commonConfig,
    browsers: getBrowsers(process.env.BROWSER ?? 'all'),
    serverOptions: {
      command: process.env.SERVE_COMMAND,
      port: 3000,
      debug: false,
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
    browsers: getBrowsers(process.env.BROWSER ?? 'chromium'),
  };
}

function getBrowsers(browserStr) {
  if (browserStr === 'all') {
    return ['chromium', 'firefox', 'webkit'];
  }

  return browserStr.split(',');
}

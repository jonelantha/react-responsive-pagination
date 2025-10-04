import { defineConfig, devices } from '@playwright/test';

// https://playwright.dev/docs/test-configuration

const baseURL = `http://localhost:${process.env.PORT ?? '3001'}`;

export default defineConfig({
  testDir: './test',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    baseURL,
  },

  snapshotPathTemplate:
    '{snapshotDir}/{testFileDir}/{testFileName}-snapshots/{arg}{ext}',

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],

  ...(process.env.SERVE_COMMAND && {
    webServer: {
      command: process.env.SERVE_COMMAND,
      url: baseURL,
      reuseExistingServer: !process.env.CI,
    },
  }),
});

import { test as baseTest, expect } from '@playwright/test';
import { serialTestFixture } from './test-harness-page.ts';

const testWidths = [
  1000, 900, 800, 700, 600, 500, 400, 300, 200, 100, 250, 350, 450, 550, 650, 750,
  850, 950,
];

baseTest.describe('v1 Bootstrap 4 preset', () => {
  baseTest.describe.configure({ mode: 'serial' });

  const test = serialTestFixture();

  test.beforeAll(async ({ page, testHarness }) => {
    await testHarness.goto();

    await page.setViewportSize({ width: 700, height: 700 });

    await testHarness.presetLocator('v1Bootstrap4').check();
  });

  for (const width of testWidths) {
    test(`renders correctly with viewport width ${width}px`, async ({
      page,
      testHarness,
    }) => {
      await page.setViewportSize({ width, height: 700 });

      await testHarness.waitForNextFrame();

      const paginationHtml = await page.$eval('ul.pagination', ul => ul.outerHTML);

      expect(paginationHtml).toMatchSnapshot();
    });
  }
});

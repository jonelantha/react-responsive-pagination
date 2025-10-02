import { test as base, expect } from '@playwright/test';
import { TestHarnessPage } from './test-harness-page';

export const test = base.extend<{
  testHarness: TestHarnessPage;
}>({
  testHarness: async ({ page }, use) => {
    const testHarness = new TestHarnessPage(page, { throwOnError: true });

    await testHarness.goto();

    await page.setViewportSize({ width: 500, height: 700 });

    await testHarness.setField('total', 100);

    await testHarness.setField('current', 50);

    await use(testHarness);
  },
});

test.describe('Pagination style change detection', () => {
  ['inherit', '24px', '40px', 'inherit'].forEach((fontSize, index) => {
    test(`adapts correctly when font-size changed to ${fontSize} (${index})`, async ({
      page,
      testHarness,
    }) => {
      await testHarness.setStyle(`.pagination { font-size: ${fontSize}; }`);

      await testHarness.waitForNextFrame();

      const paginationHtml = await page.$eval('ul.pagination', ul => ul.outerHTML);

      expect(paginationHtml).toMatchSnapshot();
    });
  });

  // TODO - test style change triggered within React events
});

import { test as base, expect } from '@playwright/test';
import { TestHarnessPage } from './test-harness-page.ts';

export const test = base.extend<{
  testHarness: TestHarnessPage;
}>({
  testHarness: async ({ page }, use) => {
    const testHarness = new TestHarnessPage(page, { throwOnError: true });

    await testHarness.goto();

    await page.setViewportSize({ width: 700, height: 700 });

    await use(testHarness);
  },
});

test.describe('renderNav', () => {
  for (const renderNav of [undefined, false, true]) {
    test(`Setting renderNav to ${renderNav}`, async ({ testHarness }) => {
      await testHarness.setField('renderNav', renderNav);

      const paginationHtml = await testHarness.getPaginationHtml();

      expect(paginationHtml).toMatchSnapshot();
    });
  }
});

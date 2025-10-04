import { test as base, expect } from '@playwright/test';
import { TestHarnessPage } from './test-harness-page';

export const test = base.extend<{
  testHarness: TestHarnessPage;
}>({
  testHarness: async ({ page }, use) => {
    const testHarness = new TestHarnessPage(page, { throwOnError: true });

    await testHarness.goto();

    await page.setViewportSize({ width: 600, height: 700 });

    await testHarness.setField('total', 100);

    await use(testHarness);
  },
});

test.describe('Pagination maxWidth', () => {
  [undefined, 400, 250].forEach(width => {
    test(`renders correctly with maxWidth of ${width}`, async ({ testHarness }) => {
      await testHarness.setField('maxWidth', width);

      await testHarness.waitForNextFrame();

      const paginationHtml = await testHarness.getPaginationHtml();

      expect(paginationHtml).toMatchSnapshot();
    });
  });
});

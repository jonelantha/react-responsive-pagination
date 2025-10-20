import { test as base, expect } from '@playwright/test';
import { TestHarnessPage } from './test-harness-page.ts';

export const test = base.extend<{
  testHarness: TestHarnessPage;
}>({
  testHarness: async ({ page }, use) => {
    const testHarness = new TestHarnessPage(page, {
      throwOnError: { ignoreInvalidPropTypes: true },
    });
    await testHarness.goto();

    await page.setViewportSize({ width: 500, height: 700 });

    await use(testHarness);
  },
});

test.describe('Pagination total pages', () => {
  for (const programmaticTotal of ['', -1, null]) {
    test(`will not show for invalid total value ${programmaticTotal}`, async ({
      page,
      testHarness,
    }) => {
      await testHarness.setField('total', programmaticTotal);

      await expect(page.locator('ul.pagination')).not.toBeVisible({ timeout: 200 });
    });
  }

  for (const programmaticTotal of [1, 4, 6]) {
    test(`will show for valid total value ${programmaticTotal}`, async ({
      page,
      testHarness,
    }) => {
      await testHarness.setField('total', programmaticTotal);

      await expect(page.locator('ul.pagination')).toBeVisible();
    });
  }
});

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

    await testHarness.setField('total', 100);

    await use(testHarness);
  },
});

test.describe('Pagination navigation', () => {
  for (const { initialCurrent, linkToClick, expectedCurrent } of [
    { initialCurrent: null, linkToClick: '»', expectedCurrent: '2' },
    { initialCurrent: 2, linkToClick: '»', expectedCurrent: '3' },
    { initialCurrent: 3, linkToClick: '100', expectedCurrent: '100' },
    { initialCurrent: 100, linkToClick: '«', expectedCurrent: '99' },
    { initialCurrent: 93, linkToClick: '93', expectedCurrent: '93' },
  ]) {
    test(`clicking ${linkToClick} renders correctly and sets current page to ${expectedCurrent}`, async ({
      page,
      testHarness,
    }) => {
      await testHarness.setField('current', initialCurrent);

      await testHarness.waitForNextFrame();

      await page.click(`text="${linkToClick}"`);

      await testHarness.waitForNextFrame();

      const paginationHtml = await testHarness.getPaginationHtml();
      expect(paginationHtml).toMatchSnapshot();

      const current = await testHarness.getField('current');
      expect(current).toBe(expectedCurrent);

      const currentUrl = page.url();
      expect(currentUrl).not.toContain('#');
    });
  }

  for (const programmaticCurrent of [2, 5, -1, 101, null, '', '3']) {
    test(`setting current page programmatically to ${programmaticCurrent} renders correctly`, async ({
      testHarness,
    }) => {
      await testHarness.setField('current', programmaticCurrent);

      const paginationHtml = await testHarness.getPaginationHtml();
      expect(paginationHtml).toMatchSnapshot();
    });
  }
});

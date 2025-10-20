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

test.describe('linkHref', () => {
  for (const linkHref of [undefined, 'hash', 'omit']) {
    test(`Setting linkHref to ${linkHref}`, async ({ testHarness }) => {
      await testHarness.setField('linkHref', linkHref);

      await testHarness.waitForNextFrame();

      const paginationHtml = await testHarness.getPaginationHtml();

      expect(paginationHtml).toMatchSnapshot();
    });
  }
  test('Setting linkHref to a function', async ({ testHarness }) => {
    await testHarness.setField('linkHref', 'hrefTestFn()');

    await testHarness.waitForNextFrame();

    const paginationHtml = await testHarness.getPaginationHtml();

    expect(paginationHtml).toMatchSnapshot();
  });
});

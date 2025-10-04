import { test as base, expect } from '@playwright/test';
import { TestHarnessPage } from './test-harness-page';

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

test.describe('Style Override', () => {
  test.beforeEach(async ({ testHarness }) => {
    await testHarness.setField('previousClassName', undefined);
    await testHarness.setField('nextClassName', undefined);
  });

  for (const [previousClassName, nextClassName] of [
    ['previous-auto-margin', undefined],
    [undefined, 'next-auto-margin'],
    ['previous-auto-margin', 'next-auto-margin'],
    ['previous-auto-margin-large', undefined],
    ['previous-auto-margin-large', 'next-auto-margin-large'],
    [undefined, undefined],
  ]) {
    test(`Setting override-margins to previous=${previousClassName}, next=${nextClassName}`, async ({
      testHarness,
    }) => {
      await testHarness.setField('previousClassName', previousClassName);
      await testHarness.setField('nextClassName', nextClassName);

      await testHarness.waitForNextFrame();

      const paginationHtml = await testHarness.getPaginationHtml();

      expect(paginationHtml).toMatchSnapshot();
    });
  }
});

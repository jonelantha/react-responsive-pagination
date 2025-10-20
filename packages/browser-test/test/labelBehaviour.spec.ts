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

test.describe('Label Behaviour', () => {
  test.beforeEach(async ({ testHarness }) => {
    await testHarness.setField('labelBehaviour', 'srOnlySpanLabel');
    await testHarness.setField('srOnlyClassName', undefined);
    await testHarness.setField('a11yActiveLabel', undefined);
  });

  for (const a11yActiveLabel of [undefined, 'active']) {
    test(`Setting a11yActiveLabel to ${a11yActiveLabel}`, async ({
      testHarness,
    }) => {
      await testHarness.setField('a11yActiveLabel', a11yActiveLabel);

      await testHarness.waitForNextFrame();

      const paginationHtml = await testHarness.getPaginationHtml();

      expect(paginationHtml).toMatchSnapshot();
    });
  }

  for (const srOnlyClassName of [undefined, 'alt-sr-only']) {
    test(`Setting srOnlyClassName to ${srOnlyClassName}`, async ({
      testHarness,
    }) => {
      await testHarness.setField('srOnlyClassName', srOnlyClassName);

      await testHarness.waitForNextFrame();

      const paginationHtml = await testHarness.getPaginationHtml();

      expect(paginationHtml).toMatchSnapshot();
    });
  }
});

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

test.describe('Labels', () => {
  test.beforeEach(async ({ testHarness }) => {
    await testHarness.setField('previousLabel', undefined);
    await testHarness.setField('nextLabel', undefined);
    await testHarness.setField('ariaPreviousLabel', undefined);
    await testHarness.setField('ariaNextLabel', undefined);
    await testHarness.setField('ariaCurrentAttr', undefined);
  });

  for (const previousLabel of [undefined, '<', 'Previous', '<PreviousLabel />']) {
    test(`Setting previousLabel to ${previousLabel}`, async ({ testHarness }) => {
      await testHarness.setField('previousLabel', previousLabel);

      await testHarness.waitForNextFrame();

      const paginationHtml = await testHarness.getPaginationHtml();

      expect(paginationHtml).toMatchSnapshot();
    });
  }

  for (const nextLabel of [undefined, '>', 'Next', '<NextLabel />']) {
    test(`Setting nextLabel to ${nextLabel}`, async ({ testHarness }) => {
      await testHarness.setField('nextLabel', nextLabel);

      await testHarness.waitForNextFrame();

      const paginationHtml = await testHarness.getPaginationHtml();

      expect(paginationHtml).toMatchSnapshot();
    });
  }

  for (const ariaPreviousLabel of [undefined, 'AriaPrevious']) {
    test(`Setting ariaPreviousLabel to ${ariaPreviousLabel}`, async ({
      testHarness,
    }) => {
      await testHarness.setField('ariaPreviousLabel', ariaPreviousLabel);

      await testHarness.waitForNextFrame();

      const paginationHtml = await testHarness.getPaginationHtml();

      expect(paginationHtml).toMatchSnapshot();
    });
  }

  for (const ariaNextLabel of [undefined, 'AriaNext']) {
    test(`Setting ariaNextLabel to ${ariaNextLabel}`, async ({ testHarness }) => {
      await testHarness.setField('ariaNextLabel', ariaNextLabel);

      await testHarness.waitForNextFrame();

      const paginationHtml = await testHarness.getPaginationHtml();

      expect(paginationHtml).toMatchSnapshot();
    });
  }

  for (const ariaCurrentAttr of [undefined, true]) {
    test(`Setting ariaCurrentAttr to ${ariaCurrentAttr}`, async ({
      testHarness,
    }) => {
      await testHarness.setField('ariaCurrentAttr', ariaCurrentAttr);

      await testHarness.waitForNextFrame();

      const paginationHtml = await testHarness.getPaginationHtml();

      expect(paginationHtml).toMatchSnapshot();
    });
  }
});

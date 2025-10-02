import { test as base, expect } from '@playwright/test';
import { TestHarnessPage } from './test-harness-page';

const testCssClasses = ['', 'add-margin-padding', 'add-margin-padding,content-box'];

const testWidths = [
  1000, 900, 800, 700, 600, 500, 400, 300, 200, 100, 250, 350, 450, 550, 650, 750,
  850, 950,
];

const test = base.extend<{
  testHarness: TestHarnessPage;
}>({
  testHarness: async ({ page }, use) => {
    const testHarness = new TestHarnessPage(page, { throwOnError: true });

    await use(testHarness);
  },
});

for (const cssClasses of testCssClasses) {
  test.describe(`Auto sizing with classes ${cssClasses}`, () => {
    test.beforeEach(async ({ testHarness }) => {
      await testHarness.goto({ css: cssClasses });

      await testHarness.setField('total', 100);
    });

    for (const width of testWidths) {
      test(`renders correctly with viewport ${width}px`, async ({
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
}

test.describe('Auto sizing after total change', () => {
  test.beforeEach(async ({ testHarness }) => {
    await testHarness.goto();

    await testHarness.setField('total', 100);
  });

  for (const width of testWidths) {
    test(`renders correctly with viewport width ${width}px after total change`, async ({
      page,
      testHarness,
    }) => {
      await testHarness.setField('total', 200);

      await testHarness.waitForNextFrame();

      await page.setViewportSize({ width, height: 700 });

      await testHarness.waitForNextFrame();

      const paginationHtml = await page.$eval('ul.pagination', ul => ul.outerHTML);

      expect(paginationHtml).toMatchSnapshot();
    });
  }
});

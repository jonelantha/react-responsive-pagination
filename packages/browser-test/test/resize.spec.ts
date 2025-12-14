import { test as baseTest, expect } from '@playwright/test';
import { serialTestFixture } from './test-harness-page.ts';

const testCssClasses = [
  '',
  'add-margin-padding',
  'add-margin-padding,content-box',
  'gap',
  'gap,add-margin-padding',
];

const testWidths = [
  1000, 900, 800, 700, 600, 500, 400, 300, 200, 100, 250, 350, 450, 550, 650, 750,
  850, 950,
];

for (const cssClasses of testCssClasses) {
  baseTest.describe(`Auto sizing with classes ${cssClasses}`, () => {
    baseTest.describe.configure({ mode: 'serial' });

    const test = serialTestFixture();

    test.beforeAll(async ({ testHarness }) => {
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

baseTest.describe('Auto sizing after total change', () => {
  baseTest.describe.configure({ mode: 'serial' });

  const test = serialTestFixture();

  test.beforeAll(async ({ testHarness }) => {
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

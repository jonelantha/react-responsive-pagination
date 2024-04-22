import { TestHarnessPage } from './test-harness-page';

const testHarness = new TestHarnessPage(page, { throwOnError: true });

beforeAll(async () => {
  await testHarness.goto();

  await page.setViewportSize({ width: 500, height: 700 });

  await testHarness.setField('total', 100);

  await testHarness.setField('current', 50);
});

describe('Pagination style change detection', () => {
  test.each([['inherit'], ['24px'], ['40px'], ['inherit']])(
    'adapts correctly when font-size changed to %p',
    async fontSize => {
      await testHarness.editableStyleBlockLocator().evaluate((styleBlock, style) => {
        styleBlock.innerHTML = style;
      }, `.pagination { font-size: ${fontSize}; }`);

      await testHarness.waitForNextFrame();

      const paginationHtml = await page.$eval('ul.pagination', ul => ul.outerHTML);

      expect(paginationHtml).toMatchSnapshot();
    },
  );

  // TODO - test style change triggered within React events
});

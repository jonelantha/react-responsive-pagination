import { setupThrowOnError } from './helper';

beforeAll(async () => {
  setupThrowOnError(page);

  await page.goto(harnessUrl);

  await page.setViewportSize({ width: 500, height: 700 });

  await page.fill('#totalAsJson', '100');

  await page.fill('#currentPageAsJson', '50');
});

describe('Pagination style change detection', () => {
  test.each([['inherit'], ['24px'], ['40px'], ['inherit']])(
    'adapts correctly when font-size changed to %p',
    async fontSize => {
      await page.$eval(
        '#editable-style-block',
        (styleBlock, style) => {
          styleBlock.innerHTML = style;
        },
        `.pagination { font-size: ${fontSize}; }`,
      );

      await page.evaluate(() => new Promise(requestAnimationFrame));

      const paginationHtml = await page.$eval('ul.pagination', ul => ul.outerHTML);

      expect(paginationHtml).toMatchSnapshot();
    },
  );

  // TODO - test style change triggered within React events
});

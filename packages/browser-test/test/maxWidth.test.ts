import { setupThrowOnError } from './helper';

beforeAll(async () => {
  setupThrowOnError(page);

  await page.goto(harnessUrl);

  await page.setViewportSize({ width: 600, height: 700 });

  await page.fill('#totalAsJson', '100');
});

describe('Pagination maxWidth', () => {
  test.each([[null], [400], [250], [null]])(
    'renders correctly with maxWidth of %p',
    async width => {
      await page.fill('#maxWidthAsJson', (width && width.toString()) || '');

      await page.evaluate(() => new Promise(requestAnimationFrame));

      const paginationHtml = await page.$eval('ul.pagination', ul => ul.innerHTML);

      expect(paginationHtml).toMatchSnapshot();
    },
  );
});

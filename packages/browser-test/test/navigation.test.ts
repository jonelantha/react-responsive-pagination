import { setupThrowOnError } from './helper';

beforeAll(async () => {
  setupThrowOnError(page, { ignoreInvalidPropTypes: true });

  await page.goto(harnessUrl);

  await page.setViewportSize({ width: 500, height: 700 });
});

describe('Pagination navigation', () => {
  beforeAll(async () => {
    await page.fill('#totalAsJson', '100');
  });

  test.each([
    ['»', 2],
    ['»', 3],
    ['100', 100],
    ['«', 99],
    ['93', 93],
  ])(
    'clicking %s renders correctly and sets current page to %i',
    async (linkToClick, expectedCurrentPage) => {
      await page.click(`text="${linkToClick}"`);

      const paginationHtml = await page.$eval('ul.pagination', ul => ul.innerHTML);

      expect(paginationHtml).toMatchSnapshot();

      const currentPageInput = await page.$('#currentPageAsJson');
      await expect(currentPageInput).toEqualValue(expectedCurrentPage.toString());

      // url should be unchanged; don't add a # to the url after clicking
      const currentUrl = page.url();
      await expect(currentUrl).toBe(harnessUrl);
    },
  );

  test.each([[2], [5], [-1], [101], [null], [''], ['3']])(
    'setting current page programatically to %p renders correctly',
    async programmaticCurrentPage => {
      await page.fill('#currentPageAsJson', JSON.stringify(programmaticCurrentPage));

      const paginationHtml = await page.$eval('ul.pagination', ul => ul.innerHTML);
      expect(paginationHtml).toMatchSnapshot();
    },
  );
});

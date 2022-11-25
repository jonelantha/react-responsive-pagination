import { setupThrowOnError, stringifyWithUndefined } from './helper';

beforeAll(async () => {
  setupThrowOnError(page);

  await page.goto(`${harnessUrl}bootstrap4`);

  await page.setViewportSize({ width: 700, height: 700 });
});

describe('linkHref', () => {
  test.each([undefined, 'hash', 'omit'].map(linkHref => [linkHref]))(
    'Setting linkHref to %p',
    async previousLabel => {
      await page.fill('#linkHrefAsJson', stringifyWithUndefined(previousLabel));

      await page.evaluate(() => new Promise(requestAnimationFrame));

      const paginationHtml = await page.$eval('ul.pagination', ul => ul.outerHTML);

      expect(paginationHtml).toMatchSnapshot();
    },
  );
});

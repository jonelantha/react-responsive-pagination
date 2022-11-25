import { setupThrowOnError, stringifyWithUndefined } from './helper';

beforeAll(async () => {
  setupThrowOnError(page);

  await page.goto(`${harnessUrl}bootstrap4`);

  await page.setViewportSize({ width: 700, height: 700 });
});

describe('linkHref', () => {
  beforeEach(async () => {
    await page.fill('#linkHrefAsJson', 'undefined');
  });

  test.each([undefined, 'hash', 'omit'].map(linkHref => [linkHref]))(
    'Setting linkHref to %p',
    async previousLabel => {
      await page.fill('#linkHrefAsJson', stringifyWithUndefined(previousLabel));

      const paginationHtml = await page.$eval('ul.pagination', ul => ul.outerHTML);

      expect(paginationHtml).toMatchSnapshot();
    },
  );
});

import { setupThrowOnError, stringifyWithUndefined } from './helper';

beforeAll(async () => {
  setupThrowOnError(page);

  await page.goto(`${harnessUrl}bootstrap4`);

  await page.setViewportSize({ width: 700, height: 700 });
});

describe('renderNav', () => {
  test.each([undefined, false, true].map(linkHref => [linkHref]))(
    'Setting renderNav to %p',
    async previousLabel => {
      await page.fill('#renderNavAsJson', stringifyWithUndefined(previousLabel));

      const paginationHtml = await page.$eval('ul.pagination', ul => ul.outerHTML);

      expect(paginationHtml).toMatchSnapshot();
    },
  );
});

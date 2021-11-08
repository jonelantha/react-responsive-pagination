import { setupThrowOnError, stringifyWithUndefined } from './helper';

beforeAll(async () => {
  setupThrowOnError(page);

  await page.goto(harnessUrl);

  await page.setViewportSize({ width: 700, height: 700 });
});

describe('Options', () => {
  beforeEach(async () => {
    await page.fill('#previousLabelAsJson', 'undefined');

    await page.fill('#nextLabelAsJson', 'undefined');
  });

  test.each([undefined, '<', 'Previous'].map(previousLabel => [previousLabel]))(
    'Setting previousLabel to %p',
    async previousLabel => {
      await page.fill('#previousLabelAsJson', stringifyWithUndefined(previousLabel));

      const paginationHtml = await page.$eval('ul.pagination', ul => ul.outerHTML);

      expect(paginationHtml).toMatchSnapshot();
    },
  );

  test.each([undefined, '>', 'Next'].map(nextLabel => [nextLabel]))(
    'Setting nextLabel to %p',
    async nextLabel => {
      await page.fill('#nextLabelAsJson', stringifyWithUndefined(nextLabel));

      const paginationHtml = await page.$eval('ul.pagination', ul => ul.outerHTML);

      expect(paginationHtml).toMatchSnapshot();
    },
  );
});

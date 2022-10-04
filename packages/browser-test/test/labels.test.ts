import { setupThrowOnError, stringifyWithUndefined } from './helper';

beforeAll(async () => {
  setupThrowOnError(page);

  await page.goto(`${harnessUrl}bootstrap4`);

  await page.setViewportSize({ width: 700, height: 700 });
});

describe('Labels', () => {
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

  test.each([undefined, 'active', ''].map(a11yActiveLabel => [a11yActiveLabel]))(
    'Setting a11yActiveLabel to %p',
    async a11yActiveLabel => {
      await page.fill(
        '#a11yActiveLabelAsJson',
        stringifyWithUndefined(a11yActiveLabel),
      );

      const paginationHtml = await page.$eval('ul.pagination', ul => ul.outerHTML);

      expect(paginationHtml).toMatchSnapshot();
    },
  );

  test.each([undefined, true].map(ariaCurrentAttr => [ariaCurrentAttr]))(
    'Setting ariaCurrentAttr to %p',
    async ariaCurrentAttr => {
      await page.fill(
        '#ariaCurrentAttrAsJson',
        stringifyWithUndefined(ariaCurrentAttr),
      );

      const paginationHtml = await page.$eval('ul.pagination', ul => ul.outerHTML);

      expect(paginationHtml).toMatchSnapshot();
    },
  );
});

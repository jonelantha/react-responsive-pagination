import { setupThrowOnError, stringifyWithUndefined } from './helper';

beforeAll(async () => {
  setupThrowOnError(page);

  await page.goto(`${harnessUrl}bootstrap4`);

  await page.setViewportSize({ width: 700, height: 700 });
});

describe('Label Behaviour', () => {
  beforeEach(async () => {
    await page.fill('#labelBehaviourAsJson', JSON.stringify('srOnlySpanLabel'));
    await page.fill('#srOnlyClassNameAsJson', 'undefined');
    await page.fill('#a11yActiveLabelAsJson', 'undefined');
  });

  test.each([undefined, 'active'].map(a11yActiveLabel => [a11yActiveLabel]))(
    'Setting a11yActiveLabel to %p',
    async a11yActiveLabel => {
      await page.fill(
        '#a11yActiveLabelAsJson',
        stringifyWithUndefined(a11yActiveLabel),
      );

      await page.evaluate(() => new Promise(requestAnimationFrame));

      const paginationHtml = await page.$eval('ul.pagination', ul => ul.outerHTML);

      expect(paginationHtml).toMatchSnapshot();
    },
  );

  test.each([undefined, 'alt-sr-only'].map(a11yActiveLabel => [a11yActiveLabel]))(
    'Setting srOnlyClassName to %p',
    async a11yActiveLabel => {
      await page.fill(
        '#srOnlyClassNameAsJson',
        stringifyWithUndefined(a11yActiveLabel),
      );

      await page.evaluate(() => new Promise(requestAnimationFrame));

      const paginationHtml = await page.$eval('ul.pagination', ul => ul.outerHTML);

      expect(paginationHtml).toMatchSnapshot();
    },
  );
});

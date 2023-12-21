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
    await page.fill('#ariaPreviousLabelAsJson', 'undefined');
    await page.fill('#ariaNextLabelAsJson', 'undefined');
    await page.fill('#ariaCurrentAttrAsJson', 'undefined');
  });

  test.each(
    [undefined, '<', 'Previous', '<PreviousLabel />'].map(previousLabel => [
      previousLabel,
    ]),
  )('Setting previousLabel to %p', async previousLabel => {
    await page.fill('#previousLabelAsJson', stringifyWithUndefined(previousLabel));

    await page.evaluate(() => new Promise(requestAnimationFrame));

    const paginationHtml = await page.$eval('ul.pagination', ul => ul.outerHTML);

    expect(paginationHtml).toMatchSnapshot();
  });

  test.each([undefined, '>', 'Next', '<NextLabel />'].map(nextLabel => [nextLabel]))(
    'Setting nextLabel to %p',
    async nextLabel => {
      await page.fill('#nextLabelAsJson', stringifyWithUndefined(nextLabel));

      await page.evaluate(() => new Promise(requestAnimationFrame));

      const paginationHtml = await page.$eval('ul.pagination', ul => ul.outerHTML);

      expect(paginationHtml).toMatchSnapshot();
    },
  );

  test.each(
    [undefined, 'AriaPrevious'].map(ariaPreviousLabel => [ariaPreviousLabel]),
  )('Setting ariaPreviousLabel to %p', async ariaPreviousLabel => {
    await page.fill(
      '#ariaPreviousLabelAsJson',
      stringifyWithUndefined(ariaPreviousLabel),
    );

    await page.evaluate(() => new Promise(requestAnimationFrame));

    const paginationHtml = await page.$eval('ul.pagination', ul => ul.outerHTML);

    expect(paginationHtml).toMatchSnapshot();
  });

  test.each([undefined, 'AriaNext'].map(ariaNextLabel => [ariaNextLabel]))(
    'Setting ariaNextLabel to %p',
    async ariaNextLabel => {
      await page.fill('#ariaNextLabelAsJson', stringifyWithUndefined(ariaNextLabel));

      await page.evaluate(() => new Promise(requestAnimationFrame));

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

      await page.evaluate(() => new Promise(requestAnimationFrame));

      const paginationHtml = await page.$eval('ul.pagination', ul => ul.outerHTML);

      expect(paginationHtml).toMatchSnapshot();
    },
  );
});

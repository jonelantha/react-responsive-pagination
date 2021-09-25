import { setupThrowOnError, stringifyWithUndefined } from './helper';

beforeAll(async () => {
  setupThrowOnError(page);

  await page.goto(harnessUrl);
});

describe('Setting extraClassName', () => {
  test.each([
    [undefined, 'pagination justify-content-center'],
    ['', 'pagination'],
    ['justify-content-start', 'pagination justify-content-start'],
  ])('will have expected class', async (extraClassProp, expectedFullClass) => {
    await page.fill('#extraClassNameAsJson', stringifyWithUndefined(extraClassProp));

    const pagination = await page.waitForSelector('ul.pagination');

    const fullClass = await pagination.getAttribute('class');

    expect(fullClass).toBe(expectedFullClass);
  });
});

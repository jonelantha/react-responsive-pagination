import { setupThrowOnError, stringifyWithUndefined } from './helper';

beforeAll(async () => {
  setupThrowOnError(page);

  await page.goto(`${harnessUrl}bootstrap4`);

  await page.setViewportSize({ width: 700, height: 700 });
});

beforeEach(async () => {
  await page.fill('#classNameAsJson', 'undefined');
  await page.fill('#extraClassNameAsJson', 'undefined');
  await page.fill('#pageItemClassNameAsJson', 'undefined');
  await page.fill('#pageLinkClassNameAsJson', 'undefined');
  await page.fill('#activeItemClassNameAsJson', 'undefined');
  await page.fill('#disabledItemClassNameAsJson', 'undefined');
  await page.fill('#navClassNameAsJson', 'undefined');
  await page.fill('#previousClassNameAsJson', 'undefined');
  await page.fill('#nextClassNameAsJson', 'undefined');
});

describe('Setting extraClassName', () => {
  test.each([
    [undefined, 'pagination justify-content-center'],
    ['', 'pagination'],
    ['justify-content-start', 'pagination justify-content-start'],
  ])('will have expected class', async (extraClassProp, expectedFullClass) => {
    await page.fill('#extraClassNameAsJson', stringifyWithUndefined(extraClassProp));

    await page.evaluate(() => new Promise(requestAnimationFrame));

    const pagination = await page.waitForSelector('ul.pagination');

    const fullClass = await pagination.getAttribute('class');

    expect(fullClass).toBe(expectedFullClass);
  });
});

describe('classNames', () => {
  test.each([
    ['className', 'alt-pagination'],
    ['pageItemClassName', 'alt-page-item'],
    ['pageLinkClassName', 'alt-page-link'],
    ['activeItemClassName', 'alt-active'],
    ['disabledItemClassName', 'alt-disabled'],
  ])('setting %p to %p renders correctly', async (field, value) => {
    await page.fill(`#${field}AsJson`, JSON.stringify(value));

    await page.evaluate(() => new Promise(requestAnimationFrame));

    const paginationHtml = await page.$eval('ul', ul => ul.outerHTML);
    expect(paginationHtml).toMatchSnapshot();
  });
});

describe('nav classNames', () => {
  describe.each([{ navEnabled: true }, { navEnabled: false }])(
    'with navEnabled = $navEnabled',
    ({ navEnabled }) => {
      beforeAll(async () => {
        if (navEnabled) {
          await page.fill('#totalAsJson', JSON.stringify(10));
          await page.fill('#currentAsJson', JSON.stringify(3));
        } else {
          await page.fill('#totalAsJson', JSON.stringify(1));
        }
      });

      test.each([
        { nav: undefined, previous: undefined, next: undefined },
        { nav: undefined, previous: 'previous', next: 'next' },
        { nav: 'nav', previous: undefined, next: undefined },
        { nav: 'nav', previous: 'previous', next: 'next' },
      ])(
        'setting navClassName=$nav, previousClassName=$previous, nextClassName=$next renders correctly',
        async ({ nav, previous, next }) => {
          await page.fill(`#navClassNameAsJson`, stringifyWithUndefined(nav));
          await page.fill(
            `#previousClassNameAsJson`,
            stringifyWithUndefined(previous),
          );
          await page.fill(`#nextClassNameAsJson`, stringifyWithUndefined(next));

          await page.evaluate(() => new Promise(requestAnimationFrame));

          const paginationHtml = await page.$eval('ul', ul => ul.outerHTML);
          expect(paginationHtml).toMatchSnapshot();
        },
      );
    },
  );
});

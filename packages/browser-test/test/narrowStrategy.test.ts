import { setupThrowOnError, stringifyWithUndefined } from './helper';

beforeAll(() => {
  setupThrowOnError(page);
});

const testWidths = [150, 200, 250];

const narrowStrategies = [
  undefined,
  'dropNav',
  'dropEllipsis',
  ['dropNav', 'dropEllipsis'],
  ['dropEllipsis', 'dropNav'],
];

describe.each(narrowStrategies.map(narrowStrategy => [narrowStrategy]))(
  'Auto sizing with narrowStrategy %p',
  narrowStrategy => {
    beforeAll(async () => {
      await page.goto('about:blank');

      await page.goto(`${harnessUrl}bootstrap4`);

      await page.fill(
        '#narrowStrategyAsJson',
        stringifyWithUndefined(narrowStrategy),
      );

      await page.fill('#totalAsJson', '100');
    });

    test.each(testWidths.map(width => [width]))(
      'renders correctly with viewport width %ipx',
      async width => {
        await page.setViewportSize({ width, height: 700 });

        await page.evaluate(() => new Promise(requestAnimationFrame));

        const paginationHtml = await page.$eval('ul.pagination', ul => ul.outerHTML);

        expect(paginationHtml).toMatchSnapshot();
      },
    );
  },
);

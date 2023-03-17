import { setupThrowOnError, stringifyWithUndefined } from './helper';

beforeAll(() => {
  setupThrowOnError(page);
});

const testWidths = [150, 200, 250];

const narrowBehaviours = [
  undefined,
  'dropNav',
  'dropEllipsis',
  'dropNavThenEllipsis',
  'dropEllipsisThenNav',
];

describe.each(narrowBehaviours)(
  'Auto sizing with narrowBehaviour %p',
  narrowBehaviour => {
    beforeAll(async () => {
      await page.goto('about:blank');

      await page.goto(`${harnessUrl}bootstrap4`);

      await page.fill(
        '#narrowBehaviourNameAsJson',
        stringifyWithUndefined(narrowBehaviour),
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

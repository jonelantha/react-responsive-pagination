import { setupThrowOnError } from './helper';

beforeAll(async () => {
  setupThrowOnError(page);

  await page.goto(`${harnessUrl}bootstrap5`);

  await page.setViewportSize({ width: 700, height: 700 });

  await page.check('#preset_bootstrap5');
});

const testWidths = [
  1000, 900, 800, 700, 600, 500, 400, 300, 200, 100, 250, 350, 450, 550, 650, 750,
  850, 950,
];

describe('Bootstrap 5 preset', () => {
  test.each(testWidths.map(width => [width]))(
    'renders correctly with viewport width %ipx',
    async width => {
      await page.setViewportSize({ width, height: 700 });

      await page.evaluate(() => new Promise(requestAnimationFrame));

      const paginationHtml = await page.$eval('ul.pagination', ul => ul.outerHTML);

      expect(paginationHtml).toMatchSnapshot();
    },
  );
});

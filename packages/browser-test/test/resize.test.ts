export {};

const testCssClasses = ['', 'add-margin-padding', 'add-margin-padding,content-box'];

// prettier-ignore
const testWidths = [
  1000, 900, 800, 700, 600, 500, 400, 300, 200, 100,
  250, 350, 450, 550, 650, 750, 850, 950,
];

describe.each(testCssClasses.map(cssClasses => [cssClasses]))(
  'Auto sizing with %p classes',
  cssClasses => {
    beforeAll(async () => {
      await page.goto(`${harnessUrl}?css=${cssClasses}`);

      await page.fill('#totalAsJson', '100');
    });

    test.each(testWidths.map(width => [width]))(
      'renders correctly with viewport width %ipx',
      async width => {
        await page.setViewportSize({ width, height: 700 });

        await page.evaluate(() => new Promise(requestAnimationFrame));

        const paginationHtml = await page.$eval('ul.pagination', ul => ul.innerHTML);

        expect(paginationHtml).toMatchSnapshot();
      },
    );
  },
);

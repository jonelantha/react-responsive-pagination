import { TestHarnessPage } from './test-harness-page';

const testHarness = new TestHarnessPage(page, { throwOnError: true });

const testCssClasses = ['', 'add-margin-padding', 'add-margin-padding,content-box'];

const testWidths = [
  1000, 900, 800, 700, 600, 500, 400, 300, 200, 100, 250, 350, 450, 550, 650, 750,
  850, 950,
];

describe.each(testCssClasses.map(cssClasses => [cssClasses]))(
  'Auto sizing with %p classes',
  cssClasses => {
    beforeAll(async () => {
      await testHarness.goto({ css: cssClasses });

      await testHarness.setField('total', 100);
    });

    test.each(testWidths.map(width => [width]))(
      'renders correctly with viewport width %ipx',
      async width => {
        await page.setViewportSize({ width, height: 700 });

        await testHarness.waitForNextFrame();

        const paginationHtml = await testHarness.getPaginationHtml();

        expect(paginationHtml).toMatchSnapshot();
      },
    );
  },
);

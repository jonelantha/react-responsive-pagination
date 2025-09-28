import { TestHarnessPage } from './test-harness-page';

const testHarness = new TestHarnessPage(page, { throwOnError: true });

beforeAll(async () => {
  await testHarness.goto();

  await page.setViewportSize({ width: 600, height: 700 });

  await testHarness.setField('total', 100);
});

describe('Pagination maxWidth', () => {
  test.each([[undefined], [400], [250], [undefined]])(
    'renders correctly with maxWidth of %p',
    async width => {
      await testHarness.setField('maxWidth', width);

      await testHarness.waitForNextFrame();

      const paginationHtml = await testHarness.getPaginationHtml();

      expect(paginationHtml).toMatchSnapshot();
    },
  );
});

import { TestHarnessPage } from './test-harness-page';

const testHarness = new TestHarnessPage(page, { throwOnError: true });

beforeAll(async () => {
  await testHarness.goto();

  await page.setViewportSize({ width: 500, height: 700 });

  await testHarness.setField('total', 100);

  await testHarness.setField('current', 50);

  await testHarness.resetStyle();

  await testHarness.waitForNextFrame();
});

describe('Pagination style change detection', () => {
  test.each([['inherit'], ['24px'], ['40px'], ['inherit']])(
    'adapts correctly when font-size changed to %p',
    async fontSize => {
      await testHarness.setStyle(`.pagination { font-size: ${fontSize}; }`);

      await testHarness.waitForNextFrame();

      const paginationHtml = await testHarness.getPaginationHtml();

      expect(paginationHtml).toMatchSnapshot();
    },
  );

  test('adapts correctly when font-size and width changed at the same time', async () => {
    await testHarness.setStyle(
      '#paginationParent { width: 400px; } .pagination { font-size: 8px; }',
    );

    await testHarness.waitForNextFrame();

    const paginationHtml = await testHarness.getPaginationHtml();

    expect(paginationHtml).toMatchSnapshot();
  });

  test('adapts correctly when style is changed within a react render', async () => {
    await testHarness.setField('parentClassName', 'add-margin-padding');

    await testHarness.waitForNextFrame();

    const paginationHtml = await testHarness.getPaginationHtml();

    expect(paginationHtml).toMatchSnapshot();
  });
});

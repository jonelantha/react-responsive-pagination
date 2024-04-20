import { TestHarnessPage } from './test-harness-page';

const testHarness = new TestHarnessPage(page, { throwOnError: true });

beforeAll(async () => {
  await testHarness.setupEndOfFramePromise();

  await testHarness.goto({ notStrict: true });

  await page.setViewportSize({ width: 700, height: 700 });
});

describe('Initial appearance', () => {
  beforeEach(async () => {
    await testHarness.hidePagination();

    await testHarness.paginationLocator().waitFor({ state: 'detached' });
  });

  test('does not cause excessive react renders', async () => {
    await testHarness.resetRenderCount();

    await testHarness.showPagination();

    testHarness.paginationLocator().waitFor({ state: 'visible' });

    const numberOfRenders = await testHarness.getRenderCount();

    expect(numberOfRenders).toBe(4);
  });

  test('renders fully before repaint', async () => {
    const snapshot = await page.evaluate(async () => {
      document.getElementById('renderPagination')!.click();

      await window.endOfFramePromise();

      return document.querySelector('ul.pagination')?.innerHTML;
    });

    await expect(snapshot).toMatchSnapshot();
  });
});

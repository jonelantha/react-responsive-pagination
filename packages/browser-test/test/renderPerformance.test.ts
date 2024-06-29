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

describe('Style change', () => {
  beforeEach(async () => {
    await testHarness.setStyle('.pagination { font-size: inherit; }');
  });

  test('does not cause excessive react renders', async () => {
    await testHarness.resetRenderCount();

    await testHarness.setStyle('.pagination { font-size: 40px; }');

    await testHarness.waitForNextFrame();

    await expect(page).toHaveSelectorCount('ul > *', 13);

    const numberOfRenders = await testHarness.getRenderCount();

    expect(numberOfRenders).toBe(3);
  });

  test('renders fully before repaint', async () => {
    const numberOfElements = await page.evaluate(async () => {
      document.getElementById('editable-style-block')!.innerHTML =
        '.pagination { font-size: 40px; }';

      await window.endOfFramePromise();

      return document.querySelector('ul.pagination')?.children.length;
    });

    await expect(numberOfElements).toBe(13);
  });
});

describe('Resize', () => {
  beforeEach(async () => {
    await page.evaluate(async () => {
      document.getElementById('paginationParent')!.style.width = '';
    });
  });

  test('does not cause excessive react renders', async () => {
    await testHarness.resetRenderCount();

    await page.setViewportSize({ width: 500, height: 700 });

    await testHarness.waitForNextFrame();

    await expect(page).toHaveSelectorCount('ul > *', 9);

    const numberOfRenders = await testHarness.getRenderCount();

    expect(numberOfRenders).toBe(1);
  });

  test('renders fully before repaint', async () => {
    const numberOfElements = await page.evaluate(async () => {
      document.getElementById('paginationParent')!.style.width = '500px';

      await window.endOfFramePromise();

      return document.querySelector('ul.pagination')?.children.length;
    });

    await expect(numberOfElements).toBe(9);
  });
});

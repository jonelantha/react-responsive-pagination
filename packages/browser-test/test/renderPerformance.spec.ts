import { test as base, expect } from '@playwright/test';
import { TestHarnessPage } from './test-harness-page';

const test = base.extend<{
  testHarness: TestHarnessPage;
}>({
  testHarness: async ({ page }, use) => {
    const testHarness = new TestHarnessPage(page, { throwOnError: true });

    await testHarness.setupEndOfFramePromise();

    await testHarness.goto({ notStrict: true });

    await page.setViewportSize({ width: 700, height: 700 });

    await use(testHarness);
  },
});

test.describe('Initial appearance', () => {
  test.beforeEach(async ({ testHarness }) => {
    await testHarness.hidePagination();

    await testHarness.paginationLocator().waitFor({ state: 'detached' });
  });

  test('does not cause excessive react renders', async ({ testHarness }) => {
    await testHarness.resetRenderCount();

    await testHarness.showPagination();

    await testHarness.paginationLocator().waitFor({ state: 'visible' });

    const numberOfRenders = await testHarness.getRenderCount();

    expect(numberOfRenders).toBe(5);
  });

  test('renders fully before repaint', async ({ page }) => {
    const snapshot = await page.evaluate(async () => {
      document.getElementById('renderPagination')!.click();

      await window.endOfFramePromise();

      return document.querySelector('ul.pagination')?.innerHTML;
    });

    expect(snapshot).toMatchSnapshot();
  });
});

test.describe('Style change', () => {
  test.beforeEach(async ({ testHarness }) => {
    await testHarness.setStyle('.pagination { font-size: inherit; }');
  });

  test('does not cause excessive react renders', async ({ page, testHarness }) => {
    await testHarness.resetRenderCount();

    await testHarness.setStyle('.pagination { font-size: 40px; }');

    await testHarness.waitForNextFrame();

    await expect(page.locator('ul > *')).toHaveCount(13);

    const numberOfRenders = await testHarness.getRenderCount();

    expect(numberOfRenders).toBe(3);
  });

  test('renders fully before repaint', async ({ page }) => {
    const numberOfElements = await page.evaluate(async () => {
      document.getElementById('editable-style-block')!.innerHTML =
        '.pagination { font-size: 40px; }';

      await window.endOfFramePromise();

      return document.querySelector('ul.pagination')?.children.length;
    });

    expect(numberOfElements).toBe(13);
  });
});

test.describe('Resize', () => {
  test.beforeEach(async ({ page, testHarness }) => {
    await testHarness.setStyle('.pagination { font-size: 40px; }');

    await page.evaluate(async () => {
      document.getElementById('paginationParent')!.style.width = '';
    });
  });

  test('does not cause excessive react renders', async ({ page, testHarness }) => {
    await testHarness.resetRenderCount();

    await page.setViewportSize({ width: 500, height: 700 });

    await testHarness.waitForNextFrame();

    await expect(page.locator('ul > *')).toHaveCount(9);

    const numberOfRenders = await testHarness.getRenderCount();

    expect(numberOfRenders).toBe(1);
  });

  test('renders fully before repaint', async ({ page }) => {
    const numberOfElements = await page.evaluate(async () => {
      document.getElementById('paginationParent')!.style.width = '500px';

      await window.endOfFramePromise();

      return document.querySelector('ul.pagination')?.children.length;
    });

    expect(numberOfElements).toBe(9);
  });
});

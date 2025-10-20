import { Browser, Page } from 'playwright';
import { setupThrowOnError, stringifyWithUndefined } from './helper.ts';
import { URLSearchParams } from 'url';
import { test } from '@playwright/test';

import '../../test-harness-lib/src/window.d.ts';

export class TestHarnessPage {
  page: Page;

  constructor(
    page: Page,
    options?: { throwOnError?: true | { ignoreInvalidPropTypes: true } },
  ) {
    this.page = page;

    if (options?.throwOnError) {
      const throwOnErrorOptions =
        options.throwOnError !== true ? options.throwOnError : undefined;
      setupThrowOnError(page, throwOnErrorOptions);
    }
  }

  setupEndOfFramePromise() {
    return this.page.addInitScript(() => {
      window.endOfFramePromise = () =>
        new Promise<void>(resolve => {
          const resizeObserver = new ResizeObserver(() => {
            resizeObserver.disconnect();
            resolve();
          });

          resizeObserver.observe(document.body);
        });
    });
  }

  async goto(options?: { framework?: string; css?: string; notStrict?: boolean }) {
    const query = new URLSearchParams({
      ...(options?.css && { css: options?.css }),
      ...(options?.notStrict && { notStrict: '1' }),
    });

    const framework = options?.framework || 'bootstrap4';

    await this.page.goto(`/${framework}?${query.toString()}`);
  }

  async setField(field: string, value: any) {
    await this.page.locator(`#${field}AsJson`).fill(stringifyWithUndefined(value));
  }

  async getField(field: string) {
    return await this.page.locator(`#${field}AsJson`).inputValue();
  }

  async getPaginationHtml() {
    return await this.page.locator('#paginationParent').innerHTML();
  }

  paginationLocator() {
    return this.page.locator('#paginationParent > ul');
  }

  editableStyleBlockLocator() {
    return this.page.locator('#editable-style-block');
  }

  async setStyle(styleStr: string) {
    await this.editableStyleBlockLocator().evaluate((styleBlock, style) => {
      styleBlock.innerHTML = style;
    }, styleStr);
  }

  presetLocator(type: string) {
    return this.page.locator(`#preset_${type}`);
  }

  async waitForNextFrame() {
    await this.page.evaluate(() => new Promise(requestAnimationFrame));
  }

  async resetRenderCount() {
    await this.page.evaluate(() => window.resetRenderCount());
  }

  async getRenderCount() {
    return await this.page.evaluate(() => window.getRenderCount());
  }

  async hidePagination() {
    await this.page.locator('#renderPagination').uncheck();
  }

  async showPagination() {
    await this.page.locator('#renderPagination').check();
  }
}

declare global {
  interface Window {
    endOfFramePromise: () => Promise<void>;
  }
}

async function createGlobalTestHarness(browser: Browser) {
  const context = await browser.newContext();

  const page = await context.newPage();

  return new TestHarnessPage(page, { throwOnError: true });
}

export function serialTestFixture() {
  let globalTestHarness: TestHarnessPage | undefined;

  return test.extend<{ testHarness: TestHarnessPage }>({
    testHarness: async ({ browser }, use) => {
      globalTestHarness ??= await createGlobalTestHarness(browser);

      await use(globalTestHarness);
    },

    page: async ({ browser }, use) => {
      globalTestHarness ??= await createGlobalTestHarness(browser);

      await use(globalTestHarness.page);
    },
  });
}

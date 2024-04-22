import { Page } from 'playwright';
import { setupThrowOnError, stringifyWithUndefined } from './helper';
import { URLSearchParams } from 'url';

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

  async goto(options?: { css: string }) {
    const query = new URLSearchParams({
      ...(options?.css && { css: options?.css }),
    });

    await this.page.goto(`${harnessUrl}bootstrap4?${query.toString()}`);
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

  presetLocator(type: string) {
    return this.page.locator(`#preset_${type}`);
  }

  async waitForNextFrame() {
    await this.page.evaluate(() => new Promise(requestAnimationFrame));
  }
}

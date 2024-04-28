import { TestHarnessPage } from './test-harness-page';

const testHarness = new TestHarnessPage(page, {
  throwOnError: { ignoreInvalidPropTypes: true },
});

beforeAll(async () => {
  await testHarness.goto();

  await page.setViewportSize({ width: 500, height: 700 });
});

describe('Pagination total pages', () => {
  test.each([[''], [-1], [null]])(
    'will not show for invalid total value %p',
    async programmaticTotal => {
      await testHarness.setField('total', programmaticTotal);

      await expect(page).not.toHaveSelector('ul.pagination', {
        timeout: 200,
      });
    },
  );

  test.each([[1], [4], [6]])(
    'will show for valid total value %p',
    async programmaticTotal => {
      await testHarness.setField('total', programmaticTotal);

      await expect(page).toHaveSelector('ul.pagination');
    },
  );
});

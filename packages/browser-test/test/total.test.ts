import { setupThrowOnError } from './helper';

beforeAll(async () => {
  setupThrowOnError(page, { ignoreInvalidPropTypes: true });

  await page.goto(`${harnessUrl}bootstrap4`);

  await page.setViewportSize({ width: 500, height: 700 });
});

describe('Pagination total pages', () => {
  test.each([[''], [-1], [null]])(
    'will not show for invalid total value %p',
    async programmaticTotal => {
      await page.fill('#totalAsJson', JSON.stringify(programmaticTotal));

      await expect(page).not.toHaveSelector('ul.pagination', {
        timeout: 200,
      });
    },
  );

  test.each([[1], [4], [6]])(
    'will show for valid total value %p',
    async programmaticTotal => {
      await page.fill('#totalAsJson', JSON.stringify(programmaticTotal));

      await expect(page).toHaveSelector('ul.pagination');
    },
  );
});

import { TestHarnessPage } from './test-harness-page';

const testHarness = new TestHarnessPage(page, {
  throwOnError: { ignoreInvalidPropTypes: true },
});

beforeAll(async () => {
  await testHarness.goto();

  await page.setViewportSize({ width: 500, height: 700 });
});

describe('Pagination navigation', () => {
  beforeAll(async () => {
    await testHarness.setField('total', 100);
  });

  test.each([
    ['»', '2'],
    ['»', '3'],
    ['100', '100'],
    ['«', '99'],
    ['93', '93'],
  ])(
    'clicking %s renders correctly and sets current page to %i',
    async (linkToClick, expectedCurrent) => {
      await page.click(`text="${linkToClick}"`);

      const paginationHtml = await testHarness.getPaginationHtml();
      expect(paginationHtml).toMatchSnapshot();

      const current = await testHarness.getField('current');
      await expect(current).toBe(expectedCurrent);

      // url should be unchanged; don't add a # to the url after clicking
      const currentUrl = page.url();
      await expect(currentUrl).not.toContain('#');
    },
  );

  test.each([[2], [5], [-1], [101], [null], [''], ['3']])(
    'setting current page programatically to %p renders correctly',
    async programmaticCurrent => {
      await testHarness.setField('current', programmaticCurrent);

      const paginationHtml = await testHarness.getPaginationHtml();
      expect(paginationHtml).toMatchSnapshot();
    },
  );
});

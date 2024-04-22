import { TestHarnessPage } from './test-harness-page';

const testHarness = new TestHarnessPage(page, { throwOnError: true });

beforeAll(async () => {
  await testHarness.goto();

  await page.setViewportSize({ width: 700, height: 700 });
});

describe('renderNav', () => {
  test.each([undefined, false, true].map(linkHref => [linkHref]))(
    'Setting renderNav to %p',
    async previousLabel => {
      await testHarness.setField('renderNav', previousLabel);

      const paginationHtml = await testHarness.getPaginationHtml();

      expect(paginationHtml).toMatchSnapshot();
    },
  );
});

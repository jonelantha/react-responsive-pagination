import { TestHarnessPage } from './test-harness-page';

const testHarness = new TestHarnessPage(page, { throwOnError: true });

beforeAll(async () => {
  await testHarness.goto();

  await page.setViewportSize({ width: 700, height: 700 });
});

describe('linkHref', () => {
  test.each([undefined, 'hash', 'omit'].map(linkHref => [linkHref]))(
    'Setting linkHref to %p',
    async previousLabel => {
      await testHarness.setField('linkHref', previousLabel);

      await testHarness.waitForNextFrame();

      const paginationHtml = await testHarness.getPaginationHtml();

      expect(paginationHtml).toMatchSnapshot();
    },
  );

  test('Setting linkHref to a function', async () => {
    await testHarness.setField('linkHref', 'hrefTestFn()');

    await testHarness.waitForNextFrame();

    const paginationHtml = await testHarness.getPaginationHtml();

    expect(paginationHtml).toMatchSnapshot();
  });
});

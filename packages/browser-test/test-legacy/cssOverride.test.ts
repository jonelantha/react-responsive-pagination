import { TestHarnessPage } from './test-harness-page';

const testHarness = new TestHarnessPage(page, { throwOnError: true });

beforeAll(async () => {
  testHarness.goto();

  await page.setViewportSize({ width: 700, height: 700 });
});

describe('Style Override', () => {
  beforeEach(async () => {
    await testHarness.setField('previousClassName', undefined);
    await testHarness.setField('nextClassName', undefined);
  });

  test.each([
    ['previous-auto-margin', undefined],
    [undefined, 'next-auto-margin'],
    ['previous-auto-margin', 'next-auto-margin'],
    ['previous-auto-margin-large', undefined],
    ['previous-auto-margin-large', 'next-auto-margin-large'],
    [undefined, undefined],
  ])(
    'Setting override-margins to %p, %p',
    async (previousClassName, nextClassName) => {
      await testHarness.setField('previousClassName', previousClassName);
      await testHarness.setField('nextClassName', nextClassName);

      await testHarness.waitForNextFrame();

      const paginationHtml = await testHarness.getPaginationHtml();

      expect(paginationHtml).toMatchSnapshot();
    },
  );
});

import { TestHarnessPage } from './test-harness-page';

const testHarness = new TestHarnessPage(page, { throwOnError: true });

beforeAll(async () => {
  testHarness.goto();

  await page.setViewportSize({ width: 700, height: 700 });
});

describe('Label Behaviour', () => {
  beforeEach(async () => {
    await testHarness.setField('labelBehaviour', 'srOnlySpanLabel');
    await testHarness.setField('srOnlyClassName', undefined);
    await testHarness.setField('a11yActiveLabel', undefined);
  });

  test.each([undefined, 'active'].map(a11yActiveLabel => [a11yActiveLabel]))(
    'Setting a11yActiveLabel to %p',
    async a11yActiveLabel => {
      await testHarness.setField('a11yActiveLabel', a11yActiveLabel);

      await testHarness.waitForNextFrame();

      const paginationHtml = await testHarness.getPaginationHtml();

      expect(paginationHtml).toMatchSnapshot();
    },
  );

  test.each([undefined, 'alt-sr-only'].map(a11yActiveLabel => [a11yActiveLabel]))(
    'Setting srOnlyClassName to %p',
    async a11yActiveLabel => {
      await testHarness.setField('srOnlyClassName', a11yActiveLabel);

      await testHarness.waitForNextFrame();

      const paginationHtml = await testHarness.getPaginationHtml();

      expect(paginationHtml).toMatchSnapshot();
    },
  );
});

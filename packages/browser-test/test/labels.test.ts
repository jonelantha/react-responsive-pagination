import { TestHarnessPage } from './test-harness-page';

const testHarness = new TestHarnessPage(page, { throwOnError: true });

beforeAll(async () => {
  await testHarness.goto();

  await page.setViewportSize({ width: 700, height: 700 });
});

describe('Labels', () => {
  beforeEach(async () => {
    await testHarness.setField('previousLabel', undefined);
    await testHarness.setField('nextLabel', undefined);
    await testHarness.setField('ariaPreviousLabel', undefined);
    await testHarness.setField('ariaNextLabel', undefined);
    await testHarness.setField('ariaCurrentAttr', undefined);
  });

  test.each(
    [undefined, '<', 'Previous', '<PreviousLabel />'].map(previousLabel => [
      previousLabel,
    ]),
  )('Setting previousLabel to %p', async previousLabel => {
    await testHarness.setField('previousLabel', previousLabel);

    await testHarness.waitForNextFrame();

    const paginationHtml = await testHarness.getPaginationHtml();

    expect(paginationHtml).toMatchSnapshot();
  });

  test.each([undefined, '>', 'Next', '<NextLabel />'].map(nextLabel => [nextLabel]))(
    'Setting nextLabel to %p',
    async nextLabel => {
      await testHarness.setField('nextLabel', nextLabel);

      await testHarness.waitForNextFrame();

      const paginationHtml = await testHarness.getPaginationHtml();

      expect(paginationHtml).toMatchSnapshot();
    },
  );

  test.each(
    [undefined, 'AriaPrevious'].map(ariaPreviousLabel => [ariaPreviousLabel]),
  )('Setting ariaPreviousLabel to %p', async ariaPreviousLabel => {
    await testHarness.setField('ariaPreviousLabel', ariaPreviousLabel);

    await testHarness.waitForNextFrame();

    const paginationHtml = await testHarness.getPaginationHtml();

    expect(paginationHtml).toMatchSnapshot();
  });

  test.each([undefined, 'AriaNext'].map(ariaNextLabel => [ariaNextLabel]))(
    'Setting ariaNextLabel to %p',
    async ariaNextLabel => {
      await testHarness.setField('ariaNextLabel', ariaNextLabel);

      await testHarness.waitForNextFrame();

      const paginationHtml = await testHarness.getPaginationHtml();

      expect(paginationHtml).toMatchSnapshot();
    },
  );

  test.each([undefined, true].map(ariaCurrentAttr => [ariaCurrentAttr]))(
    'Setting ariaCurrentAttr to %p',
    async ariaCurrentAttr => {
      await testHarness.setField('ariaCurrentAttr', ariaCurrentAttr);

      await testHarness.waitForNextFrame();

      const paginationHtml = await testHarness.getPaginationHtml();

      expect(paginationHtml).toMatchSnapshot();
    },
  );
});

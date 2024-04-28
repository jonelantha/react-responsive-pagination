import { TestHarnessPage } from './test-harness-page';

const testHarness = new TestHarnessPage(page, { throwOnError: true });

beforeAll(async () => {
  await testHarness.goto();

  await page.setViewportSize({ width: 700, height: 700 });
});

beforeEach(async () => {
  await testHarness.setField('className', undefined);
  await testHarness.setField('extraClassName', undefined);
  await testHarness.setField('pageItemClassName', undefined);
  await testHarness.setField('pageLinkClassName', undefined);
  await testHarness.setField('activeItemClassName', undefined);
  await testHarness.setField('disabledItemClassName', undefined);
  await testHarness.setField('navClassName', undefined);
  await testHarness.setField('previousClassName', undefined);
  await testHarness.setField('nextClassName', undefined);
});

describe('Setting extraClassName', () => {
  test.each([
    [undefined, 'pagination justify-content-center'],
    ['', 'pagination'],
    ['justify-content-start', 'pagination justify-content-start'],
  ])('will have expected class', async (extraClassProp, expectedFullClass) => {
    await testHarness.setField('extraClassName', extraClassProp);

    await testHarness.waitForNextFrame();

    const fullClass = await testHarness.paginationLocator().getAttribute('class');

    expect(fullClass).toBe(expectedFullClass);
  });
});

describe('classNames', () => {
  test.each([
    ['className', 'alt-pagination'],
    ['pageItemClassName', 'alt-page-item'],
    ['pageLinkClassName', 'alt-page-link'],
    ['activeItemClassName', 'alt-active'],
    ['disabledItemClassName', 'alt-disabled'],
  ])('setting %p to %p renders correctly', async (field, value) => {
    await testHarness.setField(field, value);

    await testHarness.waitForNextFrame();

    const paginationHtml = await testHarness.getPaginationHtml();

    expect(paginationHtml).toMatchSnapshot();
  });
});

describe('nav classNames', () => {
  describe.each([{ navEnabled: true }, { navEnabled: false }])(
    'with navEnabled = $navEnabled',
    ({ navEnabled }) => {
      beforeAll(async () => {
        if (navEnabled) {
          await testHarness.setField('total', 10);
          await testHarness.setField('current', 3);
        } else {
          await testHarness.setField('total', 1);
        }
      });

      test.each([
        { nav: undefined, previous: undefined, next: undefined },
        { nav: undefined, previous: 'previous', next: 'next' },
        { nav: 'nav', previous: undefined, next: undefined },
        { nav: 'nav', previous: 'previous', next: 'next' },
      ])(
        'setting navClassName=$nav, previousClassName=$previous, nextClassName=$next renders correctly',
        async ({ nav, previous, next }) => {
          await testHarness.setField('navClassName', nav);
          await testHarness.setField('previousClassName', previous);
          await testHarness.setField('nextClassName', next);

          await testHarness.waitForNextFrame();

          const paginationHtml = await testHarness.getPaginationHtml();
          expect(paginationHtml).toMatchSnapshot();
        },
      );
    },
  );
});

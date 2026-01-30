import { test as base, expect } from '@playwright/test';
import { TestHarnessPage } from './test-harness-page.ts';

export const test = base.extend<{
  testHarness: TestHarnessPage;
}>({
  testHarness: async ({ page }, use) => {
    const testHarness = new TestHarnessPage(page, { throwOnError: true });

    await testHarness.goto();

    await page.setViewportSize({ width: 700, height: 700 });

    await use(testHarness);
  },
});

test.beforeEach(async ({ testHarness }) => {
  await testHarness.setField('className', undefined);
  await testHarness.setField('containerClassName', undefined);
  await testHarness.setField('extraClassName', undefined);
  await testHarness.setField('pageItemClassName', undefined);
  await testHarness.setField('pageLinkClassName', undefined);
  await testHarness.setField('activeItemClassName', undefined);
  await testHarness.setField('inactiveItemClassName', undefined);
  await testHarness.setField('disabledItemClassName', undefined);
  await testHarness.setField('navClassName', undefined);
  await testHarness.setField('previousClassName', undefined);
  await testHarness.setField('nextClassName', undefined);
});

test.describe('container class', () => {
  for (const { props, expectedFullClass } of [
    {
      props: {},
      expectedFullClass: 'pagination justify-content-center',
    },
    {
      props: { extraClassName: '' },
      expectedFullClass: 'pagination',
    },
    {
      props: { extraClassName: 'justify-content-start' },
      expectedFullClass: 'pagination justify-content-start',
    },
    {
      props: { className: 'custom-pagination', extraClassName: 'extra-ignored' },
      expectedFullClass: 'custom-pagination',
    },
    {
      props: {
        containerClassName: 'custom-pagination',
        extraClassName: 'extra-ignored',
      },
      expectedFullClass: 'custom-pagination',
    },
    {
      props: {
        className: 'className-pagination-takes-precedence',
        containerClassName: 'custom-pagination',
      },
      expectedFullClass: 'className-pagination-takes-precedence',
    },
  ]) {
    test(`will have expected class for ${JSON.stringify(props)}`, async ({
      testHarness,
    }) => {
      await testHarness.setField('className', props.className);
      await testHarness.setField('containerClassName', props.containerClassName);
      await testHarness.setField('extraClassName', props.extraClassName);

      await testHarness.waitForNextFrame();

      const fullClass = await testHarness.paginationLocator().getAttribute('class');

      expect(fullClass).toBe(expectedFullClass);
    });
  }
});

test.describe('classNames', () => {
  for (const [field, value] of [
    ['className', 'alt-pagination'],
    ['pageItemClassName', 'alt-page-item'],
    ['pageLinkClassName', 'alt-page-link'],
    ['activeItemClassName', 'alt-active'],
    ['inactiveItemClassName', 'alt-inactive'],
    ['disabledItemClassName', 'alt-disabled'],
  ]) {
    test(`setting ${field} to ${value} renders correctly`, async ({
      testHarness,
    }) => {
      await testHarness.setField(field, value);

      await testHarness.waitForNextFrame();

      const paginationHtml = await testHarness.getPaginationHtml();

      expect(paginationHtml).toMatchSnapshot();
    });
  }
});

test.describe('nav classNames', () => {
  for (const navEnabled of [true, false]) {
    test.describe(`with navEnabled = ${navEnabled}`, () => {
      test.beforeEach(async ({ testHarness }) => {
        if (navEnabled) {
          await testHarness.setField('total', 10);
          await testHarness.setField('current', 3);
        } else {
          await testHarness.setField('total', 1);
        }
      });

      for (const { nav, previous, next } of [
        { nav: undefined, previous: undefined, next: undefined },
        { nav: undefined, previous: 'previous', next: 'next' },
        { nav: 'nav', previous: undefined, next: undefined },
        { nav: 'nav', previous: 'previous', next: 'next' },
      ]) {
        test(`setting navClassName=${nav}, previousClassName=${previous}, nextClassName=${next} renders correctly`, async ({
          testHarness,
        }) => {
          await testHarness.setField('navClassName', nav);
          await testHarness.setField('previousClassName', previous);
          await testHarness.setField('nextClassName', next);

          await testHarness.waitForNextFrame();

          const paginationHtml = await testHarness.getPaginationHtml();
          expect(paginationHtml).toMatchSnapshot();
        });
      }
    });
  }
});

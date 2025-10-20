import { test as base, expect } from '@playwright/test';
import { TestHarnessPage } from './test-harness-page.ts';

const testWidths = [150, 200, 250];

const narrowBehaviours = [
  undefined,
  'dropNav',
  'dropEllipsis',
  'dropFirstAndLast',
  'dropNavThenEllipsis',
  'dropEllipsisThenNav',
  ['dropEllipsis', 'dropNav'],
  ['dropNav', 'dropEllipsis'],
  ['dropFirstAndLast', 'dropEllipsis'],
  ['dropEllipsis', 'dropFirstAndLast'],
];

base.describe('Auto sizing', () => {
  for (const narrowBehaviour of narrowBehaviours) {
    const testWithBehaviour = base.extend<{
      testHarness: TestHarnessPage;
    }>({
      testHarness: async ({ page }, use) => {
        const testHarness = new TestHarnessPage(page, { throwOnError: true });

        await testHarness.goto();

        await testHarness.setField('narrowBehaviourNames', narrowBehaviour);

        await testHarness.setField('total', 100);

        await use(testHarness);
      },
    });

    testWithBehaviour.describe(`with ${JSON.stringify(narrowBehaviour)}`, () => {
      for (const width of testWidths) {
        testWithBehaviour(
          `renders correctly with viewport width ${width}px`,
          async ({ page, testHarness }) => {
            await page.setViewportSize({ width, height: 700 });

            await testHarness.waitForNextFrame();

            const paginationHtml = await testHarness.getPaginationHtml();

            expect(paginationHtml).toMatchSnapshot();
          },
        );
      }
    });
  }
});

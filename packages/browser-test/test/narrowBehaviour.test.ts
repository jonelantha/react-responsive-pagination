import { TestHarnessPage } from './test-harness-page';

const testHarness = new TestHarnessPage(page, { throwOnError: true });

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

describe.each(narrowBehaviours)(
  'Auto sizing with narrowBehaviour %p',
  narrowBehaviour => {
    beforeAll(async () => {
      await testHarness.goto();

      await testHarness.setField('narrowBehaviourNames', narrowBehaviour);

      await testHarness.setField('total', 100);
    });

    test.each(testWidths.map(width => [width]))(
      'renders correctly with viewport width %ipx',
      async width => {
        await page.setViewportSize({ width, height: 700 });

        await testHarness.waitForNextFrame();

        const paginationHtml = await testHarness.getPaginationHtml();

        expect(paginationHtml).toMatchSnapshot();
      },
    );
  },
);

import { createTotalWidthCalculator } from './totalWidthCalculator';
import { createItemWidthCalculator } from './itemWidthCalculator';
import { createNavWidthCalculator } from './navWidthCalculator';
import { createPageWidthCalculator } from './pageWidthCalculator';
import { createNumberWidthCalculator } from './numberWidthCalculator';
import { createViewItem } from '../../../view';

export function createWidthCalculator(
  baseMetrics: WidthCalculatorBaseMetrics | null,
) {
  if (!baseMetrics) {
    return { requiredBaseMetrics: baseMetricItemsToMeasure };
  }

  return createGraph(baseMetrics);
}

function createGraph(baseMetrics: WidthCalculatorBaseMetrics) {
  const { itemWidths, outerFrameWidth } = baseMetrics;

  return createTotalWidthCalculator({
    getItemWidth: createItemWidthCalculator({
      getPageWidth: createPageWidthCalculator({
        getNormalPageWidth: createNumberWidthCalculator({
          singleDigit: itemWidths.normalPageSingleDigit,
          doubleDigit: itemWidths.normalPageDoubleDigit,
        }),
        getActivePageWidth: createNumberWidthCalculator({
          singleDigit: itemWidths.activePageSingleDigit,
          doubleDigit: itemWidths.activePageDoubleDigit,
        }),
      }),
      getNavWidth: createNavWidthCalculator({
        previous: {
          enabled: itemWidths.navPreviousEnabled,
          disabled: itemWidths.navPreviousDisabled,
        },
        next: {
          enabled: itemWidths.navNextEnabled,
          disabled: itemWidths.navNextDisabled,
        },
      }),
      ellipsisWidth: itemWidths.ellipsis,
    }),
    outerFrameWidth: outerFrameWidth,
  });
}

const baseMetricItemsToMeasure = {
  normalPageSingleDigit: createViewItem.page(8, false),
  normalPageDoubleDigit: createViewItem.page(88, false),
  activePageSingleDigit: createViewItem.page(8, true),
  activePageDoubleDigit: createViewItem.page(88, true),
  navPreviousEnabled: createViewItem.nav('previous', 0),
  navPreviousDisabled: createViewItem.nav('previous'),
  navNextEnabled: createViewItem.nav('next', 0),
  navNextDisabled: createViewItem.nav('next'),
  ellipsis: createViewItem.ellipsis('left'),
};

export type WidthCalculatorBaseMetrics = {
  outerFrameWidth: number;
  itemWidths: {
    normalPageSingleDigit: number;
    normalPageDoubleDigit: number;
    activePageSingleDigit: number;
    activePageDoubleDigit: number;
    navPreviousEnabled: number;
    navPreviousDisabled: number;
    navNextEnabled: number;
    navNextDisabled: number;
    ellipsis: number;
  };
};

export type WidthCalculator = ReturnType<typeof createGraph>;

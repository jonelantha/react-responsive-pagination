import { createTotalWidthCalculator } from './totalWidthCalculator.js';
import { createItemWidthCalculator } from './itemWidthCalculator.js';
import { createNavWidthCalculator } from './navWidthCalculator.js';
import { createPageWidthCalculator } from './pageWidthCalculator.js';
import { createNumberWidthCalculator } from './numberWidthCalculator.js';
import {
  createActivePage,
  createEllipsis,
  createNavNext,
  createNavPrevious,
  createPage,
} from '../compositionItem.js';

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
        '<': {
          enabled: itemWidths.navPreviousEnabled,
          disabled: itemWidths.navPreviousDisabled,
        },
        '>': {
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
  normalPageSingleDigit: createPage(8),
  normalPageDoubleDigit: createPage(88),
  activePageSingleDigit: createActivePage(8),
  activePageDoubleDigit: createActivePage(88),
  navPreviousEnabled: createNavPrevious(0),
  navPreviousDisabled: createNavPrevious(undefined),
  navNextEnabled: createNavNext(0),
  navNextDisabled: createNavNext(undefined),
  ellipsis: createEllipsis('L'),
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

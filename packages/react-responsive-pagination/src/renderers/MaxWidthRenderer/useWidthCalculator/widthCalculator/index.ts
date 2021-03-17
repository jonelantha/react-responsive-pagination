import { createTotalWidthCalculator } from './totalWidthCalculator';
import { createItemWidthCalculator } from './itemWidthCalculator';
import { createNavWidthCalculator } from './navWidthCalculator';
import { createPageWidthCalculator } from './pageWidthCalculator';
import { createNumberWidthCalculator } from './numberWidthCalculator';

export { createGraph as createWidthCalculator };

function createGraph(rootMetrics: WidthCalculatorRootMetrics) {
  const { itemWidths, outerFrameWidth } = rootMetrics;

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

export type WidthCalculatorRootMetrics = {
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

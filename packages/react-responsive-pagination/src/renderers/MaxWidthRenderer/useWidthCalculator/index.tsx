import React, { useState, useCallback } from 'react';
import { ViewComponent, createViewItem } from '../../../view';
import { createWidthCalculator, WidthCalculator } from './widthCalculator';
import ViewDomResolver, { ViewDomProvider } from './ViewDomResolver';
import { getViewMetrics } from './getViewMetrics';
import { useIsMounted } from './useIsMounted';

export function useWidthCalculator(view: ViewComponent) {
  const [{ calculator, validForView }, setCalculatorWithView] = useState<{
    calculator?: WidthCalculator;
    validForView?: ViewComponent;
  }>({});

  const isMounted = useIsMounted();

  const resetCalculator = useCallback(() => setCalculatorWithView({}), []);

  const setupCalculator = useCallback(
    async (viewDomProvider: ViewDomProvider) => {
      const calculatorRootMetrics = await getViewMetrics(
        viewDomProvider,
        rootMetricItemsToMeasure,
      );

      if (!isMounted()) return;

      const calculator = createWidthCalculator(calculatorRootMetrics);

      setCalculatorWithView({ calculator, validForView: view });
    },
    [view, isMounted],
  );

  if (!calculator || validForView !== view) {
    return {
      measuringComponentNeedsRender: (
        <ViewDomResolver view={view} onDomProvidable={setupCalculator} />
      ),
    } as RenderNeededResult;
  }

  return {
    getWidth: calculator,
    clearCache: resetCalculator,
  } as CalculatorResult;
}

const rootMetricItemsToMeasure = {
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

type RenderNeededResult = {
  measuringComponentNeedsRender: JSX.Element;
};

type CalculatorResult = {
  getWidth: WidthCalculator;
  clearCache: () => void;
};

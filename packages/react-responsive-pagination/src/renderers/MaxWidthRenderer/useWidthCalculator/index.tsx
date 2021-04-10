import React, { useState, useCallback, useMemo } from 'react';
import { ViewComponent, createViewItem } from '../../../view';
import { createWidthCalculator, WidthCalculator } from './widthCalculator';
import { getViewMetricsFromViewDom, ViewMetrics } from './getViewMetrics';
import { objectUnzip } from '../../../helpers/object';
import { useIsMounted } from './useIsMounted';

export function useWidthCalculator(View: ViewComponent) {
  const [{ baseMetrics, validForView }, setBaseMetricsWithView] = useState<{
    baseMetrics?: ViewMetrics<keyof typeof rootMetricItemsToMeasure>;
    validForView?: ViewComponent;
  }>({});

  const isMounted = useIsMounted();

  const resetCalculator = useCallback(() => setBaseMetricsWithView({}), []);

  const calculator = useMemo(() => {
    return baseMetrics && createWidthCalculator(baseMetrics);
  }, [baseMetrics]);

  if (!baseMetrics || validForView !== View) {
    const [itemKeys, items] = objectUnzip(rootMetricItemsToMeasure);

    const getBaseMetrics = (viewDom: HTMLElement) => {
      const baseMetrics = getViewMetricsFromViewDom(viewDom, itemKeys);

      isMounted() && setBaseMetricsWithView({ baseMetrics, validForView: View });
    };

    return {
      measuringComponentNeedsRender: (
        <View items={items} ref={viewDom => viewDom && getBaseMetrics(viewDom)} />
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

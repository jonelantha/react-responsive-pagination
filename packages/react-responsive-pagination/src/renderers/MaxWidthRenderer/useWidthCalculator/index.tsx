import React, { useState, useCallback, useMemo } from 'react';
import { ViewComponent } from '../../../view';
import {
  createWidthCalculator,
  WidthCalculator,
  WidthCalculatorBaseMetrics,
} from './widthCalculator';
import { getViewMetricsFromViewDom } from './getViewMetrics';
import { objectUnzip } from '../../../helpers/object';
import { useIsMounted } from './useIsMounted';

export function useWidthCalculator(View: ViewComponent) {
  const [baseMetrics, setBaseMetrics] = useState<WidthCalculatorBaseMetrics | null>(
    null,
  );

  const [measuredView, setMeasuredView] = useState<ViewComponent | null>(null);

  const isMounted = useIsMounted();

  const resetCalculator = useCallback(() => setBaseMetrics(null), []);

  const calculatorResult = useMemo(() => {
    return createWidthCalculator(measuredView === View ? baseMetrics : null);
  }, [baseMetrics, measuredView, View]);

  if ('requiredBaseMetrics' in calculatorResult) {
    const [itemKeys, items] = objectUnzip(calculatorResult.requiredBaseMetrics);

    const getBaseMetrics = (viewDom: HTMLElement) => {
      if (!isMounted()) return;

      setBaseMetrics(getViewMetricsFromViewDom(viewDom, itemKeys));
      setMeasuredView(View);
    };

    return {
      measuringComponentNeedsRender: (
        <View items={items} ref={viewDom => viewDom && getBaseMetrics(viewDom)} />
      ),
    } as RenderNeededResult;
  }

  return {
    getWidth: calculatorResult,
    clearCache: resetCalculator,
  } as CalculatorResult;
}

type RenderNeededResult = {
  measuringComponentNeedsRender: JSX.Element;
};

type CalculatorResult = {
  getWidth: WidthCalculator;
  clearCache: () => void;
};

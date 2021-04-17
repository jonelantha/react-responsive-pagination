import { useState, useCallback, useMemo } from 'react';
import { ViewComponent, ViewItem } from '../../../view';
import {
  createWidthCalculator,
  WidthCalculator,
  WidthCalculatorBaseMetrics,
} from './widthCalculator';
import { getViewMetricsFromContainer } from './getViewMetrics';
import { objectUnzip } from '../../../helpers/object';
import { useIsUnmounted } from './useIsUnmounted';

export function useWidthCalculator(View: ViewComponent) {
  const [baseMetrics, setBaseMetrics] = useState<WidthCalculatorBaseMetrics | null>(
    null,
  );

  const [measuredView, setMeasuredView] = useState<ViewComponent | null>(null);

  const isUnmounted = useIsUnmounted();

  const resetCalculator = useCallback(() => setBaseMetrics(null), []);

  const calculatorResult = useMemo(() => {
    return createWidthCalculator(measuredView === View ? baseMetrics : null);
  }, [baseMetrics, measuredView, View]);

  if ('requiredBaseMetrics' in calculatorResult) {
    const [itemKeys, items] = objectUnzip(calculatorResult.requiredBaseMetrics);

    const updateBaseMetrics = (containerElement: HTMLElement) => {
      if (isUnmounted()) return;

      setBaseMetrics(getViewMetricsFromContainer(containerElement, itemKeys));
      setMeasuredView(View);
    };

    return {
      renderNeeded: {
        items,
        ref: containerElement =>
          containerElement && updateBaseMetrics(containerElement),
      },
    } as RenderNeededResult;
  }

  return {
    getWidth: calculatorResult,
    clearCache: resetCalculator,
  } as CalculatorResult;
}

type RenderNeededResult = {
  renderNeeded: {
    items: ViewItem[];
    ref: (element: HTMLElement | null) => void;
  };
};

type CalculatorResult = {
  getWidth: WidthCalculator;
  clearCache: () => void;
};

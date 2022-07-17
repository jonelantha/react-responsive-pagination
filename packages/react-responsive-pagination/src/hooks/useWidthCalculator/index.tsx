import { useState, useCallback, useMemo } from 'react';
import {
  createWidthCalculator,
  WidthCalculator,
  WidthCalculatorBaseMetrics,
} from '../../widthCalculator';
import { getViewMetricsFromContainer } from './getViewMetrics';
import { objectUnzip } from '../../helpers/object';
import { CompositionItem } from '../../compositionItem';

export function useWidthCalculator() {
  const [baseMetrics, setBaseMetrics] = useState<WidthCalculatorBaseMetrics | null>(
    null,
  );
  const resetCalculator = useCallback(() => setBaseMetrics(null), []);

  const calculatorResult = useMemo(() => {
    return createWidthCalculator(baseMetrics);
  }, [baseMetrics]);

  if ('requiredBaseMetrics' in calculatorResult) {
    const [itemKeys, items] = objectUnzip(calculatorResult.requiredBaseMetrics);

    return {
      renderNeeded: {
        items,
        ref(containerElement) {
          if (containerElement) {
            setBaseMetrics(getViewMetricsFromContainer(containerElement, itemKeys));
          }
        },
      },
      clearCache: resetCalculator,
    } as RenderNeededResult;
  }

  return {
    calculator: calculatorResult,
    clearCache: resetCalculator,
  } as CalculatorResult;
}

type RenderNeededResult = {
  renderNeeded: {
    items: CompositionItem[];
    ref: (element: HTMLElement | null) => void;
  };
  clearCache: () => void;
};

type CalculatorResult = {
  calculator: WidthCalculator;
  clearCache: () => void;
};

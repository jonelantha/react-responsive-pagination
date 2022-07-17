import { useCallback, useState } from 'react';
import { CompositionItem } from '../compositionItem';
import { setRefValue } from '../helpers/ref';
import { useAvailableWidth } from './useAvailableWidth';
import { useWidestCompositionForWidth } from './useWidestCompositionForWidth';

export function useWidestComposition(
  narrowToWideCompositionsProvider: () => IterableIterator<CompositionItem[]>,
  maxWidth?: number,
) {
  const [containerElement, setContainerElement] = useState<HTMLElement | null>(null);

  const availableWidth = useAvailableWidth(
    maxWidth === undefined ? containerElement : null,
  );

  const width = maxWidth ?? availableWidth ?? 0;

  const {
    items,
    ref: widestCompositionRef,
    clearCache,
  } = useWidestCompositionForWidth(narrowToWideCompositionsProvider, width);

  const ref = useCallback(
    (element: HTMLElement | null) => {
      setRefValue(widestCompositionRef, element);
      setContainerElement(element);
    },
    [widestCompositionRef],
  );

  return {
    items,
    ref,
    clearCache,
  };
}

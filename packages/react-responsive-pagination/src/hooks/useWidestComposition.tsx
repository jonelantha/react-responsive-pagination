import { useCallback, useState } from 'react';
import { CompositionItem } from '../compositionItem.js';
import { setRefValue } from '../helpers/ref.js';
import { useAvailableWidth } from './useAvailableWidth.js';
import { useWidestCompositionForWidth } from './useWidestCompositionForWidth.js';

export function useWidestComposition(
  narrowToWideCompositionsProvider: () => IterableIterator<CompositionItem[]>,
  maxWidth?: number,
) {
  const [containerElement, setContainerElement] = useState<Element | null>(null);

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
    (element: Element | null) => {
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

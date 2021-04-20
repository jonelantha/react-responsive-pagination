import { ForwardedRef, useCallback, useState } from 'react';
import { setRefValue } from '../../helpers/ref';
import { ViewItem } from '../../view';
import { useAvailableWidth } from '../useAvailableWidth';
import useWidestCompositionForWidth from '../useWidestCompositionForWidth';

export default function useWidestComposition(
  narrowToWideCompositionsProvider: () => IterableIterator<ViewItem[]>,
): {
  items: ViewItem[];
  ref: ForwardedRef<HTMLElement | null>;
  clearCache: () => void;
} {
  const [containerElement, setContainerElement] = useState<HTMLElement | null>(null);

  const width = useAvailableWidth(containerElement) ?? 0;

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

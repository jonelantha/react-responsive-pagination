import { ForwardedRef, useCallback, useState } from 'react';
import { setRefValue } from '../helpers/ref';
import { PaginationItem } from '../paginationItem';
import { useAvailableWidth } from './useAvailableWidth';
import { useWidestCompositionForWidth } from './useWidestCompositionForWidth';

export function useWidestComposition(
  narrowToWideCompositionsProvider: () => IterableIterator<PaginationItem[]>,
  maxWidth?: number,
): {
  items: PaginationItem[];
  ref: ForwardedRef<HTMLElement | null>;
} {
  const [containerElement, setContainerElement] = useState<HTMLElement | null>(null);

  const availableWidth = useAvailableWidth(
    maxWidth === undefined ? containerElement : null,
  );

  const width = maxWidth ?? availableWidth ?? 0;

  const { items, ref: widestCompositionRef } = useWidestCompositionForWidth(
    narrowToWideCompositionsProvider,
    width,
  );

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
  };
}

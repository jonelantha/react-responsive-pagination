import { useEffect } from 'react';
import { narrowToWideCompositions } from '../compositions';
import { sanatizeInteger } from '../helpers/util';
import { useWidestComposition } from './useWidestComposition';

export function usePaginationItems(
  inputCurrent: number,
  inputTotal: number,
  maxWidth: number | undefined,
  options?: {
    nextLabel?: string;
    previousLabel?: string;
  },
) {
  const total = sanatizeInteger(inputTotal);

  const current =
    total < 1 ? null : Math.max(1, Math.min(sanatizeInteger(inputCurrent), total));

  const narrowToWideCompositionsProvider = () =>
    narrowToWideCompositions(current, total);

  const { items, ref, clearCache } = useWidestComposition(
    narrowToWideCompositionsProvider,
    maxWidth,
  );

  useEffect(() => {
    return () => clearCache();
  }, [clearCache, options?.previousLabel, options?.nextLabel]);

  const amendedItems = items.map(item => {
    if (item.type === 'next' && options?.nextLabel) {
      return {
        ...item,
        label: options?.nextLabel,
      };
    } else if (item.type === 'previous' && options?.previousLabel) {
      return {
        ...item,
        label: options?.previousLabel,
      };
    } else {
      return item;
    }
  });

  return { items: amendedItems, ref, clearCache };
}

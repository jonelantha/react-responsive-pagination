import { ReactNode, useEffect } from 'react';
import { narrowToWideCompositions } from '../compositions/index.js';
import { sanatizeInteger, sanatizeBoolean } from '../helpers/util.js';
import { NarrowBehaviour } from '../narrowBehaviour.js';
import { compositionToPaginationItems } from '../paginationItem.js';
import { useWidestComposition } from './useWidestComposition.js';

export function usePaginationItems(
  inputCurrent: number,
  inputTotal: number,
  maxWidth: number | undefined,
  options?: {
    nextLabel?: string | ReactNode;
    previousLabel?: string | ReactNode;
    ariaNextLabel?: string;
    ariaPreviousLabel?: string;
    renderNav?: boolean;
    narrowBehaviour?: NarrowBehaviour;
  },
) {
  const narrowToWideCompositionsProvider = () =>
    narrowToWideCompositions({
      current: sanatizeInteger(inputCurrent) ?? 0,
      total: sanatizeInteger(inputTotal) ?? 0,
      narrowBehaviour: options?.narrowBehaviour,
      renderNav: sanatizeBoolean(options?.renderNav) ?? true,
    });

  const {
    items: compositionItems,
    ref,
    clearCache,
  } = useWidestComposition(narrowToWideCompositionsProvider, maxWidth);

  useEffect(() => {
    return () => clearCache();
  }, [clearCache, options?.previousLabel, options?.nextLabel]);

  const items = compositionToPaginationItems(compositionItems, options);

  return { items, ref, clearCache };
}

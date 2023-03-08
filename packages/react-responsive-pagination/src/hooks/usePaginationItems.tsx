import { useEffect } from 'react';
import { NarrowStrategy, narrowToWideCompositions } from '../compositions/index.js';
import { sanatizeInteger, sanatizeBoolean } from '../helpers/util.js';
import { compositionToPaginationItems } from '../paginationItem.js';
import { useWidestComposition } from './useWidestComposition.js';

export function usePaginationItems(
  inputCurrent: number,
  inputTotal: number,
  maxWidth: number | undefined,
  options?: {
    nextLabel?: string;
    previousLabel?: string;
    ariaNextLabel?: string;
    ariaPreviousLabel?: string;
    renderNav?: boolean;
    a11yActiveLabel?: string;
    narrowStrategy?: NarrowStrategy | NarrowStrategy[];
  },
) {
  const narrowToWideCompositionsProvider = () =>
    narrowToWideCompositions({
      current: sanatizeInteger(inputCurrent) ?? 0,
      total: sanatizeInteger(inputTotal) ?? 0,
      narrowStrategies: sanatizeNarrowStrategies(options?.narrowStrategy),
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

function sanatizeNarrowStrategies(inputNarrowStrategies: unknown): NarrowStrategy[] {
  return (
    Array.isArray(inputNarrowStrategies)
      ? inputNarrowStrategies
      : [inputNarrowStrategies]
  ).filter(strategy => strategy === 'dropEllipsis' || strategy === 'dropNav');
}

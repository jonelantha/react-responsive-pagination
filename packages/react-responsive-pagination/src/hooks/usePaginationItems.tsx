import { useEffect } from 'react';
import { NarrowStrategy, narrowToWideCompositions } from '../compositions';
import { sanatizeInteger, sanatizeBoolean } from '../helpers/util';
import { compositionToPaginationItems } from '../paginationItem';
import { useWidestComposition } from './useWidestComposition';

export function usePaginationItems(
  inputCurrent: number,
  inputTotal: number,
  maxWidth: number | undefined,
  options?: {
    nextLabel?: string;
    previousLabel?: string;
    renderNav?: boolean;
    a11yActiveLabel: string;
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

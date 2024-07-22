import { isValidElement, useEffect } from 'react';
import type { ReactNode } from 'react';
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
    visible,
    items: compositionItems,
    ref,
    clearCache,
  } = useWidestComposition(narrowToWideCompositionsProvider, maxWidth);

  const previousLabelCacheKey = labelCacheKey(options?.previousLabel);
  const nextLabelCacheKey = labelCacheKey(options?.nextLabel);

  useEffect(() => {
    return () => clearCache();
  }, [clearCache, previousLabelCacheKey, nextLabelCacheKey]);

  const items = compositionToPaginationItems(compositionItems, options);

  return { visible, items, ref, clearCache };
}

function labelCacheKey(item: string | ReactNode) {
  if (isValidElement(item)) {
    process.env.NODE_ENV !== 'production' && showReactElementLabelWarning();

    // This is not exhaustive
    // but should pick up on many situations when an element changes
    switch (typeof item.type) {
      case 'string':
        return `element-str-${item.type}`;

      case 'function':
        return `element-fn-${item.type.name}`;

      default:
        return 'element';
    }
  } else if (Array.isArray(item)) {
    process.env.NODE_ENV !== 'production' && showReactElementLabelWarning();

    return 'element-array';
  } else {
    return item;
  }
}

let reactElementLabelWarningShown = false;

function showReactElementLabelWarning() {
  if (reactElementLabelWarningShown) return;

  console.log(
    'react-responsive-pagination: using React elements for labels is experimental, please see: https://react-responsive-pagination.elantha.com/faq/#using-react-components-for-labels',
  );
  reactElementLabelWarningShown = true;
}

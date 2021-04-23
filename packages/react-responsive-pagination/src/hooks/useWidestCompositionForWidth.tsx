import { ForwardedRef, useRef } from 'react';
import { PaginationItem } from '../paginationItem';
import { lastWhere, iteratorNext } from '../helpers/iterator';
import { useWidthCalculator } from './useWidthCalculator';
import { useFoutDetector } from './useFoutDetector';

export function useWidestCompositionForWidth(
  narrowToWideCompositionsProvider: () => IterableIterator<PaginationItem[]>,
  maxWidth: number,
): {
  items: PaginationItem[];
  ref: ForwardedRef<HTMLElement | null>;
} {
  const widthCalculator = useWidthCalculator();

  const containerElementRef = useRef<HTMLElement | null>(null);

  const clearCache = widthCalculator.clearCache;

  useFoutDetector(
    () => getItemsDomElements(containerElementRef.current),
    clearCache,
  );

  if ('renderNeeded' in widthCalculator) {
    return {
      items: widthCalculator.renderNeeded.items,
      ref(containerElement) {
        widthCalculator.renderNeeded.ref(containerElement);
        containerElementRef.current = containerElement;
      },
    };
  } else {
    return {
      items: getLargestFittingCompositionWithFallback(
        narrowToWideCompositionsProvider,
        widthCalculator.calculator,
        maxWidth,
      ),
      ref: containerElementRef,
    };
  }
}

function getLargestFittingCompositionWithFallback(
  getNarrowToWideCompositions: () => IterableIterator<PaginationItem[]>,
  getCompositionWidth: (items: PaginationItem[]) => number,
  maxWidth: number,
) {
  const narrowToWideCompositions = getNarrowToWideCompositions();

  const firstComposition = iteratorNext(narrowToWideCompositions) ?? [];

  const doesCompositionFit = (composition: PaginationItem[]) => {
    return getCompositionWidth(composition) < maxWidth;
  };

  return lastWhere(narrowToWideCompositions, doesCompositionFit) ?? firstComposition;
}

function getItemsDomElements(viewDomElement: HTMLElement | null) {
  return viewDomElement && (Array.from(viewDomElement.children) as HTMLElement[]);
}

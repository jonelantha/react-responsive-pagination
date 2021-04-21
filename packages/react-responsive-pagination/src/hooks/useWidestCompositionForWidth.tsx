import { ForwardedRef, useRef } from 'react';
import { ViewItem } from '../view';
import { lastWhere, iteratorNext } from '../helpers/iterator';
import { useWidthCalculator } from './useWidthCalculator';
import { useFoutDetector } from './useFoutDetector';

export function useWidestCompositionForWidth(
  narrowToWideCompositionsProvider: () => IterableIterator<ViewItem[]>,
  maxWidth: number,
): {
  items: ViewItem[];
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
  getNarrowToWideCompositions: () => IterableIterator<ViewItem[]>,
  getCompositionWidth: (items: ViewItem[]) => number,
  maxWidth: number,
) {
  const narrowToWideCompositions = getNarrowToWideCompositions();

  const firstComposition = iteratorNext(narrowToWideCompositions) ?? [];

  const doesCompositionFit = (composition: ViewItem[]) => {
    return getCompositionWidth(composition) < maxWidth;
  };

  return lastWhere(narrowToWideCompositions, doesCompositionFit) ?? firstComposition;
}

function getItemsDomElements(viewDomElement: HTMLElement | null) {
  return viewDomElement && (Array.from(viewDomElement.children) as HTMLElement[]);
}

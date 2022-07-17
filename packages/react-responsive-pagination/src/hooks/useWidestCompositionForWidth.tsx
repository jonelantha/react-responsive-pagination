import { ForwardedRef, useRef } from 'react';
import { lastWhere, iteratorNext } from '../helpers/iterator';
import { useWidthCalculator } from './useWidthCalculator';
import { useFoutDetector } from './useFoutDetector';
import { CompositionItem } from '../compositionItem';

export function useWidestCompositionForWidth(
  narrowToWideCompositionsProvider: () => IterableIterator<CompositionItem[]>,
  maxWidth: number,
): {
  items: CompositionItem[];
  ref: ForwardedRef<HTMLElement | null>;
  clearCache: () => void;
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
      clearCache,
    };
  } else {
    return {
      items: getLargestFittingCompositionWithFallback(
        narrowToWideCompositionsProvider,
        widthCalculator.calculator,
        maxWidth,
      ),
      ref: containerElementRef,
      clearCache,
    };
  }
}

function getLargestFittingCompositionWithFallback(
  getNarrowToWideCompositions: () => IterableIterator<CompositionItem[]>,
  getCompositionWidth: (items: CompositionItem[]) => number,
  maxWidth: number,
) {
  const narrowToWideCompositions = getNarrowToWideCompositions();

  const firstComposition = iteratorNext(narrowToWideCompositions) ?? [];

  const doesCompositionFit = (composition: CompositionItem[]) => {
    return getCompositionWidth(composition) < maxWidth;
  };

  return lastWhere(narrowToWideCompositions, doesCompositionFit) ?? firstComposition;
}

function getItemsDomElements(viewDomElement: HTMLElement | null) {
  return viewDomElement && (Array.from(viewDomElement.children) as HTMLElement[]);
}

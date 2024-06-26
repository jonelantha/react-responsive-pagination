import { useCallback, useState } from 'react';
import { CompositionItem } from '../compositionItem.js';
import { useAvailableWidth } from './useAvailableWidth.js';
import { useFoutDetector } from './useFoutDetector.js';
import { useWidthCalculator } from './useWidthCalculator.js';
import { iteratorNext, lastWhere } from '../helpers/iterator.js';

export function useWidestComposition(
  narrowToWideCompositionsProvider: () => IterableIterator<CompositionItem[]>,
  maxWidth?: number,
): {
  items: CompositionItem[];
  ref: (element: Element | null) => void;
  clearCache: () => void;
} {
  const [containerElement, setContainerElement] = useState<Element | null>(null);

  const availableWidth = useAvailableWidth(
    maxWidth === undefined ? containerElement : null,
  );

  const width = maxWidth ?? availableWidth ?? 0;

  const { widthCalculator, metricsRender, clearCache } = useWidthCalculator();

  const foutDetectorRef = useFoutDetector(getItemsDomElements, clearCache);

  const ref = useCallback(
    (element: Element | null) => {
      foutDetectorRef.current = element;
      setContainerElement(element);
    },
    [foutDetectorRef],
  );

  if (metricsRender) {
    return {
      items: metricsRender.items,
      ref(containerElement) {
        metricsRender.ref(containerElement);
        ref(containerElement);
      },
      clearCache,
    };
  } else {
    return {
      items: getLargestFittingCompositionWithFallback(
        narrowToWideCompositionsProvider,
        widthCalculator,
        width,
      ),
      ref,
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

  const doesCompositionFit = (composition: CompositionItem[]) =>
    getCompositionWidth(composition) < maxWidth;

  return lastWhere(narrowToWideCompositions, doesCompositionFit) ?? firstComposition;
}

function getItemsDomElements(viewDomElement: Element | null) {
  return viewDomElement && Array.from(viewDomElement.children);
}

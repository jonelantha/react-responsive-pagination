import { useRef, useState } from 'react';
import { CompositionItem } from '../compositionItem.js';
import { useAvailableWidth } from './useAvailableWidth.js';
import { useFoutDetector } from './useFoutDetector.js';
import { useWidthCalculator } from './useWidthCalculator.js';
import { iteratorNext, lastWhere } from '../helpers/iterator.js';

export function useWidestComposition<ContainerType extends Element>(
  narrowToWideCompositionsProvider: () => IterableIterator<CompositionItem[]>,
  maxWidth?: number,
): {
  items: CompositionItem[];
  ref: React.Ref<ContainerType>;
  visible: boolean;
  clearCache: () => void;
} {
  const containerRef = useRef<ContainerType | null>(null);

  const { widthCalculator, metricsRender, clearCache } = useWidthCalculator();

  useFoutDetector(containerRef.current, getItemsDomElements, clearCache);

  const width = useAvailableWidth(containerRef.current, maxWidth) ?? 0;

  const [showPlaceholder, setShowPlaceholder] = useState(true);
  if (showPlaceholder) {
    const firstComposition = iteratorNext(narrowToWideCompositionsProvider());
    return {
      visible: false,
      items: firstComposition ?? [],
      ref(containerElement) {
        setShowPlaceholder(false);
        containerRef.current = containerElement;
      },
      clearCache,
    };
  }

  if (metricsRender) {
    return {
      visible: false,
      items: metricsRender.items,
      ref(containerElement) {
        metricsRender.ref(containerElement);
        containerRef.current = containerElement;
      },
      clearCache,
    };
  }

  return {
    visible: true,
    items: getLargestFittingCompositionWithFallback(
      narrowToWideCompositionsProvider,
      widthCalculator,
      width,
    ),
    ref: containerRef,
    clearCache,
  };
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

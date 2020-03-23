import React, { useRef } from 'react';
import { ViewComponent, ViewItem } from '../../view';
import { lastWhere, iteratorNext } from '../../helpers/iterator';
import { useWidthCalculator } from './useWidthCalculator';
import { useFoutDetector } from './useFoutDetector';

export default function MaxWidthRenderer({
  maxWidth,
  narrowToWideCompositionsProvider,
  View,
}: Props) {
  const widthCalculator = useWidthCalculator(View);

  const viewRef = useRef<HTMLElement>(null);

  useFoutDetector(
    () => getItemsDomElements(viewRef.current),
    'clearCache' in widthCalculator ? widthCalculator.clearCache : () => {},
  );

  if ('measuringComponentNeedsRender' in widthCalculator) {
    return widthCalculator.measuringComponentNeedsRender;
  }

  const composition = getLargestFittingCompositionWithFallback(
    narrowToWideCompositionsProvider,
    widthCalculator.getWidth,
    maxWidth,
  );

  return <View items={composition} ref={viewRef} />;
}

type Props = {
  maxWidth: number;
  narrowToWideCompositionsProvider: () => IterableIterator<ViewItem[]>;
  View: ViewComponent;
};

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

import React, { Ref, forwardRef, useRef } from 'react';
import { ViewComponent, ViewItem } from '../../view';
import { lastWhere, iteratorNext } from '../../helpers/iterator';
import { useWidthCalculator } from './useWidthCalculator';
import { useFoutDetector } from './useFoutDetector';

const MaxWidthRenderer = forwardRef<HTMLElement, Props>(
  ({ maxWidth, narrowToWideCompositionsProvider, View }, forwardedViewRef) => {
    const widthCalculator = useWidthCalculator(View);

    const containerElementRef = useRef<HTMLElement | null>(null);

    useFoutDetector(
      () => getItemsDomElements(containerElementRef.current),
      'clearCache' in widthCalculator ? widthCalculator.clearCache : () => {},
    );

    let items: ViewItem[];
    let ref: Ref<HTMLElement>;

    if ('renderNeeded' in widthCalculator) {
      items = widthCalculator.renderNeeded.items;
      ref = function (containerElement) {
        widthCalculator.renderNeeded.ref(containerElement);
        typeof forwardedViewRef === 'function' && forwardedViewRef(containerElement);
        containerElementRef.current = containerElement;
      };
    } else {
      items = getLargestFittingCompositionWithFallback(
        narrowToWideCompositionsProvider,
        widthCalculator.getWidth,
        maxWidth,
      );
      ref = function (containerElement) {
        typeof forwardedViewRef === 'function' && forwardedViewRef(containerElement);
        containerElementRef.current = containerElement;
      };
    }

    return <View items={items} ref={ref} />;
  },
);

export default MaxWidthRenderer;

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

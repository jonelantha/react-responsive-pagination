import React, { useLayoutEffect } from 'react';
import useWidestComposition from '../useWidestComposition';
import { ViewItem, ViewComponent } from '../../view';

export default function AutoWidthRenderer({
  narrowToWideCompositionsProvider,
  View,
}: Props) {
  const { items, ref, clearCache } = useWidestComposition(
    narrowToWideCompositionsProvider,
  );

  useLayoutEffect(() => {
    return () => clearCache();
  }, [View, clearCache]);

  return <View items={items} ref={ref} />;
}

type Props = {
  narrowToWideCompositionsProvider: () => IterableIterator<ViewItem[]>;
  View: ViewComponent;
};

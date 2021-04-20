import React, { useLayoutEffect } from 'react';
import useWidestCompositionForWidth from '../useWidestCompositionForWidth';
import { ViewItem, ViewComponent } from '../../view';

export default function MaxWidthRenderer({
  maxWidth,
  narrowToWideCompositionsProvider,
  View,
}: Props) {
  const { items, ref, clearCache } = useWidestCompositionForWidth(
    narrowToWideCompositionsProvider,
    maxWidth,
  );

  useLayoutEffect(() => {
    return () => clearCache();
  }, [View, clearCache]);

  return <View items={items} ref={ref} />;
}

type Props = {
  maxWidth: number;
  narrowToWideCompositionsProvider: () => IterableIterator<ViewItem[]>;
  View: ViewComponent;
};

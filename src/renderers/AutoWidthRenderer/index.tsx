import MaxWidthRenderer from '../MaxWidthRenderer';
import React, { useState } from 'react';
import { ViewItem, ViewComponent } from '../../view';
import { useAvailableWidth } from './useAvailableWidth';

export default function AutoWidthRenderer(props: Props) {
  const [viewElement, setViewElement] = useState<HTMLElement | null>(null);

  const width = useAvailableWidth(viewElement) ?? 0;

  return <MaxWidthRenderer maxWidth={width} ref={setViewElement} {...props} />;
}

type Props = {
  narrowToWideCompositionsProvider: () => IterableIterator<ViewItem[]>;
  View: ViewComponent;
};

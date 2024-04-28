import { useState, useLayoutEffect } from 'react';
import { getContentWidth } from '../helpers/style.js';
import { useResizeNotifier } from './useResizeNotifier.js';

export function useContentWidth(element: Element | undefined) {
  const [width, setWidth] = useState<number>();

  function syncWidth() {
    const newWidth = element ? getContentWidth(element) : undefined;

    if (width !== newWidth) {
      setWidth(newWidth);
    }
  }

  useResizeNotifier(element, syncWidth);

  useLayoutEffect(syncWidth);

  return width;
}

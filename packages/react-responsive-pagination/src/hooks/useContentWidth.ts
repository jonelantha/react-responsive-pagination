import { useState, useLayoutEffect } from 'react';
import { getContentWidth } from '../helpers/style';
import { useResizeNotifier } from './useResizeNotifier';

export function useContentWidth(element: HTMLElement | undefined) {
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

import { useLayoutEffect } from 'react';
import { getWidth } from '../helpers/style.js';

export function useFoutDetector(
  getElements: () => Element[] | null,
  handleFout: () => void,
) {
  useLayoutEffect(() => {
    const elements = getElements();

    if (!elements) return;

    return setupWidthChangeAfterRenderListener(elements, handleFout);
  });
}

function setupWidthChangeAfterRenderListener(
  elements: Element[],
  handleWidthChangeAfterRender: () => void,
) {
  const getInitialWidth = createInitialWidthProvider(elements);

  const hasWidthChanged = (element: Element) => {
    return isSignificantDifference(getInitialWidth(element), getWidth(element));
  };

  return setupResizeObserver(elements, maybeResizedElements => {
    if (maybeResizedElements.some(hasWidthChanged)) {
      handleWidthChangeAfterRender();
    }
  });
}

function createInitialWidthProvider(elements: Element[]) {
  const initialWidths = elements.map(getWidth);

  return function getInitialWidth(element: Element) {
    const index = elements.indexOf(element);

    return initialWidths[index];
  };
}

function setupResizeObserver(
  elements: Element[],
  handleElementsResized: (elements: Element[]) => void,
) {
  const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
    const elements = entries.map(entry => entry.target);

    handleElementsResized(elements);
  });

  elements.forEach(element => resizeObserver.observe(element));

  return () => resizeObserver.disconnect();
}

function isSignificantDifference(width1: number, width2: number) {
  return Math.abs(width1 - width2) > 0.5;
}

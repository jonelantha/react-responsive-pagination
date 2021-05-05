import { useLayoutEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { getWidth } from '../helpers/style';

export function useFoutDetector(
  getElements: () => HTMLElement[] | null,
  handleFout: () => void,
) {
  useLayoutEffect(() => {
    const elements = getElements();

    if (!elements) return;

    return setupWidthChangeAfterRenderListener(elements, handleFout);
  });
}

function setupWidthChangeAfterRenderListener(
  elements: HTMLElement[],
  handleWidthChangeAfterRender: () => void,
) {
  const getInitialWidth = createInitialWidthProvider(elements);

  const hasWidthChanged = (element: HTMLElement) => {
    return isSignificantDifference(getInitialWidth(element), getWidth(element));
  };

  return setupResizeObserver(elements, maybeResizedElements => {
    if (maybeResizedElements.some(hasWidthChanged)) {
      handleWidthChangeAfterRender();
    }
  });
}

function createInitialWidthProvider(elements: HTMLElement[]) {
  const initialWidths = elements.map(getWidth);

  return function getInitialWidth(element: HTMLElement) {
    const index = elements.indexOf(element);

    return initialWidths[index];
  };
}

function setupResizeObserver(
  elements: HTMLElement[],
  handleElementsResized: (elements: HTMLElement[]) => void,
) {
  const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
    const elements = entries.map(getTargetElement);

    handleElementsResized(elements);
  });

  elements.forEach(element => resizeObserver.observe(element));

  return () => resizeObserver.disconnect();
}

function getTargetElement(entry: ResizeObserverEntry) {
  return entry.target as HTMLElement;
}

function isSignificantDifference(width1: number, width2: number) {
  return Math.abs(width1 - width2) > 0.5;
}

import { useCallback, useRef } from 'react';
import { useIsomorphicLayoutEffect } from '../helpers/react.js';
import { getWidth } from '../helpers/style.js';
import { flushSync } from 'react-dom';

export function useItemWidthChangeDetector(
  enabled: boolean,
  container: Element | null,
  getItemElements: (container: Element) => Element[],
  handle: () => void,
) {
  const renderedWidthsRef = useRef<Map<Element, number>>();

  const reset = useCallback(() => {
    renderedWidthsRef.current = undefined;
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!enabled || !container) {
      reset();
      return;
    }

    const elements = getItemElements(container);

    const previousRenderedWidths = renderedWidthsRef.current;

    if (hasAWidthChanged(elements, previousRenderedWidths)) {
      reset();
      handle();
      return;
    }

    renderedWidthsRef.current = getRenderedWidths(elements);

    const resizeObserver = new ResizeObserver(entries => {
      const resizedElements = entries.map(entry => entry.target);

      if (hasAWidthChanged(resizedElements, renderedWidthsRef.current)) {
        flushSync(() => {
          reset();
          handle();
        });
      }
    });

    elements.forEach(element => resizeObserver.observe(element));

    return () => resizeObserver.disconnect();
  });
}

function getRenderedWidths(elements: Element[]) {
  return new Map(elements.map(element => [element, getWidth(element)]));
}

function hasAWidthChanged(
  elements: Element[],
  previousWidths: Map<Element, number> | undefined,
) {
  if (!previousWidths) return false;

  return [...previousWidths]
    .filter(([element]) => elements.includes(element))
    .map(([element, previousWidth]) => previousWidth - getWidth(element))
    .some(difference => difference < -0.5 || difference > 0.5);
}

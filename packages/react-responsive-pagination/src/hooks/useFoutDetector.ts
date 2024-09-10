import { useIsomorphicLayoutEffect } from '../helpers/react.js';
import { getWidth } from '../helpers/style.js';
import { flushSync } from 'react-dom';

export function useFoutDetector(
  container: Element | null,
  getElements: (element: Element | null) => Element[] | null,
  handleFout: () => void,
) {
  useIsomorphicLayoutEffect(() => {
    const elements = getElements(container);

    if (!elements) return;

    const widthsAtRender = new Map(
      elements.map(element => [element, getWidth(element)]),
    );

    const resizeObserver = new ResizeObserver(entries => {
      const hasAnElementChangedSignificantly = entries
        .map(entry => widthsAtRender.get(entry.target)! - getWidth(entry.target))
        .some(difference => difference < -0.5 || difference > 0.5);

      hasAnElementChangedSignificantly && flushSync(handleFout);
    });

    elements.forEach(element => resizeObserver.observe(element));

    return () => resizeObserver.disconnect();
  });
}

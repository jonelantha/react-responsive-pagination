import { useCallback, useEffect, useRef, useState } from 'react';

export function useHeightListener(callback: (height: number | null) => void) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const [observeElement, setObserveElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!observeElement || !window.ResizeObserver) return;

    const observer = new ResizeObserver(() =>
      callbackRef.current(observeElement.getBoundingClientRect().height),
    );
    observer.observe(observeElement);

    return () => observer.disconnect();
  }, [observeElement]);

  const ref = useCallback((element: HTMLElement | null) => {
    element && callback(element.getBoundingClientRect().height);

    setObserveElement(element);
  }, []);

  return ref;
}

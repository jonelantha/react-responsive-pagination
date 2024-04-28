import { useContentWidth } from './useContentWidth.js';

export function useAvailableWidth(element: Element | null) {
  return useContentWidth(element?.parentElement ?? undefined);
}

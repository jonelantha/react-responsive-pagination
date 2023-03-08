import { useContentWidth } from './useContentWidth.js';

export function useAvailableWidth(element: HTMLElement | null) {
  return useContentWidth(element?.parentElement ?? undefined);
}

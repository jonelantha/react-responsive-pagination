import { useContentWidth } from './useContentWidth';

export function useAvailableWidth(element: HTMLElement | null) {
  return useContentWidth(element?.parentElement ?? undefined);
}

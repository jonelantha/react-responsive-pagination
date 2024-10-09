import { useContentWidth } from './useContentWidth.js';

export function useAvailableWidth(
  element: Element | null,
  overrideWidth: number | undefined,
) {
  const parentElement = element?.parentElement ?? undefined;

  const width = useContentWidth(
    overrideWidth === undefined ? parentElement : undefined,
  );

  return overrideWidth ?? width;
}

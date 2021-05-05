import { narrowToWideCompositions } from '../compositions';
import { sanatizeInteger } from '../helpers/util';
import { useWidestComposition } from './useWidestComposition';

export function usePaginationItems(
  inputCurrent: number,
  inputTotal: number,
  maxWidth: number | undefined,
) {
  const total = sanatizeInteger(inputTotal);

  const current =
    total < 1 ? null : Math.max(1, Math.min(sanatizeInteger(inputCurrent), total));

  const narrowToWideCompositionsProvider = () =>
    narrowToWideCompositions(current, total);

  return useWidestComposition(narrowToWideCompositionsProvider, maxWidth);
}

import { GetPageWidth } from './pageWidthCalculator.js';
import { GetNavWidth } from './navWidthCalculator.js';
import { CompositionItem } from '../compositionItem.js';

export function createItemWidthCalculator({
  getPageWidth,
  getNavWidth,
  ellipsisWidth,
}: Params) {
  return function itemWidthCalculator({ type, page }: CompositionItem) {
    if (type === 'page' || type === 'active') {
      return getPageWidth(page.toString(), type === 'active');
    }

    if (type === '<' || type === '>') {
      return getNavWidth(type, page !== undefined);
    }

    if (type === '…L' || type === '…R') {
      return ellipsisWidth;
    }

    const _exCheck: never = type;
    return _exCheck;
  };
}

type Params = {
  getPageWidth: GetPageWidth;
  getNavWidth: GetNavWidth;
  ellipsisWidth: number;
};

export type GetItemWidth = ReturnType<typeof createItemWidthCalculator>;

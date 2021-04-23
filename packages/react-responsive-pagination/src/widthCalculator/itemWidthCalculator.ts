import { PaginationItem } from '../paginationItem';
import { GetPageWidth } from './pageWidthCalculator';
import { GetNavWidth } from './navWidthCalculator';

export function createItemWidthCalculator({
  getPageWidth,
  getNavWidth,
  ellipsisWidth,
}: Params) {
  return function itemWidthCalculator(item: PaginationItem) {
    if (item.type === 'page') {
      return getPageWidth(item.page, item.active);
    }

    if (item.type === 'previous' || item.type === 'next') {
      return getNavWidth(item.type, item.page !== undefined);
    }

    if (item.type === 'ellipsis') {
      return ellipsisWidth;
    }

    throw Error(`unknown item: ${item.type}`);
  };
}

type Params = {
  getPageWidth: GetPageWidth;
  getNavWidth: GetNavWidth;
  ellipsisWidth: number;
};

export type GetItemWidth = ReturnType<typeof createItemWidthCalculator>;

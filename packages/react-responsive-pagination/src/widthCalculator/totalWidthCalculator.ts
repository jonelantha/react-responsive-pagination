import { PaginationItem } from '../paginationItem';
import { sum } from '../helpers/util';
import { GetItemWidth } from './itemWidthCalculator';

export function createTotalWidthCalculator({
  getItemWidth,
  outerFrameWidth,
}: Params) {
  return function widthCalculator(items: PaginationItem[]) {
    const itemWidths = items.map(getItemWidth);

    const contentWidth = sum(itemWidths);

    return outerFrameWidth + contentWidth;
  };
}

type Params = {
  getItemWidth: GetItemWidth;
  outerFrameWidth: number;
};

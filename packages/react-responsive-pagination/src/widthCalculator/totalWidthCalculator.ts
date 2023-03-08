import { sum } from '../helpers/util.js';
import { GetItemWidth } from './itemWidthCalculator.js';
import { CompositionItem } from '../compositionItem.js';

export function createTotalWidthCalculator({
  getItemWidth,
  outerFrameWidth,
}: Params) {
  return function widthCalculator(items: CompositionItem[]) {
    const itemWidths = items.map(getItemWidth);

    const contentWidth = sum(itemWidths);

    return outerFrameWidth + contentWidth;
  };
}

type Params = {
  getItemWidth: GetItemWidth;
  outerFrameWidth: number;
};

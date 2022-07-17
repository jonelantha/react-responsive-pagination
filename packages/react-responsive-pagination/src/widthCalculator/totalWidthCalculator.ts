import { sum } from '../helpers/util';
import { GetItemWidth } from './itemWidthCalculator';
import { CompositionItem } from '../compositionItem';

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

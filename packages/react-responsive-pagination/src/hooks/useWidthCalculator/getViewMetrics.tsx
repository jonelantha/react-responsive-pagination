import { objectZip } from '../../helpers/object.js';
import { getNonContentWidth, getElementWidth } from '../../helpers/style.js';

export function getViewMetricsFromContainer<ItemKey extends string>(
  containerElement: Element,
  itemKeys: ItemKey[],
): ViewMetrics<ItemKey> {
  const itemElements = Array.from(containerElement.children);

  return {
    outerFrameWidth: getNonContentWidth(containerElement),
    itemWidths: getItemWidthsFromItemDomElements(itemKeys, itemElements),
  };
}

function getItemWidthsFromItemDomElements<ItemKey extends string>(
  itemKeys: ItemKey[],
  itemElements: Element[],
) {
  const itemWidths = itemElements.map(getElementWidth);

  return objectZip(itemKeys, itemWidths);
}

export type ViewMetrics<ItemKey extends string> = {
  outerFrameWidth: number;
  itemWidths: { [key in ItemKey]: number };
};

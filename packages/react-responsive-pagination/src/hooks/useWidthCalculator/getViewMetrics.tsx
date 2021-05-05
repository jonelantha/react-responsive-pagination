import { objectZip } from '../../helpers/object';
import { getNonContentWidth, getElementWidth } from '../../helpers/style';

export function getViewMetricsFromContainer<ItemKey extends string>(
  containerElement: HTMLElement,
  itemKeys: ItemKey[],
): ViewMetrics<ItemKey> {
  const itemElements = Array.from(containerElement.children) as HTMLElement[];

  return {
    outerFrameWidth: getNonContentWidth(containerElement),
    itemWidths: getItemWidthsFromItemDomElements(itemKeys, itemElements),
  };
}

function getItemWidthsFromItemDomElements<ItemKey extends string>(
  itemKeys: ItemKey[],
  itemElements: HTMLElement[],
) {
  const itemWidths = itemElements.map(getElementWidth);

  return objectZip(itemKeys, itemWidths);
}

export type ViewMetrics<ItemKey extends string> = {
  outerFrameWidth: number;
  itemWidths: { [key in ItemKey]: number };
};

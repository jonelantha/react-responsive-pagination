import { ViewItem } from '../../../view';
import { objectUnzip, objectZip } from '../../../helpers/object';
import { getNonContentWidth, getElementWidth } from '../../../helpers/style';
import { ViewDomProvider } from './ViewDomResolver';

export async function getViewMetrics<ItemKey extends string>(
  getViewDom: ViewDomProvider,
  keyedItemsToMeasure: { [key in ItemKey]: ViewItem },
) {
  const [itemKeys, items] = objectUnzip(keyedItemsToMeasure);

  const viewDom = await getViewDom(items);

  return getViewMetricsFromViewDom(viewDom, itemKeys);
}

function getViewMetricsFromViewDom<ItemKey extends string>(
  viewContainerElement: HTMLElement,
  itemKeys: ItemKey[],
): ViewMetrics<ItemKey> {
  const viewItemElements = Array.from(
    viewContainerElement.children,
  ) as HTMLElement[];

  return {
    outerFrameWidth: getNonContentWidth(viewContainerElement),
    itemWidths: getItemWidthsFromItemDomElements(itemKeys, viewItemElements),
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

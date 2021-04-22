import { ViewItem } from '.';
import { createSkinItem } from '../skins';

export function viewItemToSkinItem(handlePageChange: (page: number) => void) {
  return (viewItem: ViewItem) => {
    if (viewItem.type === 'page') {
      const { active, page } = viewItem;
      return createSkinItem.page(page, active, () => handlePageChange(page));
    }

    if (viewItem.type === 'ellipsis') {
      return createSkinItem.ellipsis(viewItem.position);
    }

    if (viewItem.type === 'previous' || viewItem.type === 'next') {
      const { page, type } = viewItem;
      const onClick = page !== undefined ? () => handlePageChange(page) : undefined;
      return createSkinItem.nav(type, onClick);
    }

    throw new Error(`unknown type ${viewItem.type}`);
  };
}

import { CompositionItem } from './compositionItem';

type BaseItem = {
  type: string;
  key: string;
  label: string;
  a11yLabel?: string;
};

type ClickableItem = BaseItem & {
  gotoPage: number;
  active?: boolean;
};

type NonClickableItem = BaseItem & {
  gotoPage: undefined;
  a11yHidden?: boolean;
};

type PageItem = ClickableItem & {
  type: 'page';
};

type NavItem = ClickableItem & {
  type: NavType;
};

type NavDisabledItem = NonClickableItem & {
  type: NavType;
};

type EllipsisItem = NonClickableItem & {
  type: 'ellipsis';
};

export type PaginationItem = NavItem | NavDisabledItem | EllipsisItem | PageItem;

export type NavType = 'next' | 'previous';

export function compositionToPaginationItems(
  compositionItems: CompositionItem[],
  options?: {
    nextLabel?: string;
    previousLabel?: string;
    renderNav?: boolean;
    a11yActiveLabel: string;
  },
): PaginationItem[] {
  return compositionItems.map(({ type, page }) => {
    switch (type) {
      case '<':
        return {
          type: 'previous',
          key: `previous${page === undefined ? '_disabled' : ''}`,
          label: options?.previousLabel || '«',
          a11yLabel: 'Previous',
          gotoPage: page,
        };
      case '>':
        return {
          type: 'next',
          key: `next${page === undefined ? '_disabled' : ''}`,
          label: options?.nextLabel || '»',
          a11yLabel: 'Next',
          gotoPage: page,
        };
      case '…L':
      case '…R':
        return {
          type: 'ellipsis',
          key: `ellipsis_${type === '…L' ? 'l' : 'r'}`,
          label: '…',
          a11yHidden: true,
          gotoPage: undefined,
        };
      default:
        return {
          type: 'page',
          key: `${type}_${page}`,
          label: page.toString(),
          a11yLabel: (type === 'active' && options?.a11yActiveLabel) || undefined,
          gotoPage: page,
          active: type === 'active',
        };
    }
  });
}

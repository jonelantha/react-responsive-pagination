import { CompositionItem } from './compositionItem';

type BaseItem = {
  type: string;
  key: string;
  label: string;
  a11yLabel?: A11yLabel;
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

export type A11yLabel = { label: string; mode: 'replace' | 'additional' };

export function compositionToPaginationItems(
  compositionItems: CompositionItem[],
  options?: {
    nextLabel?: string;
    previousLabel?: string;
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
          a11yLabel: { label: 'Previous', mode: 'replace' },
          gotoPage: page,
        };
      case '>':
        return {
          type: 'next',
          key: `next${page === undefined ? '_disabled' : ''}`,
          label: options?.nextLabel || '»',
          a11yLabel: { label: 'Next', mode: 'replace' },
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
          a11yLabel:
            type === 'active' && options?.a11yActiveLabel
              ? { label: options?.a11yActiveLabel, mode: 'additional' }
              : undefined,
          gotoPage: page,
          active: type === 'active',
        };
    }
  });
}

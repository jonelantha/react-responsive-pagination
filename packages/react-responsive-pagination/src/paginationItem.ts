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
    previousLabel?: string;
    nextLabel?: string;
    ariaPreviousLabel?: string;
    ariaNextLabel?: string;
    a11yActiveLabel?: string;
  },
): PaginationItem[] {
  const activeLabel = options?.a11yActiveLabel ?? '(current)';
  const previousLabel = options?.previousLabel || '«';
  const a11yPreviousLabel = options?.ariaPreviousLabel || 'Previous';
  const nextLabel = options?.nextLabel || '»';
  const a11yNextLabel = options?.ariaNextLabel || 'Next';

  return compositionItems.map(({ type, page }) => {
    switch (type) {
      case '<':
        return {
          type: 'previous',
          key: `previous${page === undefined ? '_disabled' : ''}`,
          label: previousLabel,
          a11yLabel:
            previousLabel === a11yPreviousLabel
              ? undefined
              : { label: a11yPreviousLabel, mode: 'replace' },
          gotoPage: page,
        };
      case '>':
        return {
          type: 'next',
          key: `next${page === undefined ? '_disabled' : ''}`,
          label: nextLabel,
          a11yLabel:
            nextLabel === a11yNextLabel
              ? undefined
              : { label: a11yNextLabel, mode: 'replace' },
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
            type === 'active' && activeLabel
              ? { label: activeLabel, mode: 'additional' }
              : undefined,
          gotoPage: page,
          active: type === 'active',
        };
    }
  });
}

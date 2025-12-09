import type { ReactNode } from 'react';
import type { CompositionItem } from './compositionItem.ts';

type BaseItem = {
  type: string;
  key: string;
  label: string | ReactNode;
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
    previousLabel?: string | ReactNode;
    nextLabel?: string | ReactNode;
    ariaPreviousLabel?: string;
    ariaNextLabel?: string;
    ariaPageLabel?: (page: number, active: boolean) => string | undefined;
  },
): PaginationItem[] {
  const previousLabel = options?.previousLabel || '«';
  const a11yPreviousLabel = options?.ariaPreviousLabel || 'Previous';
  const nextLabel = options?.nextLabel || '»';
  const a11yNextLabel = options?.ariaNextLabel || 'Next';
  const ariaPageLabel = options?.ariaPageLabel;

  return compositionItems.map(({ type, page }) => {
    switch (type) {
      case '<':
        return {
          type: 'previous',
          key: `previous${page === undefined ? '_disabled' : ''}`,
          label: previousLabel,
          a11yLabel:
            previousLabel === a11yPreviousLabel ? undefined : a11yPreviousLabel,
          gotoPage: page,
        };
      case '>':
        return {
          type: 'next',
          key: `next${page === undefined ? '_disabled' : ''}`,
          label: nextLabel,
          a11yLabel: nextLabel === a11yNextLabel ? undefined : a11yNextLabel,
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
          a11yLabel: ariaPageLabel?.(page, type === 'active'),
          gotoPage: page,
          active: type === 'active',
        };
    }
  });
}

import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import type { CompositionItem } from './compositionItem.ts';
import { preventDefault } from './helpers/dom.ts';

type BaseItem = {
  type: string;
  key: string;
  label: string | ReactNode;
  a11yLabel?: string;
  active?: boolean | undefined;
  gotoPage?: number | undefined;
  listItemProps?: HTMLAttributes<HTMLLIElement> | undefined;
};

type PageItem = BaseItem & {
  type: 'page';
  gotoPage: number;
  active?: boolean;
  anchorProps: AnchorHTMLAttributes<HTMLAnchorElement>;
};

type PreviousNavItem = BaseItem & {
  type: 'previous';
  gotoPage: number | undefined;
  anchorProps: AnchorHTMLAttributes<HTMLAnchorElement>;
};

type NextNavItem = BaseItem & {
  type: 'next';
  gotoPage: number | undefined;
  anchorProps: AnchorHTMLAttributes<HTMLAnchorElement>;
};

type EllipsisItem = BaseItem & {
  type: 'ellipsis';
};

export type PaginationItem = PreviousNavItem | NextNavItem | EllipsisItem | PageItem;

export type NavType = 'next' | 'previous';

export function compositionToPaginationItems(
  compositionItems: CompositionItem[],
  options?: {
    handlePageChange?: (page: number) => void;
    previousLabel?: string | ReactNode;
    nextLabel?: string | ReactNode;
    ariaPreviousLabel?: string;
    ariaNextLabel?: string;
    ariaPageLabel?: (page: number, active: boolean) => string | undefined;
    ariaCurrentAttr?: boolean;
    linkHref?: ((page: number) => string) | 'hash' | 'omit';
  },
): PaginationItem[] {
  const previousLabel = options?.previousLabel || '«';
  const a11yPreviousLabel = options?.ariaPreviousLabel || 'Previous';
  const nextLabel = options?.nextLabel || '»';
  const a11yNextLabel = options?.ariaNextLabel || 'Next';
  const ariaPageLabel = options?.ariaPageLabel;
  const ariaCurrentAttr = options?.ariaCurrentAttr;
  const linkHref = options?.linkHref ?? 'hash';
  const handlePageChange = options?.handlePageChange ?? (() => {});

  return compositionItems.map(({ type, page }) => {
    switch (type) {
      case '<':
      case '>': {
        const fullType = type === '<' ? 'previous' : 'next';
        const label = type === '<' ? previousLabel : nextLabel;
        const optionsA11yLabel = type === '<' ? a11yPreviousLabel : a11yNextLabel;
        const a11yLabel = label === optionsA11yLabel ? undefined : optionsA11yLabel;

        return {
          type: fullType,
          key: `${fullType}${page === undefined ? '_disabled' : ''}`,
          label,
          a11yLabel,
          gotoPage: page,
          anchorProps:
            page === undefined
              ? {
                  'aria-label': a11yLabel,
                  'aria-disabled': 'true',
                  role: 'link',
                }
              : {
                  href: getHref(linkHref, page),
                  onClick: preventDefault(() => handlePageChange(page)),
                  'aria-label': a11yLabel,
                },
        };
      }
      case '…L':
      case '…R':
        return {
          type: 'ellipsis',
          key: `ellipsis_${type === '…L' ? 'l' : 'r'}`,
          label: '…',
          listItemProps: { 'aria-hidden': 'true' },
          gotoPage: undefined,
        };
      default: {
        const a11yLabel = ariaPageLabel?.(page, type === 'active');
        return {
          type: 'page',
          key: `${type}_${page}`,
          label: page.toString(),
          a11yLabel,
          gotoPage: page,
          active: type === 'active',
          listItemProps:
            type === 'active' && ariaCurrentAttr
              ? { 'aria-current': 'page' }
              : undefined,
          anchorProps: {
            href: getHref(linkHref, page),
            onClick: preventDefault(() => handlePageChange(page)),
            'aria-label': a11yLabel,
          },
        };
      }
    }
  });
}

function getHref(
  linkHref: ((page: number) => string) | 'hash' | 'omit',
  page: number,
) {
  if (typeof linkHref === 'function') {
    return linkHref(page);
  } else if (linkHref === 'hash') {
    return '#';
  } else {
    return undefined;
  }
}

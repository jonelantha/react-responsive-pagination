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

export type EllipsisPosition = 'left' | 'right';

export function createNavItem(
  type: NavType,
  gotoPage?: number,
): NavItem | NavDisabledItem {
  return {
    type,
    key: gotoPage === undefined ? type : `${type}_disabled`,
    label: type === 'previous' ? '«' : '»',
    a11yLabel: type === 'previous' ? 'Previous' : 'Next',
    gotoPage,
  };
}

export function createPageItem(page: number, active: boolean): PageItem {
  return {
    type: 'page',
    key: active ? `page_${page}` : `active_${page}`,
    label: page.toString(),
    a11yLabel: active ? '(current)' : undefined,
    gotoPage: page,
    active,
  };
}

export function createEllipsisItem(position: EllipsisPosition): EllipsisItem {
  return {
    type: 'ellipsis',
    key: `ellipsis_${position}`,
    label: '…',
    a11yHidden: true,
    gotoPage: undefined,
  };
}

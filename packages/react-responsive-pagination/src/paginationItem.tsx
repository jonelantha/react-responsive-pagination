export type PaginationItem = {
  type: 'page' | 'ellipsis' | 'next' | 'previous';
  key: string;
  gotoPage?: number;
  label: string;
  active?: boolean;
  a11yLabel?: string;
  a11yHidden?: boolean;
};

export type NavType = 'next' | 'previous';

export type EllipsisPosition = 'left' | 'right';

export function createNavItem(type: NavType, gotoPage?: number): PaginationItem {
  return {
    type,
    key: gotoPage === undefined ? type : `${type}_disabled`,
    label: type === 'previous' ? '«' : '»',
    a11yLabel: type === 'previous' ? 'Previous' : 'Next',
    gotoPage,
  };
}

export function createPageItem(page: number, active: boolean): PaginationItem {
  return {
    type: 'page',
    key: active ? `page_${page}` : `active_${page}`,
    label: page.toString(),
    a11yLabel: active ? '(current)' : undefined,
    gotoPage: page,
    active,
  };
}

export function createEllipsisItem(position: EllipsisPosition): PaginationItem {
  return {
    type: 'ellipsis',
    key: `ellipsis_${position}`,
    label: '…',
    a11yHidden: true,
  };
}

export type PaginationItem = Page | Nav | Ellipsis;

type Page = {
  type: 'page';
  active: boolean;
  page: number;
  key: string;
};

type Nav = {
  type: NavType;
  page?: number;
  key: string;
};

type Ellipsis = {
  type: 'ellipsis';
  position: EllipsisPosition;
  key: string;
};

export type NavType = 'next' | 'previous';

export type EllipsisPosition = 'left' | 'right';

export function createNavItem(type: NavType, page?: number): Nav {
  return {
    type,
    page,
    key: page === undefined ? type : `${type}_disabled`,
  };
}

export function createPageItem(page: number, active: boolean): Page {
  return {
    type: 'page',
    page,
    active,
    key: active ? `page_${page}` : `active_${page}`,
  };
}

export function createEllipsisItem(position: EllipsisPosition): Ellipsis {
  return {
    type: 'ellipsis',
    position,
    key: `ellipsis_${position}`,
  };
}

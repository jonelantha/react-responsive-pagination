import { ViewItem, EllipsisPosition, NavType } from '.';

export const createViewItem = {
  nav: (type: NavType, page?: number): ViewItem => ({
    type,
    page,
  }),

  page: (page: number, active: boolean): ViewItem => ({
    type: 'page',
    page,
    active,
  }),

  ellipsis: (position: EllipsisPosition): ViewItem => ({
    type: 'ellipsis',
    position,
  }),
};

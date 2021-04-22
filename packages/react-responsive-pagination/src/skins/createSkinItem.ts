import { SkinItem, NavType } from '.';

export const createSkinItem = {
  page: (page: number, active: boolean, onClick: () => void): SkinItem => ({
    type: 'page',
    key: active ? `page_${page}` : `active_${page}`,
    label: page.toString(),
    onClick,
    active,
  }),

  ellipsis: (position: string): SkinItem => ({
    type: 'ellipsis',
    key: `ellipsis_${position}`,
  }),

  nav: (type: NavType, onClick?: () => void): SkinItem => ({
    type,
    onClick,
    key: onClick ? type : `${type}_disabled`,
  }),
};

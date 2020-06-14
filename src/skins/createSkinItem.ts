import { SkinItem, NavType } from '.';
import { MouseEventHandler } from 'react';

export const createSkinItem = {
  page: (
    page: number,
    active: boolean,
    onClick: MouseEventHandler<HTMLAnchorElement>,
  ): SkinItem => ({
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

  nav: (
    type: NavType,
    onClick?: MouseEventHandler<HTMLAnchorElement>,
  ): SkinItem => ({
    type,
    onClick,
    key: onClick ? type : `${type}_disabled`,
  }),
};

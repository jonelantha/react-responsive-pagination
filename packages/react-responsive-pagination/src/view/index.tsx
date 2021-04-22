export { createViewItem } from './createViewItem';

export type ViewItem = Page | Nav | Ellipsis;

export type PageChangeHandler = (page: number) => void;

type Page = {
  type: 'page';
  active: boolean;
  page: number;
};

type Nav = {
  type: NavType;
  page?: number;
};

type Ellipsis = {
  type: 'ellipsis';
  position: EllipsisPosition;
};

export type NavType = 'next' | 'previous';

export type EllipsisPosition = 'left' | 'right';

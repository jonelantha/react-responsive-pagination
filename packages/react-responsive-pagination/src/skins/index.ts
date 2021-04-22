export { createSkinItem } from './createSkinItem';

export type SkinItem = { key: string } & (Page | Nav | Ellipsis);

type Page = {
  type: 'page';
  active: boolean;
  label: string;
  onClick: () => void;
};

type Nav = {
  type: NavType;
  onClick?: () => void;
};

type Ellipsis = {
  type: 'ellipsis';
};

export type NavType = 'next' | 'previous';

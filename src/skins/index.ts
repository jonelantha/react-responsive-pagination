import { Ref, MouseEventHandler } from 'react';

export { default as BootstrapSkin } from './BootstrapSkin';

export { createSkinItem } from './createSkinItem';

export type SkinComponent = React.ComponentType<{
  ref?: Ref<HTMLElement>;
  items: SkinItem[];
}>;

export type SkinItem = { key: string } & (Page | Nav | Ellipsis);

type Page = {
  type: 'page';
  active: boolean;
  label: string;
  onClick: MouseEventHandler<HTMLAnchorElement>;
};

type Nav = {
  type: NavType;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

type Ellipsis = {
  type: 'ellipsis';
};

export type NavType = 'next' | 'previous';

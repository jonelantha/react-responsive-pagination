import React, { memo } from 'react';
import { narrowToWideCompositions } from './compositions';
import { BootstrapSkin, SkinComponent } from './skins';
import { useView, PageChangeHandler } from './view';
import MaxWidthRenderer from './renderers/MaxWidthRenderer';

export { SkinComponent };

export default memo(Pagination);

function Pagination({
  current: propsCurrent,
  total,
  onPageChange: handlePageChange,
  maxWidth,
  skin: propsSkin,
}: Props) {
  const current = Math.min(propsCurrent, total);

  const Skin = createSkin(propsSkin);

  const View = useView(Skin, handlePageChange);

  const narrowToWideCompositionsProvider = () =>
    narrowToWideCompositions(current, total);

  return maxWidth ? (
    <MaxWidthRenderer {...{ maxWidth, narrowToWideCompositionsProvider, View }} />
  ) : null;
}

type Props = {
  current: number;
  total: number;
  onPageChange: PageChangeHandler;
  maxWidth?: number;
  skin?: SkinName | SkinComponent;
};

function createSkin(skin?: SkinName | SkinComponent) {
  switch (skin) {
    case 'bootstrap':
    default:
      return BootstrapSkin;
  }
}

type SkinName = 'bootstrap';

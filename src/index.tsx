import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { narrowToWideCompositions } from './compositions';
import { BootstrapSkin, SkinComponent } from './skins';
import { useView, PageChangeHandler } from './view';
import MaxWidthRenderer from './renderers/MaxWidthRenderer';

export { SkinComponent };

export default memo(Pagination);

function Pagination({
  current: propsCurrent,
  total: propsTotal,
  onPageChange: handlePageChange,
  maxWidth = 0,
}: Props) {
  const total = propsTotal ?? 0;

  const current = Math.max(1, Math.min(propsCurrent ?? 0, total));

  const Skin = BootstrapSkin;

  const View = useView(Skin, handlePageChange);

  const narrowToWideCompositionsProvider = () =>
    narrowToWideCompositions(current, total);

  return total > 0 ? (
    <MaxWidthRenderer {...{ maxWidth, narrowToWideCompositionsProvider, View }} />
  ) : null;
}

type Props = {
  current: number;
  total: number;
  onPageChange: PageChangeHandler;
  maxWidth?: number;
};

Pagination.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  maxWidth: PropTypes.number,
};

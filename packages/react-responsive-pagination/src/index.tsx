import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { narrowToWideCompositions } from './compositions';
import { BootstrapSkin, SkinComponent } from './skins';
import { useView, PageChangeHandler } from './view';
import AutoWidthRenderer from './renderers/AutoWidthRenderer';
import MaxWidthRenderer from './renderers/MaxWidthRenderer';
import { sanatizeInteger } from './helpers/util';

export { SkinComponent };

export default memo(Pagination);

function Pagination({
  current: propsCurrent,
  total: propsTotal,
  onPageChange: handlePageChange,
  maxWidth,
}: Props) {
  const total = sanatizeInteger(propsTotal);

  const current = Math.max(1, Math.min(sanatizeInteger(propsCurrent), total));

  const Skin = BootstrapSkin;

  const View = useView(Skin, handlePageChange);

  const narrowToWideCompositionsProvider = () =>
    narrowToWideCompositions(current, total);

  if (total <= 0) {
    return null;
  } else if (maxWidth === undefined) {
    return <AutoWidthRenderer {...{ narrowToWideCompositionsProvider, View }} />;
  } else {
    return (
      <MaxWidthRenderer {...{ maxWidth, narrowToWideCompositionsProvider, View }} />
    );
  }
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

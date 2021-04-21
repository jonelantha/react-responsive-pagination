import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { narrowToWideCompositions } from './compositions';
import { BootstrapSkin, SkinComponent } from './skins';
import { useView, PageChangeHandler } from './view';
import { sanatizeInteger } from './helpers/util';
import { useWidestComposition } from './hooks/useWidestComposition';

export { SkinComponent };

export default memo(Pagination);

function Pagination({
  current: propsCurrent,
  total: propsTotal,
  onPageChange: handlePageChange,
  maxWidth,
}: Props) {
  const total = sanatizeInteger(propsTotal);

  const current =
    total < 1 ? null : Math.max(1, Math.min(sanatizeInteger(propsCurrent), total));

  const Skin = BootstrapSkin;

  const View = useView(Skin, handlePageChange);

  const narrowToWideCompositionsProvider = () =>
    narrowToWideCompositions(current, total);

  const { items, ref } = useWidestComposition(
    narrowToWideCompositionsProvider,
    maxWidth,
  );

  return items.length > 0 ? <View items={items} ref={ref} /> : null;
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

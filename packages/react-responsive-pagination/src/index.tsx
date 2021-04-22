import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { BootstrapSkin, SkinComponent } from './skins';
import { useView, PageChangeHandler } from './view';
import { usePaginationItems } from './hooks/usePaginationItems';

export { SkinComponent };

export default memo(Pagination);

function Pagination({
  current,
  total,
  onPageChange: handlePageChange,
  maxWidth,
}: Props) {
  const { items, ref } = usePaginationItems(current, total, maxWidth);

  const View = useView(BootstrapSkin, handlePageChange);

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

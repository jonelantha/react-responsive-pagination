import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { BootstrapSkin } from './skins';
import { PageChangeHandler } from './view';
import { usePaginationItems } from './hooks/usePaginationItems';
import { viewItemToSkinItem } from './view/viewItemToSkinItem';

export default memo(Pagination);

function Pagination({
  current,
  total,
  onPageChange: handlePageChange,
  maxWidth,
}: Props) {
  const { items, ref } = usePaginationItems(current, total, maxWidth);

  const skinItems = items.map(viewItemToSkinItem(handlePageChange));

  return items.length > 0 ? <BootstrapSkin items={skinItems} ref={ref} /> : null;
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

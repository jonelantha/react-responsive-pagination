import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { usePaginationItems } from './hooks/usePaginationItems';
import { preventDefault } from './helpers/dom';

export default memo(BootstrapPagination);

/* eslint-disable jsx-a11y/anchor-is-valid */

function BootstrapPagination({
  current,
  total,
  onPageChange: handlePageChange,
  maxWidth,
}: BootstrapPaginationProps) {
  const { items, ref } = usePaginationItems(current, total, maxWidth);

  if (items.length === 0) return null;

  return (
    <ul className="pagination justify-content-center" ref={ref}>
      {items.map(item =>
        item.gotoPage !== undefined ? (
          // item = ClickableItem
          <li key={item.key} className={`page-item${item.active ? ' active' : ''}`}>
            <a
              className="page-link"
              href="#"
              onClick={preventDefault(() => handlePageChange(item.gotoPage))}
              aria-label={item.a11yLabel}
            >
              {getLabel(item.label, item.a11yLabel)}
            </a>
          </li>
        ) : (
          // item = NonClickableItem
          <li
            key={item.key}
            className="page-item disabled"
            aria-hidden={item.a11yHidden}
          >
            <span className="page-link">{getLabel(item.label, item.a11yLabel)}</span>
          </li>
        ),
      )}
    </ul>
  );
}

type BootstrapPaginationProps = {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
  maxWidth?: number;
};

BootstrapPagination.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  maxWidth: PropTypes.number,
};

function getLabel(label: string, a11yLabel: string | undefined) {
  return a11yLabel ? (
    <>
      <span aria-hidden="true">{label}</span>
      <span className="sr-only">{a11yLabel}</span>
    </>
  ) : (
    label
  );
}

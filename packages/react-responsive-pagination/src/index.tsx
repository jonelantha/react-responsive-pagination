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
      {items.map(({ key, gotoPage, label, a11yLabel, active, a11yHidden }) =>
        gotoPage === undefined ? (
          // non clickable item
          <li className="page-item disabled" aria-hidden={a11yHidden} key={key}>
            <span className="page-link">{getLabel(label, a11yLabel)}</span>
          </li>
        ) : (
          // clickable item
          <li className={`page-item${active ? ' active' : ''}`} key={key}>
            <a
              className="page-link"
              href="#"
              onClick={preventDefault(() => handlePageChange(gotoPage))}
              aria-label={a11yLabel}
            >
              {getLabel(label, a11yLabel)}
            </a>
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

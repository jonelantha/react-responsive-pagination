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
    <ul
      className="pagination justify-content-center"
      ref={ref as React.Ref<HTMLUListElement>}
    >
      {items.map(item => {
        switch (item.type) {
          case 'ellipsis':
            return (
              <li className="page-item disabled" aria-hidden={true} key={item.key}>
                <span className="page-link">…</span>
              </li>
            );
          case 'page':
            if (item.active) {
              return (
                <li className="page-item active" key={item.key}>
                  <a
                    className="page-link"
                    href="#"
                    onClick={preventDefault(() => handlePageChange(item.page))}
                    aria-label="(current)"
                  >
                    <span aria-hidden="true">{item.page}</span>
                    <span className="sr-only">(current)</span>
                  </a>
                </li>
              );
            } else {
              return (
                <li className="page-item" key={item.key}>
                  <a
                    className="page-link"
                    href="#"
                    onClick={preventDefault(() => handlePageChange(item.page))}
                  >
                    {item.page}
                  </a>
                </li>
              );
            }
          case 'previous':
          case 'next':
            const label = item.type === 'previous' ? '«' : '»';
            const a11yLabel = item.type === 'previous' ? 'Previous' : 'Next';

            if (item.page) {
              return (
                <li className="page-item" key={item.key}>
                  <a
                    className="page-link"
                    href="#"
                    onClick={preventDefault(() => handlePageChange(item.page!))}
                    aria-label={a11yLabel}
                  >
                    <span aria-hidden="true">{label}</span>
                    <span className="sr-only">{a11yLabel}</span>
                  </a>
                </li>
              );
            } else {
              return (
                <li className="page-item disabled" key={item.key}>
                  <span className="page-link">
                    <span aria-hidden="true">{label}</span>
                    <span className="sr-only">{a11yLabel}</span>
                  </span>
                </li>
              );
            }
          default:
            return null;
        }
      })}
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

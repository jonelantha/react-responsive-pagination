import React, { memo, MouseEventHandler } from 'react';
import PropTypes from 'prop-types';
import { PageChangeHandler } from './view';
import { usePaginationItems } from './hooks/usePaginationItems';
import { viewItemToSkinItem } from './view/viewItemToSkinItem';

export default memo(BootstrapPagination);

/* eslint-disable jsx-a11y/anchor-is-valid */

function BootstrapPagination({
  current,
  total,
  onPageChange: handlePageChange,
  maxWidth,
}: BootstrapPaginationProps) {
  const { items, ref } = usePaginationItems(current, total, maxWidth);

  const skinItems = items.map(viewItemToSkinItem(handlePageChange));

  if (skinItems.length === 0) return null;

  return (
    <ul
      className="pagination justify-content-center"
      ref={ref as React.Ref<HTMLUListElement>}
    >
      {skinItems.map(item => {
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
                    onClick={preventDefault(item.onClick)}
                    aria-label="(current)"
                  >
                    <span aria-hidden="true">{item.label}</span>
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
                    onClick={preventDefault(item.onClick)}
                  >
                    {item.label}
                  </a>
                </li>
              );
            }
          case 'previous':
          case 'next':
            const label = item.type === 'previous' ? '«' : '»';
            const a11yLabel = item.type === 'previous' ? 'Previous' : 'Next';

            if (item.onClick) {
              return (
                <li className="page-item" key={item.key}>
                  <a
                    className="page-link"
                    href="#"
                    onClick={preventDefault(item.onClick!)}
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

function preventDefault(handler: () => void): MouseEventHandler {
  return e => {
    e.preventDefault();
    handler();
  };
}

type BootstrapPaginationProps = {
  current: number;
  total: number;
  onPageChange: PageChangeHandler;
  maxWidth?: number;
};

BootstrapPagination.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  maxWidth: PropTypes.number,
};

import React, { memo, MouseEventHandler } from 'react';
import PropTypes from 'prop-types';
import { PageChangeHandler } from './view';
import { usePaginationItems } from './hooks/usePaginationItems';
import { viewItemToSkinItem } from './view/viewItemToSkinItem';

export default memo(BootstrapPagination);

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
              <BootstrapPaginationItem
                key={item.key}
                label={'…'}
                a11yHidden={true}
              />
            );
          case 'page':
            return (
              <BootstrapPaginationItem
                key={item.key}
                onClick={item.onClick}
                isActive={item.active}
                label={item.label}
                a11yLabel={item.active ? '(current)' : undefined}
              />
            );
          case 'previous':
          case 'next':
            return (
              <BootstrapPaginationItem
                key={item.key}
                onClick={item.onClick}
                label={item.type === 'previous' ? '«' : '»'}
                a11yLabel={item.type === 'previous' ? 'Previous' : 'Next'}
              />
            );
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
  onPageChange: PageChangeHandler;
  maxWidth?: number;
};

BootstrapPagination.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  maxWidth: PropTypes.number,
};

/* eslint-disable jsx-a11y/anchor-is-valid */

function BootstrapPaginationItem({
  label,
  onClick: handleClick,
  isActive = false,
  a11yLabel,
  a11yHidden,
}: BootstrapPaginationItemProps) {
  return (
    <li
      className={`page-item${isActive ? ' active' : ''}${
        !handleClick ? ' disabled' : ''
      }`}
      aria-hidden={a11yHidden}
    >
      {handleClick ? (
        <a
          className="page-link"
          href="#"
          onClick={handleClick}
          aria-label={a11yLabel}
        >
          {getContent(label, a11yLabel)}
        </a>
      ) : (
        <span className="page-link">{getContent(label, a11yLabel)}</span>
      )}
    </li>
  );
}

type BootstrapPaginationItemProps = {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  isActive?: Boolean;
  label: string;
  a11yLabel?: string;
  a11yHidden?: boolean;
};

function getContent(label: string, a11yLabel?: string) {
  return a11yLabel ? (
    <>
      <span aria-hidden="true">{label}</span>
      <span className="sr-only">{a11yLabel}</span>
    </>
  ) : (
    label
  );
}

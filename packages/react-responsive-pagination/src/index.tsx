import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePaginationItems } from './hooks/usePaginationItems';
import { preventDefault } from './helpers/dom';
import { NarrowStrategy } from './compositions';

export default memo(BootstrapPagination);

/* eslint-disable jsx-a11y/anchor-is-valid */

function BootstrapPagination({
  current,
  total,
  onPageChange: handlePageChange,
  maxWidth,
  narrowStrategy,
  className,
  extraClassName = 'justify-content-center',
  pageItemClassName = 'page-item',
  pageLinkClassName = 'page-link',
  activeItemClassName = 'active',
  disabledItemClassName = 'disabled',
  srOnlyClassName = 'sr-only',
  previousLabel,
  nextLabel,
}: BootstrapPaginationProps) {
  const { items, ref, clearCache } = usePaginationItems(current, total, maxWidth, {
    narrowStrategy,
    previousLabel,
    nextLabel,
  });

  useEffect(() => {
    return () => clearCache();
  }, [
    clearCache,
    className,
    pageItemClassName,
    pageLinkClassName,
    activeItemClassName,
    disabledItemClassName,
    srOnlyClassName,
  ]);

  if (items.length === 0) return null;

  function getContainerClassName() {
    if (className !== undefined) {
      return className;
    } else if (extraClassName) {
      return `pagination ${extraClassName}`;
    } else {
      return 'pagination';
    }
  }

  function getLabel(label: string, a11yLabel: string | undefined) {
    return a11yLabel ? (
      <>
        <span aria-hidden="true">{label}</span>
        {srOnlyClassName && <span className={srOnlyClassName}>{a11yLabel}</span>}
      </>
    ) : (
      label
    );
  }

  return (
    <ul className={getContainerClassName()} ref={ref}>
      {items.map(item =>
        item.gotoPage !== undefined ? (
          // item = ClickableItem
          <li
            key={item.key}
            className={`${pageItemClassName}${
              item.active && activeItemClassName ? ' ' + activeItemClassName : ''
            }`}
          >
            <a
              className={pageLinkClassName}
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
            className={`${pageItemClassName} ${disabledItemClassName}`}
            aria-hidden={item.a11yHidden}
          >
            <span className={pageLinkClassName} aria-label={item.a11yLabel}>
              {getLabel(item.label, item.a11yLabel)}
            </span>
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
  narrowStrategy?: NarrowStrategy | NarrowStrategy[];
  className?: string;
  extraClassName?: string;
  pageItemClassName?: string;
  pageLinkClassName?: string;
  activeItemClassName?: string;
  disabledItemClassName?: string;
  disabledLinkClassName?: string;
  srOnlyClassName?: string;
  previousLabel?: string;
  nextLabel?: string;
};

BootstrapPagination.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  maxWidth: PropTypes.number,
  narrowStrategy: PropTypes.oneOfType([
    PropTypes.oneOf(['dropEllipsis', 'dropNav']),
    PropTypes.arrayOf(PropTypes.oneOf(['dropEllipsis', 'dropNav']).isRequired),
  ]),
  className: PropTypes.string,
  extraClassName: PropTypes.string,
  pageItemClassName: PropTypes.string,
  pageLinkClassName: PropTypes.string,
  activeItemClassName: PropTypes.string,
  disabledItemClassName: PropTypes.string,
  disabledLinkClassName: PropTypes.string,
  srOnlyClassName: PropTypes.string,
  previousLabel: PropTypes.string,
  nextLabel: PropTypes.string,
};

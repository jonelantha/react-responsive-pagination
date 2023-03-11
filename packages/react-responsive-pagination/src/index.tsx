import { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePaginationItems } from './hooks/usePaginationItems.js';
import { preventDefault } from './helpers/dom.js';
import { NarrowStrategy } from './compositions/index.js';
import { A11yLabel } from './paginationItem.js';

export const v1_bootstrap4PaginationPreset = {
  ariaCurrentAttr: false,
  a11yActiveLabel: '(current)',
  srOnlyClassName: 'sr-only',
};

export const bootstrap4PaginationPreset = {};

export const bootstrap5PaginationPreset = {};

export default memo(ResponsivePagination);

/* eslint-disable jsx-a11y/anchor-is-valid */

function ResponsivePagination({
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
  srOnlyClassName,
  previousLabel,
  nextLabel,
  ariaPreviousLabel,
  ariaNextLabel,
  renderNav = true,
  a11yActiveLabel,
  ariaCurrentAttr = true,
  linkHref = 'hash',
}: ResponsivePaginationProps) {
  const { items, ref, clearCache } = usePaginationItems(current, total, maxWidth, {
    narrowStrategy,
    previousLabel,
    nextLabel,
    ariaPreviousLabel,
    ariaNextLabel,
    renderNav,
    a11yActiveLabel,
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

  function getLabel(label: string, a11yLabel: A11yLabel | undefined) {
    return (
      <>
        {!a11yLabel || a11yLabel.mode === 'additional' ? (
          label
        ) : (
          <span aria-hidden="true">{label}</span>
        )}
        {a11yLabel && srOnlyClassName && (
          <span className={srOnlyClassName}>
            {`${a11yLabel.mode === 'additional' ? ' ' : ''}${a11yLabel.label}`}
          </span>
        )}
      </>
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
            aria-current={item.active && ariaCurrentAttr ? 'page' : undefined}
          >
            <a
              className={pageLinkClassName}
              href={linkHref === 'hash' ? '#' : undefined}
              onClick={preventDefault(() => handlePageChange(item.gotoPage))}
              aria-label={
                item.a11yLabel?.mode === 'replace' ? item.a11yLabel.label : undefined
              }
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
            <span
              className={pageLinkClassName}
              aria-label={
                item.a11yLabel?.mode === 'replace' ? item.a11yLabel.label : undefined
              }
            >
              {getLabel(item.label, item.a11yLabel)}
            </span>
          </li>
        ),
      )}
    </ul>
  );
}

type ResponsivePaginationProps = {
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
  ariaPreviousLabel?: string;
  ariaNextLabel?: string;
  renderNav?: boolean;
  a11yActiveLabel?: string;
  ariaCurrentAttr?: boolean;
  linkHref?: 'hash' | 'omit';
};

ResponsivePagination.propTypes = {
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
  ariaPreviousLabel: PropTypes.string,
  ariaNextLabel: PropTypes.string,
  renderNav: PropTypes.bool,
  a11yActiveLabel: PropTypes.string,
  ariaCurrentAttr: PropTypes.bool,
  linkHref: PropTypes.oneOf(['hash', 'omit']),
};

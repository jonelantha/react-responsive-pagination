import { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePaginationItems } from './hooks/usePaginationItems.js';
import { preventDefault } from './helpers/dom.js';
import { NarrowBehaviour } from './narrowBehaviour.js';
import { defaultLabelBehaviour, LabelBehaviour } from './labelBehaviour.js';

/* legacy - may be removed */
export const bootstrap4PaginationPreset = {};
export const bootstrap5PaginationPreset = {};

declare const process: { env: { NODE_ENV: string } };

export default process.env.NODE_ENV !== 'production'
  ? memo(ResponsivePaginationDev)
  : memo(ResponsivePagination);

function ResponsivePaginationDev(props: ResponsivePaginationProps) {
  checkLegacyProps(props);

  return ResponsivePagination(props);
}

/* eslint-disable jsx-a11y/anchor-is-valid */

function ResponsivePagination({
  current,
  total,
  onPageChange: handlePageChange,
  maxWidth,
  narrowBehaviour,
  className,
  extraClassName = 'justify-content-center',
  pageItemClassName = 'page-item',
  pageLinkClassName = 'page-link',
  activeItemClassName = 'active',
  disabledItemClassName = 'disabled',
  previousLabel,
  nextLabel,
  ariaPreviousLabel,
  ariaNextLabel,
  renderNav = true,
  ariaCurrentAttr = true,
  linkHref = 'hash',
  labelBehaviour: getLabel = defaultLabelBehaviour,
}: ResponsivePaginationProps) {
  const { items, ref, clearCache } = usePaginationItems(current, total, maxWidth, {
    narrowBehaviour,
    previousLabel,
    nextLabel,
    ariaPreviousLabel,
    ariaNextLabel,
    renderNav,
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
              aria-label={item.a11yLabel}
            >
              {getLabel(item)}
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
              {getLabel(item)}
            </span>
          </li>
        ),
      )}
    </ul>
  );
}

export type ResponsivePaginationProps = {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
  maxWidth?: number;
  narrowBehaviour?: NarrowBehaviour;
  className?: string;
  extraClassName?: string;
  pageItemClassName?: string;
  pageLinkClassName?: string;
  activeItemClassName?: string;
  disabledItemClassName?: string;
  disabledLinkClassName?: string;
  previousLabel?: string;
  nextLabel?: string;
  ariaPreviousLabel?: string;
  ariaNextLabel?: string;
  renderNav?: boolean;
  ariaCurrentAttr?: boolean;
  linkHref?: 'hash' | 'omit';
  labelBehaviour?: LabelBehaviour;
};

ResponsivePagination.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  maxWidth: PropTypes.number,
  narrowBehaviour: PropTypes.func,
  className: PropTypes.string,
  extraClassName: PropTypes.string,
  pageItemClassName: PropTypes.string,
  pageLinkClassName: PropTypes.string,
  activeItemClassName: PropTypes.string,
  disabledItemClassName: PropTypes.string,
  disabledLinkClassName: PropTypes.string,
  previousLabel: PropTypes.string,
  nextLabel: PropTypes.string,
  ariaPreviousLabel: PropTypes.string,
  ariaNextLabel: PropTypes.string,
  renderNav: PropTypes.bool,
  ariaCurrentAttr: PropTypes.bool,
  linkHref: PropTypes.oneOf(['hash', 'omit']),
  labelBehaviour: PropTypes.func,
};

const legacyUsageWarnings: string[] = [];

function checkLegacyProps(props: { [key in string]: any }) {
  for (const legacyProp of [
    'srOnlyClassName',
    'a11yActiveLabel',
    'narrowStrategy',
  ]) {
    if (
      props[legacyProp] !== undefined &&
      !legacyUsageWarnings.includes(legacyProp)
    ) {
      console.warn(
        `react-responsive-pagination: '${legacyProp}' prop no longer supported, please see migration guide: https://react-responsive-pagination.elantha.com/migration/`,
      );
      legacyUsageWarnings.push(legacyProp);
    }
  }
}

'use client';

// Client boundary: keep the directive on this module rather than on index.tsx,
// and don't add `export *` here (see the note in index.tsx).

import React, { memo, useEffect } from 'react';
import type { ReactNode, FC } from 'react';
import PropTypes from 'prop-types';
import { usePaginationItems } from './hooks/usePaginationItems.ts';
import type { PaginationItem } from './paginationItem.ts';
import type { NarrowBehaviour } from './narrowBehaviour.ts';
import type { LabelBehaviour } from './labelBehaviour.ts';
import { defaultLabelBehaviour } from './labelBehaviour.ts';
import { incRenderCount } from './debug.ts';

declare const process: { env: { NODE_ENV: string } };

/**
 * @public
 */
const ResponsivePaginationComponent: FC<ResponsivePaginationProps> =
  memo(ResponsivePagination);
export default ResponsivePaginationComponent;

function ResponsivePagination(props: ResponsivePaginationProps) {
  incRenderCount();

  if (process.env.NODE_ENV !== 'production') {
    checkLegacyProps(props);
  }

  const {
    current,
    total,
    onPageChange: handlePageChange,
    maxWidth,
    narrowBehaviour,
    className,
    containerClassName,
    extraClassName = 'justify-content-center',
    pageItemClassName = 'page-item',
    pageLinkClassName = 'page-link',
    activeItemClassName = 'active',
    inactiveItemClassName = '',
    disabledItemClassName = 'disabled',
    navClassName,
    previousClassName,
    nextClassName,
    classMerge = defaultClassMerge,
    previousLabel,
    nextLabel,
    ariaPreviousLabel,
    ariaNextLabel,
    ariaPageLabel,
    renderNav = 'anchor-disabled-span',
    ariaCurrentAttr = true,
    linkHref = 'hash',
    labelBehaviour: getLabel = defaultLabelBehaviour,
  } = props;

  const { visible, items, ref, clearCache } = usePaginationItems(current, total, {
    handlePageChange,
    previousLabel,
    nextLabel,
    ariaPreviousLabel,
    ariaNextLabel,
    ariaPageLabel,
    ariaCurrentAttr,
    linkHref,
    maxWidth,
    omitNav: ['none', false].includes(renderNav),
    narrowBehaviour,
  });

  useEffect(() => {
    return () => clearCache();
  }, [
    clearCache,
    className,
    containerClassName,
    pageItemClassName,
    pageLinkClassName,
    activeItemClassName,
    inactiveItemClassName,
    disabledItemClassName,
    navClassName,
    previousClassName,
    nextClassName,
    classMerge,
  ]);

  if (items.length === 0) return null;

  function getContainerClassName() {
    if (className !== undefined) {
      return className;
    } else if (containerClassName !== undefined) {
      return containerClassName;
    } else if (extraClassName) {
      return `pagination ${extraClassName}`;
    } else {
      return 'pagination';
    }
  }

  function getListItemClassName(item: PaginationItem) {
    return classNames(classMerge, [
      pageItemClassName,
      item.gotoPage === undefined
        ? disabledItemClassName
        : item.active
          ? activeItemClassName
          : inactiveItemClassName,
      item.type === 'next' && (nextClassName ?? navClassName),
      item.type === 'previous' && (previousClassName ?? navClassName),
    ]);
  }

  return (
    <ul
      className={getContainerClassName()}
      ref={ref}
      {...(!visible && { style: { visibility: 'hidden' } })}
    >
      {items.map(item => (
        <li
          key={item.key}
          className={getListItemClassName(item)}
          {...item.listItemProps}
        >
          {item.type === 'previous' || item.type === 'next' ? (
            renderNav === 'button' ? (
              <button className={pageLinkClassName} {...item.buttonProps}>
                {getLabel(item)}
              </button>
            ) : item.gotoPage !== undefined || renderNav === 'anchor' ? (
              <a className={pageLinkClassName} {...item.anchorProps}>
                {getLabel(item)}
              </a>
            ) : (
              <span className={pageLinkClassName} {...item.spanAsAnchorProps}>
                {getLabel(item)}
              </span>
            )
          ) : item.type === 'ellipsis' ? (
            <span className={pageLinkClassName}>{getLabel(item)}</span>
          ) : (
            // page
            <a className={pageLinkClassName} {...item.anchorProps}>
              {getLabel(item)}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

function classNames(
  classMerge: (classNames: string[]) => string,
  names: (string | false | undefined)[],
) {
  return classMerge(names.filter((name): name is string => Boolean(name)));
}

const defaultClassMerge = (classNames: string[]) => classNames.join(' ');

/**
 * @public
 */
export type ResponsivePaginationProps = {
  /**
   * The current active page, starting at 1. This is a controlled component:
   * update this value from `onPageChange`.
   *
   * @see https://react-responsive-pagination.elantha.com/props#current
   */
  current: number;
  /**
   * The total number of pages, for example `Math.ceil(totalItems / pageSize)`.
   * Nothing is rendered when this is less than 1.
   *
   * @see https://react-responsive-pagination.elantha.com/props#total
   */
  total: number;
  /**
   * Called with the new page (starting at 1) when the user selects a page. The
   * active page only changes when `current` is updated.
   *
   * @see https://react-responsive-pagination.elantha.com/props#onPageChange
   */
  onPageChange: (page: number) => void;
  /**
   * Maximum width in pixels. Overrides the automatic sizing; the width may be
   * exceeded if the component cannot fit.
   *
   * @see https://react-responsive-pagination.elantha.com/props#maxWidth
   */
  maxWidth?: number;
  /**
   * Which elements can be dropped at very narrow widths. Use `dropEllipsis`,
   * `dropNav` or `dropFirstAndLast` from
   * `react-responsive-pagination/narrowBehaviour`, or `combine(...)` to use more
   * than one.
   *
   * @defaultValue No elements are dropped
   * @see https://react-responsive-pagination.elantha.com/props#narrowBehaviour
   */
  narrowBehaviour?: NarrowBehaviour;
  /**
   * Alias for `containerClassName`.
   *
   * @defaultValue `'pagination'`
   * @see https://react-responsive-pagination.elantha.com/props#className
   */
  className?: string;
  /**
   * Class name for the top level `<ul>`. When set, `extraClassName` is ignored.
   *
   * @defaultValue `'pagination'`
   * @since 2.13.0
   * @see https://react-responsive-pagination.elantha.com/props#containerClassName
   */
  containerClassName?: string;
  /**
   * Extra class names for the top level `<ul>` (useful with Bootstrap). Ignored
   * when `className` or `containerClassName` is set.
   *
   * @defaultValue `'justify-content-center'`
   * @see https://react-responsive-pagination.elantha.com/props#extraClassName
   */
  extraClassName?: string;
  /**
   * Class name for every `<li>`.
   *
   * @defaultValue `'page-item'`
   * @see https://react-responsive-pagination.elantha.com/props#pageItemClassName
   */
  pageItemClassName?: string;
  /**
   * Class name for the link element inside each `<li>`.
   *
   * @defaultValue `'page-link'`
   * @see https://react-responsive-pagination.elantha.com/props#pageLinkClassName
   */
  pageLinkClassName?: string;
  /**
   * Appended to the `<li>` class name of the active page.
   *
   * @defaultValue `'active'`
   * @see https://react-responsive-pagination.elantha.com/props#activeItemClassName
   */
  activeItemClassName?: string;
  /**
   * Appended to the `<li>` class name of every clickable item that is not the
   * active page (including previous and next).
   *
   * @defaultValue `''`
   * @since 2.13.0
   * @see https://react-responsive-pagination.elantha.com/props#inactiveItemClassName
   */
  inactiveItemClassName?: string;
  /**
   * Appended to the `<li>` class name of non-clickable items (a disabled previous
   * or next, and the ellipsis).
   *
   * @defaultValue `'disabled'`
   * @see https://react-responsive-pagination.elantha.com/props#disabledItemClassName
   */
  disabledItemClassName?: string;
  /**
   * Appended to the `<li>` class name of the previous and next items.
   *
   * @since 2.1.0
   * @see https://react-responsive-pagination.elantha.com/props#navClassName
   */
  navClassName?: string;
  /**
   * Appended to the `<li>` class name of the previous item. Takes precedence over
   * `navClassName`.
   *
   * @since 2.1.0
   * @see https://react-responsive-pagination.elantha.com/props#previousClassName
   */
  previousClassName?: string;
  /**
   * Appended to the `<li>` class name of the next item. Takes precedence over
   * `navClassName`.
   *
   * @since 2.1.0
   * @see https://react-responsive-pagination.elantha.com/props#nextClassName
   */
  nextClassName?: string;
  /**
   * Merges the class names of each `<li>` into one string, for example `twMerge`
   * when using Tailwind.
   *
   * @defaultValue Joins the class names with spaces
   * @since 2.13.0
   * @see https://react-responsive-pagination.elantha.com/props#classMerge
   */
  classMerge?: (classNames: string[]) => string;
  /**
   * Label for the previous item. React nodes are experimental, see the FAQ.
   *
   * @defaultValue `'«'`
   * @see https://react-responsive-pagination.elantha.com/props#previousLabel
   */
  previousLabel?: string | ReactNode;
  /**
   * Label for the next item. React nodes are experimental, see the FAQ.
   *
   * @defaultValue `'»'`
   * @see https://react-responsive-pagination.elantha.com/props#nextLabel
   */
  nextLabel?: string | ReactNode;
  /**
   * ARIA label for the previous item.
   *
   * @defaultValue `'Previous'`
   * @see https://react-responsive-pagination.elantha.com/props#ariaPreviousLabel
   */
  ariaPreviousLabel?: string;
  /**
   * ARIA label for the next item.
   *
   * @defaultValue `'Next'`
   * @see https://react-responsive-pagination.elantha.com/props#ariaNextLabel
   */
  ariaNextLabel?: string;
  /**
   * Returns the ARIA label for a page link, given the page number and whether it
   * is the active page. Return `undefined` for no label.
   *
   * @since 2.12.0
   * @see https://react-responsive-pagination.elantha.com/props#ariaPageLabel
   */
  ariaPageLabel?: (page: number, active: boolean) => string | undefined;
  /**
   * How the previous and next items are rendered: as a link (`'anchor'`), as a
   * link that becomes a `<span>` when disabled (`'anchor-disabled-span'`), as a
   * `<button>`, or omitted (`false` or `'none'`). The string values were added in
   * 2.14.0.
   *
   * @defaultValue `'anchor-disabled-span'`
   * @see https://react-responsive-pagination.elantha.com/props#renderNav
   */
  renderNav?: boolean | 'none' | 'anchor' | 'anchor-disabled-span' | 'button';
  /**
   * Set to `false` to leave `aria-current="page"` off the active `<li>`.
   *
   * @defaultValue `true`
   * @see https://react-responsive-pagination.elantha.com/props#ariaCurrentAttr
   */
  ariaCurrentAttr?: boolean;
  /**
   * The `href` of the page links: `'hash'` for `#`, `'omit'` for none, or a
   * function returning a URL for a page (functions were added in 2.8.0).
   *
   * @defaultValue `'hash'`
   * @see https://react-responsive-pagination.elantha.com/props#linkHref
   */
  linkHref?: ((page: number) => string) | 'hash' | 'omit';
  /**
   * For v1 compatibility: pass `srOnlySpanLabel()` (from
   * `react-responsive-pagination/labelBehaviour`) to render visually hidden label
   * spans.
   *
   * @defaultValue No visually hidden spans
   * @see https://react-responsive-pagination.elantha.com/props#labelBehaviour
   */
  labelBehaviour?: LabelBehaviour;
};

ResponsivePagination.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  maxWidth: PropTypes.number,
  narrowBehaviour: PropTypes.func,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  extraClassName: PropTypes.string,
  pageItemClassName: PropTypes.string,
  pageLinkClassName: PropTypes.string,
  activeItemClassName: PropTypes.string,
  inactiveItemClassName: PropTypes.string,
  disabledItemClassName: PropTypes.string,
  navClassName: PropTypes.string,
  previousClassName: PropTypes.string,
  nextClassName: PropTypes.string,
  classMerge: PropTypes.func,
  previousLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  nextLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  ariaPreviousLabel: PropTypes.string,
  ariaNextLabel: PropTypes.string,
  ariaPageLabel: PropTypes.func,
  renderNav: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['none', 'anchor', 'anchor-disabled-span', 'button'] as const),
  ]),
  ariaCurrentAttr: PropTypes.bool,
  linkHref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.oneOf(['hash', 'omit'] as const),
  ]),
  labelBehaviour: PropTypes.func,
};

const legacyUsageWarnings: string[] = [];

function checkLegacyProps(props: { [key in string]: unknown }) {
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
        `react-responsive-pagination: '${legacyProp}' prop no longer supported, please see migration guide: https://react-responsive-pagination.elantha.com/migration`,
      );
      legacyUsageWarnings.push(legacyProp);
    }
  }
}

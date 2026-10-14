import React from 'react';
import type { ReactNode } from 'react';
import type { PaginationItem } from './paginationItem.ts';

/**
 * Only the label behaviours exported by this package (such as `srOnlySpanLabel`)
 * are supported. Custom implementations are not supported (label behaviours are
 * opaque values).
 *
 * @public
 */
export type LabelBehaviour = (item: PaginationItem) => ReactNode;

/**
 * @public
 */
export function defaultLabelBehaviour({
  a11yLabel,
  label,
}: PaginationItem): ReactNode {
  return !a11yLabel ? label : <span aria-hidden="true">{label}</span>;
}

/**
 * Renders the v1 style visually hidden label spans for screen readers. Pass the
 * result as `labelBehaviour`.
 *
 * @see https://react-responsive-pagination.elantha.com/props#labelBehaviour
 * @public
 */
export function srOnlySpanLabel({
  a11yActiveLabel = '(current)',
  srOnlyClassName = 'sr-only',
}: {
  a11yActiveLabel?: string;
  srOnlyClassName?: string;
} = {}) {
  return (item: PaginationItem): ReactNode => {
    const activePage = item.gotoPage !== undefined && item.active;
    const srOnlyLabel =
      activePage && a11yActiveLabel ? ` ${a11yActiveLabel}` : item.a11yLabel;

    return (
      <>
        {!item.a11yLabel ? item.label : <span aria-hidden="true">{item.label}</span>}
        {srOnlyLabel && <span className={srOnlyClassName}>{srOnlyLabel}</span>}
      </>
    );
  };
}

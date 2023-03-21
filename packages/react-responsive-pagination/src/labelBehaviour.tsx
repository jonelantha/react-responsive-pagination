import { PaginationItem } from './paginationItem.js';

export type LabelBehaviour = (item: PaginationItem) => React.ReactNode;

export function defaultLabelBehaviour({ a11yLabel, label }: PaginationItem) {
  return !a11yLabel ? label : <span aria-hidden="true">{label}</span>;
}

export function srOnlySpanLabel({
  a11yActiveLabel = '(current)',
  srOnlyClassName = 'sr-only',
}: {
  a11yActiveLabel?: string;
  srOnlyClassName?: string;
} = {}) {
  return (item: PaginationItem) => {
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

import {
  createEllipsisItem,
  createPageItem,
  EllipsisPosition,
} from '../paginationItem';

export { narrowToWidePaginationItemRanges as narrowToWideRanges };

function* narrowToWidePaginationItemRanges(
  start: number,
  end: number,
  ellipsisPos: EllipsisPosition,
) {
  for (const range of narrowToWideNumberRanges(start, end, ellipsisPos)) {
    yield toPaginationItems(range, ellipsisPos);
  }
}

function* narrowToWideNumberRanges(
  first: number,
  last: number,
  ellipsisPos: EllipsisPosition,
) {
  const fullWidth = getInclusiveWidth(first, last);

  for (let iterationWidth = 1; iterationWidth < fullWidth; iterationWidth++) {
    const range = getCollapsedRange(first, last, iterationWidth, ellipsisPos);

    if (range) yield range;
  }

  yield getFullRange(first, last);
}

function getCollapsedRange(
  first: number,
  last: number,
  requiredWidth: number,
  ellipsisPos: EllipsisPosition,
): NumberRange | undefined {
  if (requiredWidth < 3) return;

  const widthOfRange = requiredWidth - 2;

  return ellipsisPos === 'left'
    ? [first, '...', ...getFullRange(last - (widthOfRange - 1), last)]
    : [...getFullRange(first, first + (widthOfRange - 1)), '...', last];
}

function getInclusiveWidth(first: number, last: number) {
  return last - first + 1;
}

function toPaginationItems(numberRange: NumberRange, ellipsisPos: EllipsisPosition) {
  return numberRange.map(number => {
    if (number === '...') return createEllipsisItem(ellipsisPos);

    return createPageItem(number, false);
  });
}

function getFullRange(start: number, end: number) {
  if (end < start) return [];

  return Array.from(Array(end - start + 1).keys(), i => i + start);
}

type NumberRange = NumberRangeItem[];

type NumberRangeItem = number | '...';

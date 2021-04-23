import { zipIterators } from '../helpers/iterator';
import { narrowToWideRanges } from './ranges';
import { createNavItem, createPageItem, PaginationItem } from '../paginationItem';

export function* narrowToWideCompositions(current: number | null, total: number) {
  if (current === null) return;

  const leftRanges = narrowToWideRanges(1, current - 1, 'left');
  const rightRanges = narrowToWideRanges(current + 1, total, 'right');

  const staggeredPairs = staggeredIterationRightFirst(leftRanges, rightRanges);

  for (const { leftRange, rightRange } of staggeredPairs) {
    yield [
      navPrevious(current),
      ...leftRange,
      activePage(current),
      ...rightRange,
      navNext(current, total),
    ];
  }
}

function* staggeredIterationRightFirst(
  leftRanges: IterableIterator<PaginationItem[]>,
  rightRanges: IterableIterator<PaginationItem[]>,
) {
  const zippedRanges = zipIterators(leftRanges, rightRanges);

  const initial = zippedRanges.next();

  if (initial.done) return;

  let [leftRange = [], rightRange = []] = initial.value;

  yield { leftRange, rightRange };

  for (const [nextLeftRange, nextRightRange] of zippedRanges) {
    if (nextRightRange) {
      rightRange = nextRightRange;
      yield { leftRange, rightRange };
    }

    if (nextLeftRange) {
      leftRange = nextLeftRange;
      yield { leftRange, rightRange };
    }
  }
}

function activePage(current: number) {
  return createPageItem(current, true);
}

function navPrevious(current: number) {
  return createNavItem('previous', current > 1 ? current - 1 : undefined);
}

function navNext(current: number, total: number) {
  return createNavItem('next', current < total ? current + 1 : undefined);
}

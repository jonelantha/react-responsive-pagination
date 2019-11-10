import { zipIterators } from '../helpers/iterator';
import { narrowToWideRanges } from './ranges';
import { createViewItem, ViewItem } from '../view';

export function* narrowToWideCompositions(current: number, total: number) {
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
  leftRanges: IterableIterator<ViewItem[]>,
  rightRanges: IterableIterator<ViewItem[]>,
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
  return createViewItem.page(current, true);
}

function navPrevious(current: number) {
  return createViewItem.nav('previous', current > 1 ? current - 1 : undefined);
}

function navNext(current: number, total: number) {
  return createViewItem.nav('next', current < total ? current + 1 : undefined);
}

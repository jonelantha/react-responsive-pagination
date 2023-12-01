import {
  CompositionItem,
  createActivePage,
  createNavNext,
  createNavPrevious,
} from '../compositionItem.js';
import { zipIterators } from '../helpers/iterator.js';
import { NarrowBehaviour } from '../narrowBehaviour.js';
import { narrowToWideRanges } from './ranges.js';

export function* narrowToWideCompositions({
  current,
  total,
  narrowBehaviour,
  renderNav,
}: {
  current: number;
  total: number;
  narrowBehaviour: NarrowBehaviour | undefined;
  renderNav: boolean;
}) {
  if (total < 1) return;

  const clampedCurrent = Math.max(1, Math.min(current, total));

  const compositions = narrowToWideCompositionsUnfiltered(
    clampedCurrent,
    total,
    renderNav,
  );

  for (const initialComposition of compositions) {
    if (narrowBehaviour) yield* narrowBehaviour(initialComposition);

    yield initialComposition;

    yield* compositions;
  }
}

export function* narrowToWideCompositionsUnfiltered(
  current: number,
  total: number,
  renderNav: boolean,
): Generator<CompositionItem[]> {
  const navPrevious = createNavPrevious(current > 1 ? current - 1 : undefined);
  const navNext = createNavNext(current < total ? current + 1 : undefined);
  const activePage = createActivePage(current);

  const leftRanges = narrowToWideRanges(1, current - 1, 'L');
  const rightRanges = narrowToWideRanges(current + 1, total, 'R');

  const staggeredPairs = staggeredIterationRightRangeFirst(leftRanges, rightRanges);

  for (const { leftRange, rightRange } of staggeredPairs) {
    if (renderNav) {
      yield [navPrevious, ...leftRange, activePage, ...rightRange, navNext];
    } else {
      yield [...leftRange, activePage, ...rightRange];
    }
  }
}

function* staggeredIterationRightRangeFirst(
  leftRanges: IterableIterator<CompositionItem[]>,
  rightRanges: IterableIterator<CompositionItem[]>,
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

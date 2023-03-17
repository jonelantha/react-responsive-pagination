import {
  CompositionItem,
  containsEllipsis,
  isEllipsis,
  isNav,
} from './compositionItem.js';

export type NarrowBehaviour = (
  composition: CompositionItem[],
) => Generator<CompositionItem[]>;

export function* dropEllipsis(initialComposition: CompositionItem[]) {
  if (containsEllipsis(initialComposition)) {
    yield initialComposition.filter(item => !isEllipsis(item));
  }
}

export function* dropNav(initialComposition: CompositionItem[]) {
  yield initialComposition.filter(item => !isNav(item));
}

export function* dropEllipsisThenNav(initialComposition: CompositionItem[]) {
  if (containsEllipsis(initialComposition)) {
    yield initialComposition.filter(item => !isEllipsis(item) && !isNav(item));
    yield initialComposition.filter(item => !isEllipsis(item));
  } else {
    yield initialComposition.filter(item => !isNav(item));
  }
}

export function* dropNavThenEllipsis(initialComposition: CompositionItem[]) {
  if (containsEllipsis(initialComposition)) {
    yield initialComposition.filter(item => !isEllipsis(item) && !isNav(item));
  }
  yield initialComposition.filter(item => !isNav(item));
}

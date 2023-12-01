import {
  CompositionItem,
  containsEllipsis,
  isEllipsis,
  isNav,
} from './compositionItem.js';

/**
 * NarrowBehaviours will yield their narrowest composition first and then
 * yield a less narrow composition
 * They should not yield the initialComposition
 */

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

/**
 * When combining NarrowBehaviours the behaviours will be applied in order:
 * the first behaviour will be used before subsequent behaviours
 * Compositions yielded from combineBehaviours will initially have
 * all behaviours applied in their narrowest form and then work through
 * each behaviour in turn (from last to first)
 */

/**
 * Combine two or more narrowBehaviours
 */
export const combine =
  (...behaviours: ReadonlyArray<NarrowBehaviour>): NarrowBehaviour =>
  initialComposition =>
    combineRecursive(behaviours, initialComposition);

function* combineRecursive(
  behaviours: ReadonlyArray<NarrowBehaviour>,
  initialComposition: CompositionItem[],
): Generator<CompositionItem[]> {
  // if no behaviours then we are done
  if (behaviours.length === 0) return;

  const [firstBehaviour, ...remainingBehaviours] = behaviours;

  const firstBehaviourCompositions = firstBehaviour(initialComposition);

  const firstResult = firstBehaviourCompositions.next();

  if (firstResult.done) {
    // if this behaviour did not yield anything then just move on to the next behaviour
    yield* combineRecursive(remainingBehaviours, initialComposition);
  } else {
    const firstComposition = firstResult.value;
    // the first composition will be the most reduced
    // this will be the composition for lower priority behaviours to
    // be applied on top of
    yield* combineRecursive(remainingBehaviours, firstComposition);

    // then yield this composition without any other behaviours applied
    yield firstComposition;
    // then yield the remaining compositions from this behaviour
    yield* firstBehaviourCompositions;
  }
}

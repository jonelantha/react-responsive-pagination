import { shorthandOf, fromShorthand } from './compositionItem.test.js';
import {
  NarrowBehaviour,
  combine,
  dropEllipsis,
  dropEllipsisThenNav,
  dropNav,
  dropNavThenEllipsis,
} from './narrowBehaviour.js';

describe('dropNav', () => {
  test('will drop nav', () => {
    const receivedCompositions = dropNav(
      fromShorthand(['<4', 1, '…L', 4, '*5', 6, '…R', 9, '>6']),
    );

    const expectedCompositions = [[1, '…L', 4, '*5', 6, '…R', 9]];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(receivedCompositions.next().value)).toEqual(expected);
    }

    expect(receivedCompositions.next().done).toBe(true);
  });
});

describe('dropEllipsis', () => {
  test('will drop ellipsis', () => {
    const receivedCompositions = dropEllipsis(
      fromShorthand(['<4', 1, '…L', 4, '*5', 6, '…R', 9, '>6']),
    );

    const expectedCompositions = [['<4', 1, 4, '*5', 6, 9, '>6']];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(receivedCompositions.next().value)).toEqual(expected);
    }

    expect(receivedCompositions.next().done).toBe(true);
  });

  test('no composition output if no ellipsis', () => {
    const receivedCompositions = dropEllipsis(
      fromShorthand(['<2', 1, 2, '*3', 4, 5, '>4']),
    );

    expect(receivedCompositions.next().done).toBe(true);
  });
});

describe('dropNavThenEllipsis', () => {
  test('will prioritise dropping nav, then ellipsis', () => {
    const receivedCompositions = dropNavThenEllipsis(
      fromShorthand(['<4', 1, '…L', 4, '*5', 6, '…R', 9, '>6']),
    );

    const expectedCompositions = [
      [1, 4, '*5', 6, 9],
      [1, '…L', 4, '*5', 6, '…R', 9],
    ];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(receivedCompositions.next().value)).toEqual(expected);
    }

    expect(receivedCompositions.next().done).toBe(true);
  });

  test('no extra composition output if no ellipsis', () => {
    const receivedCompositions = dropNavThenEllipsis(
      fromShorthand(['<1', 1, '*2', 3, '>3']),
    );

    const expectedCompositions = [[1, '*2', 3]];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(receivedCompositions.next().value)).toEqual(expected);
    }

    expect(receivedCompositions.next().done).toBe(true);
  });
});

describe('dropEllipsisThenNav', () => {
  test('will prioritise dropping ellipsis, then nav', () => {
    const receivedCompositions = dropEllipsisThenNav(
      fromShorthand(['<4', 1, '…L', 4, '*5', 6, '…R', 9, '>6']),
    );

    const expectedCompositions = [
      [1, 4, '*5', 6, 9],
      ['<4', 1, 4, '*5', 6, 9, '>6'],
    ];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(receivedCompositions.next().value)).toEqual(expected);
    }

    expect(receivedCompositions.next().done).toBe(true);
  });

  test('no extra composition output if no ellipsis', () => {
    const receivedCompositions = dropEllipsisThenNav(
      fromShorthand(['<1', 1, '*2', 3, '>3']),
    );

    const expectedCompositions = [[1, '*2', 3]];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(receivedCompositions.next().value)).toEqual(expected);
    }

    expect(receivedCompositions.next().done).toBe(true);
  });
});

describe('combine', () => {
  const mockTrimStartBehaviour: NarrowBehaviour = function* (initialComposition) {
    yield initialComposition.slice(2);
    yield initialComposition.slice(1);
  };

  const mockTrimEndBehaviour: NarrowBehaviour = function* (initialComposition) {
    yield initialComposition.slice(undefined, -2);
    yield initialComposition.slice(undefined, -1);
  };

  const nullBehaviour: NarrowBehaviour = function* (initialComposition) {};

  test('it correctly applies a single behaviour', () => {
    const receivedCompositions = combine(mockTrimStartBehaviour)(
      fromShorthand([1, 2, 3, 4, 5, 6, 7, 8]),
    );

    const expectedCompositions = [
      [3, 4, 5, 6, 7, 8],
      [2, 3, 4, 5, 6, 7, 8],
    ];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(receivedCompositions.next().value)).toEqual(expected);
    }

    expect(receivedCompositions.next().done).toBe(true);
  });

  test('it correctly combines two behaviours in order', () => {
    const receivedCompositions = combine(
      mockTrimStartBehaviour,
      mockTrimEndBehaviour,
    )(fromShorthand([1, 2, 3, 4, 5, 6, 7, 8]));

    const expectedCompositions = [
      [3, 4, 5, 6],
      [3, 4, 5, 6, 7],
      [3, 4, 5, 6, 7, 8],
      [2, 3, 4, 5, 6, 7, 8],
    ];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(receivedCompositions.next().value)).toEqual(expected);
    }

    expect(receivedCompositions.next().done).toBe(true);
  });

  test('it correctly combines two behaviours when order reversed', () => {
    const receivedCompositions = combine(
      mockTrimEndBehaviour,
      mockTrimStartBehaviour,
    )(fromShorthand([1, 2, 3, 4, 5, 6, 7, 8]));

    const expectedCompositions = [
      [3, 4, 5, 6],
      [2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6, 7],
    ];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(receivedCompositions.next().value)).toEqual(expected);
    }

    expect(receivedCompositions.next().done).toBe(true);
  });

  test('it works correctly if the first behaviour does not yield', () => {
    const receivedCompositions = combine(
      nullBehaviour,
      mockTrimEndBehaviour,
    )(fromShorthand([1, 2, 3, 4, 5, 6, 7, 8]));

    const expectedCompositions = [
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6, 7],
    ];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(receivedCompositions.next().value)).toEqual(expected);
    }

    expect(receivedCompositions.next().done).toBe(true);
  });

  test('it works correctly if the second behaviours does not yield', () => {
    const receivedCompositions = combine(
      mockTrimStartBehaviour,
      nullBehaviour,
    )(fromShorthand([1, 2, 3, 4, 5, 6, 7, 8]));

    const expectedCompositions = [
      [3, 4, 5, 6, 7, 8],
      [2, 3, 4, 5, 6, 7, 8],
    ];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(receivedCompositions.next().value)).toEqual(expected);
    }

    expect(receivedCompositions.next().done).toBe(true);
  });
});

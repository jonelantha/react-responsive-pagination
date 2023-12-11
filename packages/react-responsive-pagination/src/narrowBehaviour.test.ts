import { shorthandOf, fromShorthand } from './compositionItem.test.js';
import {
  NarrowBehaviour,
  combine,
  dropEllipsis,
  dropEllipsisThenNav,
  dropFirstAndLast,
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

  test('it drops first page if third is active and is used after dropFirstAndLast', () => {
    const dropFirstAndLastThenDropEllipis = combine(dropFirstAndLast, dropEllipsis);
    const receivedCompositions = dropFirstAndLastThenDropEllipis(
      fromShorthand(['<2', 1, 2, '*3', 4, '…R', 7, '>4']),
    );

    const expectedCompositions = [
      ['<2', 2, '*3', 4, '>4'],
      ['<2', 1, 2, '*3', 4, '…R', '>4'],
    ];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(receivedCompositions.next().value)).toEqual(expected);
    }

    expect(receivedCompositions.next().done).toBe(true);
  });

  test('it drops last page if third from last active and is used after dropFirstAndLast', () => {
    const dropFirstAndLastThenDropEllipis = combine(dropFirstAndLast, dropEllipsis);
    const receivedCompositions = dropFirstAndLastThenDropEllipis(
      fromShorthand(['<4', 1, '…L', 4, '*5', 6, 7, '>6']),
    );

    const expectedCompositions = [
      ['<4', 4, '*5', 6, '>6'],
      ['<4', '…L', 4, '*5', 6, 7, '>6'],
    ];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(receivedCompositions.next().value)).toEqual(expected);
    }

    expect(receivedCompositions.next().done).toBe(true);
  });

  test('it drops first and last together if used after dropFirstAndLast', () => {
    const dropFirstAndLastThenDropEllipis = combine(dropFirstAndLast, dropEllipsis);
    const receivedCompositions = dropFirstAndLastThenDropEllipis(
      fromShorthand(['<2', 1, 2, '*3', 5, 6, '>4']),
    );

    const expectedCompositions = [['<2', 2, '*3', 5, '>4']];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(receivedCompositions.next().value)).toEqual(expected);
    }

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

describe('dropFirstAndLast', () => {
  test('it replaces two pages at the start with an ellipsis', () => {
    const receivedCompositions = dropFirstAndLast(
      fromShorthand(['<3', 1, 2, 3, '*4', 5, '>5']),
    );

    const expectedCompositions = [['<3', '…L', 3, '*4', 5, '>5']];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(receivedCompositions.next().value)).toEqual(expected);
    }

    expect(receivedCompositions.next().done).toBe(true);
  });

  test('it does not replace two pages at the start if the third is active', () => {
    const receivedCompositions = dropFirstAndLast(
      fromShorthand(['<2', 1, 2, '*3', 4, '>4']),
    );

    expect(receivedCompositions.next().done).toBe(true);
  });

  test('it does not error if only one page', () => {
    const receivedCompositions = dropFirstAndLast(fromShorthand([1]));

    expect(receivedCompositions.next().done).toBe(true);
  });

  test('it drops the first page if the next item is an ellipsis', () => {
    const receivedCompositions = dropFirstAndLast(
      fromShorthand(['<4', 1, '…L', 4, '*5', 6, '>6']),
    );

    const expectedCompositions = [['<4', '…L', 4, '*5', 6, '>6']];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(receivedCompositions.next().value)).toEqual(expected);
    }

    expect(receivedCompositions.next().done).toBe(true);
  });

  test('it replaces two consecutive pages at the end with an ellipsis', () => {
    const receivedCompositions = dropFirstAndLast(
      fromShorthand(['<1', 1, '*2', 3, 4, 5, '>3']),
    );

    const expectedCompositions = [['<1', 1, '*2', 3, '…R', '>3']];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(receivedCompositions.next().value)).toEqual(expected);
    }

    expect(receivedCompositions.next().done).toBe(true);
  });

  test('it does not replace two pages at the end if the page before is active', () => {
    const receivedCompositions = dropFirstAndLast(
      fromShorthand(['<2', 1, 2, '*3', 4, 5, '>4']),
    );

    expect(receivedCompositions.next().done).toBe(true);
  });

  test('it does not drop the second page if first is active', () => {
    const receivedCompositions = dropFirstAndLast(
      fromShorthand(['<', '*1', 2, '…R', 7, '>2']),
    );

    const expectedCompositions = [['<', '*1', 2, '…R', '>2']];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(receivedCompositions.next().value)).toEqual(expected);
    }

    expect(receivedCompositions.next().done).toBe(true);
  });

  test('it drops the last page if the previous item is an ellipsis', () => {
    const receivedCompositions = dropFirstAndLast(
      fromShorthand(['<1', 1, '*2', 3, '…R', 6, '>3']),
    );

    const expectedCompositions = [['<1', 1, '*2', 3, '…R', '>3']];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(receivedCompositions.next().value)).toEqual(expected);
    }

    expect(receivedCompositions.next().done).toBe(true);
  });

  test('it does not drop the second from last page if last is active', () => {
    const receivedCompositions = dropFirstAndLast(
      fromShorthand(['<99', 1, '…L', 99, '*100', '>']),
    );

    const expectedCompositions = [['<99', '…L', 99, '*100', '>']];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(receivedCompositions.next().value)).toEqual(expected);
    }

    expect(receivedCompositions.next().done).toBe(true);
  });

  test('it drops from both sides at the same time', () => {
    const receivedCompositions = dropFirstAndLast(
      fromShorthand(['<3', 1, 2, 3, '*4', 5, '…R', 7, '>5']),
    );

    const expectedCompositions = [['<3', '…L', 3, '*4', 5, '…R', '>5']];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(receivedCompositions.next().value)).toEqual(expected);
    }

    expect(receivedCompositions.next().done).toBe(true);
  });

  test('it drops the first page if the neighbouring ellipsis has been dropped by dropEllipsis', () => {
    const dropEllipisThendropFirstAndLast = combine(dropEllipsis, dropFirstAndLast);
    const receivedCompositions = dropEllipisThendropFirstAndLast(
      fromShorthand(['<4', 1, '…L', 4, '*5', 6, '>6']),
    );

    const expectedCompositions = [
      ['<4', 4, '*5', 6, '>6'],
      ['<4', 1, 4, '*5', 6, '>6'],
    ];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(receivedCompositions.next().value)).toEqual(expected);
    }

    expect(receivedCompositions.next().done).toBe(true);
  });

  test('it drops the last page if the neighbouring ellipsis has been dropped by dropEllipsis', () => {
    const dropEllipisThendropFirstAndLast = combine(dropEllipsis, dropFirstAndLast);
    const receivedCompositions = dropEllipisThendropFirstAndLast(
      fromShorthand(['<1', 1, '*2', 3, '…R', 6, '>3']),
    );

    const expectedCompositions = [
      ['<1', 1, '*2', 3, '>3'],
      ['<1', 1, '*2', 3, 6, '>3'],
    ];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(receivedCompositions.next().value)).toEqual(expected);
    }

    expect(receivedCompositions.next().done).toBe(true);
  });

  test('it drops the first page if the third page is active and used after dropEllipsis', () => {
    const dropEllipisThendropFirstAndLast = combine(dropEllipsis, dropFirstAndLast);
    const receivedCompositions = dropEllipisThendropFirstAndLast(
      fromShorthand(['<2', 1, 2, '*3', 4, '>4']),
    );

    const expectedCompositions = [['<2', 2, '*3', 4, '>4']];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(receivedCompositions.next().value)).toEqual(expected);
    }

    expect(receivedCompositions.next().done).toBe(true);
  });

  test('it drops the last page if the third from last page is active and used after dropEllipsis', () => {
    const dropEllipisThendropFirstAndLast = combine(dropEllipsis, dropFirstAndLast);
    const receivedCompositions = dropEllipisThendropFirstAndLast(
      fromShorthand(['<1', 1, '*2', 3, 4, '>3']),
    );

    const expectedCompositions = [['<1', 1, '*2', 3, '>3']];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(receivedCompositions.next().value)).toEqual(expected);
    }

    expect(receivedCompositions.next().done).toBe(true);
  });

  test('it does not add an ellipsis at the start if used after dropEllipsis', () => {
    const dropEllipisThendropFirstAndLast = combine(dropEllipsis, dropFirstAndLast);
    const receivedCompositions = dropEllipisThendropFirstAndLast(
      fromShorthand(['<3', 1, 2, 3, '*4', 5, '>5']),
    );

    const expectedCompositions = [['<3', 3, '*4', 5, '>5']];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(receivedCompositions.next().value)).toEqual(expected);
    }

    expect(receivedCompositions.next().done).toBe(true);
  });

  test('it does not add an ellipsis at the end if used after dropEllipsis', () => {
    const dropEllipisThendropFirstAndLast = combine(dropEllipsis, dropFirstAndLast);
    const receivedCompositions = dropEllipisThendropFirstAndLast(
      fromShorthand(['<1', 1, '*2', 3, 4, 5, '>3']),
    );

    const expectedCompositions = [['<1', 1, '*2', 3, '>3']];

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

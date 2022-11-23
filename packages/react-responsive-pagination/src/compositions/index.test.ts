import { narrowToWideCompositions } from '.';
import { CompositionItem } from '../compositionItem';

describe('narrowToWideCompositions smallest compositions', () => {
  test('outputs a number either side of the active number', () => {
    const narrowestComposition = narrowToWideCompositions(5, 10, []).next().value;

    const expected = ['<4', 1, '…L', 4, '*5', 6, '…R', 10, '>6'];
    expect(shorthandOf(narrowestComposition)).toEqual(expected);
  });

  test('will not use ellipsis to replace a single number at the start', () => {
    const narrowestComposition = narrowToWideCompositions(4, 10, []).next().value;

    const expected = ['<3', 1, 2, 3, '*4', 5, '…R', 10, '>5'];
    expect(shorthandOf(narrowestComposition)).toEqual(expected);
  });

  test('will not use ellipsis to replace a single number at the end', () => {
    const narrowestComposition = narrowToWideCompositions(7, 10, []).next().value;

    const expected = ['<6', 1, '…L', 6, '*7', 8, 9, 10, '>8'];
    expect(shorthandOf(narrowestComposition)).toEqual(expected);
  });

  test('will not use ellipsis to replace a single number at both side', () => {
    const narrowestComposition = narrowToWideCompositions(4, 7, []).next().value;

    const expected = ['<3', 1, 2, 3, '*4', 5, 6, 7, '>5'];
    expect(shorthandOf(narrowestComposition)).toEqual(expected);
  });

  test('will not render nav', () => {
    const narrowestComposition = narrowToWideCompositions(2, 6, [], false).next().value;

    const expected = [1, '*2', 3, '…R', 6];
    expect(shorthandOf(narrowestComposition)).toEqual(expected);
  });
});

describe('narrowToWideCompositions small ranges compositions', () => {
  test('handles 1 page correctly', () => {
    const narrowestComposition = narrowToWideCompositions(1, 1, []).next().value;

    expect(shorthandOf(narrowestComposition)).toEqual(['<', '*1', '>']);
  });

  test('handles 2 pages correctly', () => {
    const narrowestComposition = narrowToWideCompositions(1, 2, []).next().value;

    expect(shorthandOf(narrowestComposition)).toEqual(['<', '*1', 2, '>2']);
  });

  test('handles 3 pages correctly', () => {
    const narrowestComposition = narrowToWideCompositions(1, 3, []).next().value;

    expect(shorthandOf(narrowestComposition)).toEqual(['<', '*1', 2, 3, '>2']);
  });
});

describe('narrowToWideCompositions widening compositions', () => {
  test('will expand evenly starting on right', () => {
    const compositions = narrowToWideCompositions(6, 11, []);

    const expectedCompositions = [
      ['<5', 1, '…L', 5, '*6', 7, '…R', 11, '>7'],
      ['<5', 1, '…L', 5, '*6', 7, 8, '…R', 11, '>7'],
      ['<5', 1, '…L', 4, 5, '*6', 7, 8, '…R', 11, '>7'],
      ['<5', 1, '…L', 4, 5, '*6', 7, 8, 9, 10, 11, '>7'],
      ['<5', 1, 2, 3, 4, 5, '*6', 7, 8, 9, 10, 11, '>7'],
    ];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(compositions.next().value)).toEqual(expected);
    }

    expect(compositions.next().done).toBe(true);
  });

  test('will expand evenly until the start is fully expanded', () => {
    const compositions = narrowToWideCompositions(5, 11, []);

    const expectedCompositions = [
      ['<4', 1, '…L', 4, '*5', 6, '…R', 11, '>6'],
      ['<4', 1, '…L', 4, '*5', 6, 7, '…R', 11, '>6'],
      ['<4', 1, 2, 3, 4, '*5', 6, 7, '…R', 11, '>6'],
      ['<4', 1, 2, 3, 4, '*5', 6, 7, 8, '…R', 11, '>6'],
      ['<4', 1, 2, 3, 4, '*5', 6, 7, 8, 9, 10, 11, '>6'],
    ];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(compositions.next().value)).toEqual(expected);
    }

    expect(compositions.next().done).toBe(true);
  });

  test('will expand evenly until the end is fully expanded', () => {
    const compositions = narrowToWideCompositions(7, 11, []);

    const expectedCompositions = [
      ['<6', 1, '…L', 6, '*7', 8, '…R', 11, '>8'],
      ['<6', 1, '…L', 6, '*7', 8, 9, 10, 11, '>8'],
      ['<6', 1, '…L', 5, 6, '*7', 8, 9, 10, 11, '>8'],
      ['<6', 1, '…L', 4, 5, 6, '*7', 8, 9, 10, 11, '>8'],
      ['<6', 1, 2, 3, 4, 5, 6, '*7', 8, 9, 10, 11, '>8'],
    ];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(compositions.next().value)).toEqual(expected);
    }

    expect(compositions.next().done).toBe(true);
  });
});

describe('narrowToWideCompositions narrowStrategy', () => {
  test('will initially drop nav if required', () => {
    const compositions = narrowToWideCompositions(5, 9, ['dropNav']);

    const expectedCompositions = [
      [1, '…L', 4, '*5', 6, '…R', 9],
      ['<4', 1, '…L', 4, '*5', 6, '…R', 9, '>6'],
      ['<4', 1, '…L', 4, '*5', 6, 7, 8, 9, '>6'],
      ['<4', 1, 2, 3, 4, '*5', 6, 7, 8, 9, '>6'],
    ];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(compositions.next().value)).toEqual(expected);
    }

    expect(compositions.next().done).toBe(true);
  });

  test('will initially drop ellipsis if required', () => {
    const compositions = narrowToWideCompositions(5, 9, ['dropEllipsis']);

    const expectedCompositions = [
      ['<4', 1, 4, '*5', 6, 9, '>6'],
      ['<4', 1, '…L', 4, '*5', 6, '…R', 9, '>6'],
      ['<4', 1, '…L', 4, '*5', 6, 7, 8, 9, '>6'],
      ['<4', 1, 2, 3, 4, '*5', 6, 7, 8, 9, '>6'],
    ];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(compositions.next().value)).toEqual(expected);
    }

    expect(compositions.next().done).toBe(true);
  });

  test('will prioritise dropping nav if specified first', () => {
    const compositions = narrowToWideCompositions(5, 9, ['dropNav', 'dropEllipsis']);

    const expectedCompositions = [
      [1, 4, '*5', 6, 9],
      [1, '…L', 4, '*5', 6, '…R', 9],
      ['<4', 1, '…L', 4, '*5', 6, '…R', 9, '>6'],
      ['<4', 1, '…L', 4, '*5', 6, 7, 8, 9, '>6'],
      ['<4', 1, 2, 3, 4, '*5', 6, 7, 8, 9, '>6'],
    ];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(compositions.next().value)).toEqual(expected);
    }

    expect(compositions.next().done).toBe(true);
  });

  test('will prioritise dropping ellipsis if specified first', () => {
    const compositions = narrowToWideCompositions(5, 9, ['dropEllipsis', 'dropNav']);

    const expectedCompositions = [
      [1, 4, '*5', 6, 9],
      ['<4', 1, 4, '*5', 6, 9, '>6'],
      ['<4', 1, '…L', 4, '*5', 6, '…R', 9, '>6'],
      ['<4', 1, '…L', 4, '*5', 6, 7, 8, 9, '>6'],
      ['<4', 1, 2, 3, 4, '*5', 6, 7, 8, 9, '>6'],
    ];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(compositions.next().value)).toEqual(expected);
    }

    expect(compositions.next().done).toBe(true);
  });

  test('no extra iteration is added if no ellipsis present when just dropping ellipsis', () => {
    const compositions = narrowToWideCompositions(2, 3, ['dropEllipsis']);

    const expectedCompositions = [['<1', 1, '*2', 3, '>3']];

    for (const expected of expectedCompositions) {
      expect(shorthandOf(compositions.next().value)).toEqual(expected);
    }

    expect(compositions.next().done).toBe(true);
  });

  test.each([
    ['dropEllipsis', 'dropNav'] as const,
    ['dropNav', 'dropEllipsis'] as const,
  ])(
    'no extra iteration as added if no ellipsis present and narrowStrategy = [%s, %s]',
    (...narrowStrategy) => {
      const compositions = narrowToWideCompositions(2, 3, narrowStrategy);

      const expectedCompositions = [
        [1, '*2', 3],
        ['<1', 1, '*2', 3, '>3'],
      ];

      for (const expected of expectedCompositions) {
        expect(shorthandOf(compositions.next().value)).toEqual(expected);
      }

      expect(compositions.next().done).toBe(true);
    },
  );
});

function shorthandOf(received: CompositionItem[] | void) {
  return received?.map(({ type, page }) => {
    switch (type) {
      case 'page':
        return page;
      case 'active':
        return `*${page}`;
      case '<':
      case '>':
        return page === undefined ? type : `${type}${page}`;
      case '…L':
      case '…R':
        return type;
      default:
        throw Error(`Type "${type}" not recognised`);
    }
  });
}

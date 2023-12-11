import { narrowToWideCompositions } from './index.js';
import { dropNavThenEllipsis } from '../narrowBehaviour.js';
import { shorthandOf } from '../compositionItem.test.js';

const defaultParams = { narrowBehaviour: undefined, renderNav: true };

describe('narrowToWideCompositions - total', () => {
  test('outputs nothing for total < 1', () => {
    const compositions = narrowToWideCompositions({
      ...defaultParams,
      current: 5,
      total: 0,
    });

    expect(compositions.next().done).toBe(true);
  });
});

describe('narrowToWideCompositions - current', () => {
  test('clamps current up to 1', () => {
    const narrowestComposition = narrowToWideCompositions({
      ...defaultParams,
      current: 0,
      total: 5,
    }).next().value;

    const expected = ['<', '*1', 2, '…R', 5, '>2'];
    expect(shorthandOf(narrowestComposition)).toEqual(expected);
  });

  test('clamps current down to total', () => {
    const narrowestComposition = narrowToWideCompositions({
      ...defaultParams,
      current: 7,
      total: 5,
    }).next().value;

    const expected = ['<4', 1, '…L', 4, '*5', '>'];
    expect(shorthandOf(narrowestComposition)).toEqual(expected);
  });
});

describe('narrowToWideCompositions - smallest compositions', () => {
  test('outputs a number either side of the active number', () => {
    const narrowestComposition = narrowToWideCompositions({
      ...defaultParams,
      current: 5,
      total: 10,
    }).next().value;

    const expected = ['<4', 1, '…L', 4, '*5', 6, '…R', 10, '>6'];
    expect(shorthandOf(narrowestComposition)).toEqual(expected);
  });

  test('will not use ellipsis to replace a single number at the start', () => {
    const narrowestComposition = narrowToWideCompositions({
      ...defaultParams,
      current: 4,
      total: 10,
    }).next().value;

    const expected = ['<3', 1, 2, 3, '*4', 5, '…R', 10, '>5'];
    expect(shorthandOf(narrowestComposition)).toEqual(expected);
  });

  test('will not use ellipsis to replace a single number at the end', () => {
    const narrowestComposition = narrowToWideCompositions({
      ...defaultParams,
      current: 7,
      total: 10,
    }).next().value;

    const expected = ['<6', 1, '…L', 6, '*7', 8, 9, 10, '>8'];
    expect(shorthandOf(narrowestComposition)).toEqual(expected);
  });

  test('will not use ellipsis to replace a single number at both side', () => {
    const narrowestComposition = narrowToWideCompositions({
      ...defaultParams,
      current: 4,
      total: 7,
    }).next().value;

    const expected = ['<3', 1, 2, 3, '*4', 5, 6, 7, '>5'];
    expect(shorthandOf(narrowestComposition)).toEqual(expected);
  });
});

describe('narrowToWideCompositions - small range compositions', () => {
  test('handles 1 page correctly', () => {
    const narrowestComposition = narrowToWideCompositions({
      ...defaultParams,
      current: 1,
      total: 1,
    }).next().value;

    expect(shorthandOf(narrowestComposition)).toEqual(['<', '*1', '>']);
  });

  test('handles 2 pages correctly', () => {
    const narrowestComposition = narrowToWideCompositions({
      ...defaultParams,
      current: 1,
      total: 2,
    }).next().value;

    expect(shorthandOf(narrowestComposition)).toEqual(['<', '*1', 2, '>2']);
  });

  test('handles 3 pages correctly', () => {
    const narrowestComposition = narrowToWideCompositions({
      ...defaultParams,
      current: 1,
      total: 3,
    }).next().value;

    expect(shorthandOf(narrowestComposition)).toEqual(['<', '*1', 2, 3, '>2']);
  });
});

describe('narrowToWideCompositions - widening compositions', () => {
  test('will expand evenly starting on right', () => {
    const compositions = narrowToWideCompositions({
      ...defaultParams,
      current: 6,
      total: 11,
    });

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
    const compositions = narrowToWideCompositions({
      ...defaultParams,
      current: 5,
      total: 11,
    });

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
    const compositions = narrowToWideCompositions({
      ...defaultParams,
      current: 7,
      total: 11,
    });

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

describe('narrowToWideCompositions - narrowBehaviour', () => {
  test('will apply a narrowBehaviour if specified', () => {
    const compositions = narrowToWideCompositions({
      ...defaultParams,
      current: 5,
      total: 9,
      narrowBehaviour: dropNavThenEllipsis,
    });

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
});

describe('narrowToWideCompositions - renderNav', () => {
  test('will not render nav when false', () => {
    const narrowestComposition = narrowToWideCompositions({
      ...defaultParams,
      current: 2,
      total: 6,
      renderNav: false,
    }).next().value;

    const expected = [1, '*2', 3, '…R', 6];
    expect(shorthandOf(narrowestComposition)).toEqual(expected);
  });
});

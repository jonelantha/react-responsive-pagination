import { narrowToWideCompositions } from '.';

describe('narrowToWideCompositions smallest compositions', () => {
  test('outputs a number either side of the active number', () => {
    const narrowestComposition = narrowToWideCompositions(5, 10).next().value;

    expect(narrowestComposition).toMatchObject(
      makeComposition(['«', '1', '…', '4', '5', '6', '…', '10', '»']),
    );
  });

  test('will not use ellipsis to replace a single number at the start', () => {
    const narrowestComposition = narrowToWideCompositions(4, 10).next().value;

    expect(narrowestComposition).toMatchObject(
      makeComposition(['«', '1', '2', '3', '4', '5', '…', '10', '»']),
    );
  });

  test('will not use ellipsis to replace a single number at the end', () => {
    const narrowestComposition = narrowToWideCompositions(7, 10).next().value;

    expect(narrowestComposition).toMatchObject(
      makeComposition(['«', '1', '…', '6', '7', '8', '9', '10', '»']),
    );
  });

  test('will not use ellipsis to replace a single number at both side', () => {
    const narrowestComposition = narrowToWideCompositions(4, 7).next().value;

    expect(narrowestComposition).toMatchObject(
      makeComposition(['«', '1', '2', '3', '4', '5', '6', '7', '»']),
    );
  });
});

describe('narrowToWideCompositions small ranges compositions', () => {
  test('handles 1 page correctly', () => {
    const narrowestComposition = narrowToWideCompositions(1, 1).next().value;

    expect(narrowestComposition).toMatchObject(makeComposition(['«', '1', '»']));
  });

  test('handles 2 pages correctly', () => {
    const narrowestComposition = narrowToWideCompositions(1, 2).next().value;

    expect(narrowestComposition).toMatchObject(
      makeComposition(['«', '1', '2', '»']),
    );
  });

  test('handles 3 pages correctly', () => {
    const narrowestComposition = narrowToWideCompositions(1, 3).next().value;

    expect(narrowestComposition).toMatchObject(
      makeComposition(['«', '1', '2', '3', '»']),
    );
  });
});

describe('narrowToWideCompositions widening compositions', () => {
  test('will expand evenly starting on right', () => {
    const compositions = narrowToWideCompositions(6, 11);

    const expectedCompositions = [
      ['«', '1', '…', '5', '6', '7', '…', '11', '»'],
      ['«', '1', '…', '5', '6', '7', '8', '…', '11', '»'],
      ['«', '1', '…', '4', '5', '6', '7', '8', '…', '11', '»'],
      ['«', '1', '…', '4', '5', '6', '7', '8', '9', '10', '11', '»'],
      ['«', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '»'],
    ];

    for (const expected of expectedCompositions) {
      expect(compositions.next().value).toMatchObject(makeComposition(expected));
    }

    expect(compositions.next().done).toBe(true);
  });

  test('will expand evenly until the start is fully expanded', () => {
    const compositions = narrowToWideCompositions(5, 11);

    const expectedCompositions = [
      ['«', '1', '…', '4', '5', '6', '…', '11', '»'],
      ['«', '1', '…', '4', '5', '6', '7', '…', '11', '»'],
      ['«', '1', '2', '3', '4', '5', '6', '7', '…', '11', '»'],
      ['«', '1', '2', '3', '4', '5', '6', '7', '8', '…', '11', '»'],
      ['«', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '»'],
    ];

    for (const expected of expectedCompositions) {
      expect(compositions.next().value).toMatchObject(makeComposition(expected));
    }

    expect(compositions.next().done).toBe(true);
  });

  test('will expand evenly until the end is fully expanded', () => {
    const compositions = narrowToWideCompositions(7, 11);

    const expectedCompositions = [
      ['«', '1', '…', '6', '7', '8', '…', '11', '»'],
      ['«', '1', '…', '6', '7', '8', '9', '10', '11', '»'],
      ['«', '1', '…', '5', '6', '7', '8', '9', '10', '11', '»'],
      ['«', '1', '…', '4', '5', '6', '7', '8', '9', '10', '11', '»'],
      ['«', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '»'],
    ];

    for (const expected of expectedCompositions) {
      expect(compositions.next().value).toMatchObject(makeComposition(expected));
    }

    expect(compositions.next().done).toBe(true);
  });
});

function makeComposition(compositionShorthand: string[]) {
  return compositionShorthand.map(label => ({ label }));
}

import {
  CompositionItem,
  containsEllipsis,
  createEllipsis,
  createNavNext,
  createNavPrevious,
  createPage,
  isEllipsis,
  isNav,
} from './compositionItem.js';

describe('isNav', () => {
  test('returns true if the previous nav item', () => {
    const navPrevious = createNavPrevious(undefined);

    expect(isNav(navPrevious)).toBe(true);
  });

  test('returns true if the next nav item', () => {
    const navNext = createNavNext(undefined);

    expect(isNav(navNext)).toBe(true);
  });

  test('returns false if not a nav item', () => {
    const page = createPage(1);

    expect(isNav(page)).toBe(false);
  });
});

describe('isEllipsis', () => {
  test('returns true if the left hand ellipsis', () => {
    const lhEllipsis = createEllipsis('L');

    expect(isEllipsis(lhEllipsis)).toBe(true);
  });

  test('returns true if the right hand ellipsis', () => {
    const rhEllipsis = createEllipsis('R');

    expect(isEllipsis(rhEllipsis)).toBe(true);
  });

  test('returns false if not an ellipsis item', () => {
    const page = createPage(1);

    expect(isEllipsis(page)).toBe(false);
  });
});

describe('containsEllipsis', () => {
  test('returns true if the composition contains a left hand ellipsis', () => {
    const composition = fromShorthand(['<3', 1, '…L', 4, '*5', 6, '>6']);

    expect(containsEllipsis(composition)).toBe(true);
  });

  test('returns true if the composition contains a right hand ellipsis', () => {
    const composition = fromShorthand(['<3', 1, '*2', 3, '…R', 6, '>3']);

    expect(containsEllipsis(composition)).toBe(true);
  });

  test('returns false if no ellipsis item', () => {
    const composition = fromShorthand(['<3', 1, '*2', 3, '>3']);

    expect(containsEllipsis(composition)).toBe(false);
  });
});

type CompositionShorthandItem =
  | '<'
  | `<${number}`
  | '>'
  | `>${number}`
  | number
  | `*${number}`
  | '…L'
  | '…R';

export const shorthandOf = (received: CompositionItem[] | void) =>
  received?.map<CompositionShorthandItem>(({ type, page }) => {
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

export const fromShorthand = (shorthand: CompositionShorthandItem[]) =>
  shorthand.map<CompositionItem>(shorthandItem => {
    if (
      shorthandItem === '<' ||
      shorthandItem === '>' ||
      shorthandItem === '…L' ||
      shorthandItem === '…R'
    ) {
      return { type: shorthandItem, page: undefined };
    }

    if (typeof shorthandItem === 'number') {
      return { type: 'page', page: shorthandItem };
    }

    if (shorthandItem.startsWith('*')) {
      return { type: 'active', page: parseInt(shorthandItem.slice(1), 10) };
    }

    if (shorthandItem.startsWith('<')) {
      return { type: '<', page: parseInt(shorthandItem.slice(1), 10) };
    }

    if (shorthandItem.startsWith('>')) {
      return { type: '>', page: parseInt(shorthandItem.slice(1), 10) };
    }

    throw Error(`Shorthand "${shorthandItem}" not recognised`);
  });

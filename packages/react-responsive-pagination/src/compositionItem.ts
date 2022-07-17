type CompositionPage = { type: 'page'; page: number };
type CompositionActivePage = { type: 'active'; page: number };
type CompositionEllipsis = { type: '…L' | '…R'; page: undefined };
type CompositionPrevious = { type: '<'; page: number | undefined };
type CompositionNext = { type: '>'; page: number | undefined };

export type CompositionItem =
  | CompositionPage
  | CompositionActivePage
  | CompositionEllipsis
  | CompositionPrevious
  | CompositionNext;

export function createActivePage(page: number): CompositionActivePage {
  return { type: 'active', page };
}

export function createPage(page: number): CompositionPage {
  return { type: 'page', page };
}

export function createNavPrevious(page: number | undefined): CompositionPrevious {
  return { type: '<', page };
}

export function createNavNext(page: number | undefined): CompositionNext {
  return { type: '>', page };
}

export function createEllipsis(ellipsisPos: 'L' | 'R'): CompositionEllipsis {
  return { type: `…${ellipsisPos}`, page: undefined };
}

export function isNav(
  item: CompositionItem,
): item is CompositionPrevious | CompositionNext {
  return item.type === '<' || item.type === '>';
}

export function isEllipsis(item: CompositionItem): item is CompositionEllipsis {
  return item.type === '…L' || item.type === '…R';
}

export function hrefTestFn(page: number) {
  return `/test-page/${page}`;
}

export function ariaPageLabelTestFn(page: number, active: boolean) {
  return active ? `active ${page}` : `page ${page}`;
}

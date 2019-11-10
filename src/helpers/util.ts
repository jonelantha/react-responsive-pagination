export function isNumber(val: any): val is number {
  return typeof val === 'number';
}

export function sum(items: number[]) {
  return items.reduce((acc, width) => acc + width, 0);
}

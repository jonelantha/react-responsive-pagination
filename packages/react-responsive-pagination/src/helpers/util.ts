export function isNumber(val: any): val is number {
  return typeof val === 'number';
}

export function sum(items: number[]) {
  return items.reduce((acc, width) => acc + width, 0);
}

export function sanatizeInteger(maybeInteger: unknown) {
  return typeof maybeInteger === 'number' && Number.isInteger(maybeInteger)
    ? maybeInteger
    : undefined;
}

export function sanatizeBoolean(maybeBoolean: unknown) {
  return typeof maybeBoolean === 'boolean' ? maybeBoolean : undefined;
}

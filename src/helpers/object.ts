export function objectUnzip<K extends string, V>(
  object: { [key in K]: V },
): [K[], V[]] {
  const entries = Object.entries(object) as [K, V][];

  const keys = entries.map(([key, _]) => key);

  const values = entries.map(([_, value]) => value);

  return [keys, values];
}

export function objectZip<K extends string, V>(
  keys: K[],
  values: V[],
): { [key in K]: V } {
  const ret = {} as { [key in K]: V };

  keys.forEach((key, index) => {
    ret[key] = values[index];
  });

  return ret;
}

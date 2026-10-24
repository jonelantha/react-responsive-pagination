const partials = import.meta.glob<string>('/src/**/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true,
});

/** The source of the `.mdx` partial at the path. */
export function findPartial(path: string) {
  const source = partials[path];

  if (source === undefined) throw new Error(`No MDX partial at ${path}`);

  return source;
}

import type { CollectionEntry } from 'astro:content';

export function getPageUrl(doc: CollectionEntry<'docs'>, hash?: string) {
  const path = doc.data.path ?? `/${doc.id}`;

  return hash ? `${path}#${hash}` : path;
}

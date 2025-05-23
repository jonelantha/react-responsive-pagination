import type { CollectionEntry } from 'astro:content';

export function getPageUrl(doc: CollectionEntry<'docs'>, hash?: string) {
  const path = doc.data.path ?? `/${doc.id}`;

  return hash ? `${path}#${hash}` : path;
}

let starCount: string | undefined;
export async function getStarCount() {
  if (starCount === undefined) {
    const response = await fetch(
      'http://api.github.com/repos/jonelantha/react-responsive-pagination',
    );
    const data = await response.json();

    starCount = data.stargazers_count;

    if (typeof starCount !== 'number' || Number.isNaN(starCount)) {
      throw `Unexpected starcount ${starCount}`;
    }
  }
  return starCount;
}

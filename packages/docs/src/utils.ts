import type { CollectionEntry } from 'astro:content';

export function getPageUrl(doc: CollectionEntry<'docs'>, hash?: string) {
  const path = doc.data.path ?? `/${doc.id}`;

  return hash ? `${path}#${hash}` : path;
}

/** The title of a page, as it appears in the browser tab, in search results and in the Markdown version. */
export function getPageTitle(title: string) {
  return `${title} | react-responsive-pagination`;
}

/** Where the Markdown version of a page is served (see pages/[...slug].md.ts). */
export function getMarkdownUrl(doc: CollectionEntry<'docs'>) {
  return `/${doc.id}.md`;
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

import { markdownToMdast } from 'satteri';

type MdastNode = ReturnType<typeof markdownToMdast>;
type Link = Extract<MdastNode, { type: 'link' }>;

/** Replace the markdown from `start` to `end` with `text`. */
type Edit = { start: number; end: number; text: string };

/**
 * Points the links to other docs pages at their Markdown versions (`/props#x` becomes
 * `/props.md#x`). `pages` maps the url of each page to its Markdown url. Links to
 * anywhere else are left as they are, and a link to a docs page that doesn't exist, a
 * relative link, an image or a reference definition throws.
 */
export function rewriteLinks(markdown: string, pages: Map<string, string>): string {
  return (
    getLinks(markdownToMdast(markdown))
      .map(link => ({ link, newUrl: rewriteUrl(link.url, pages) }))
      // Only links that change need an edit: a bare URL in the text is a link too, but it has
      // no "](" to find, and it always has a scheme so it never changes
      .filter(({ link, newUrl }) => newUrl !== link.url)
      .map(({ link, newUrl }) => getEdit(markdown, link, newUrl))
      .toArray()
      // From the last edit to the first, so the positions of the earlier ones stay valid
      .reduceRight(applyEdit, markdown)
  );
}

/** Every link in the markdown. */
function* getLinks(node: MdastNode): Generator<Link> {
  switch (node.type) {
    case 'link':
      yield node;
      break;

    case 'image':
    case 'definition':
      throw new Error(`Unsupported ${node.type} in Markdown`);
  }

  if ('children' in node) {
    for (const child of node.children) yield* getLinks(child);
  }
}

// Any origin will do, it's only used to tell the links to this site from the others
const site = 'https://docs.invalid';

function rewriteUrl(url: string, pages: Map<string, string>) {
  if (url.startsWith('#')) return url;

  const { origin, pathname, search, hash } = new URL(url, site);

  // A link elsewhere (https:, mailto:...)
  if (origin !== site) return url;

  if (!url.startsWith('/') || search) throw new Error(`Unsupported link: ${url}`);

  const markdownUrl = pages.get(pathname);

  if (!markdownUrl)
    throw new Error(`Link to a docs page that doesn't exist: ${url}`);

  return markdownUrl + hash;
}

/** The edit that replaces the url of a link with its new url. */
function getEdit(markdown: string, link: Link, newUrl: string): Edit {
  const start = findUrlStart(link, markdown);

  return { start, end: start + link.url.length, text: newUrl };
}

/** Where a link's url starts in the markdown: its destination, after the link text. */
function findUrlStart(link: Link, markdown: string) {
  const linkStart = link.position?.start.offset;
  const linkEnd = link.position?.end.offset;

  if (linkStart === undefined || linkEnd === undefined) {
    throw new Error(`No source position for the link to ${link.url}`);
  }

  const urlOpening = `](${link.url}`;

  // The link text can contain "](" too, so look for the last one
  const openingOffset = markdown.slice(linkStart, linkEnd).lastIndexOf(urlOpening);

  if (openingOffset < 0) throw new Error(`Can't find the link to ${link.url}`);

  return linkStart + openingOffset + ']('.length;
}

function applyEdit(markdown: string, { start, end, text }: Edit) {
  return markdown.slice(0, start) + text + markdown.slice(end);
}

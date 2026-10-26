// What a component's `markdownRenderer` (see the .astro files in src/components) is
// written with: the types it conforms to, and helpers for building its Markdown

/** An element's attributes: strings, or `true` for an attribute written with no value. */
export type MarkdownProps = Record<string, string | true>;

/**
 * Turns a JSX element from an MDX page into Markdown, from its attributes and its
 * children already rendered as Markdown (empty when it has none). Return an empty
 * string to leave the element out. Declare the attributes the component takes as `Props`.
 * It may be async (to read the content collection, say), but it must not depend on the
 * network or the clock, so that the same source always gives the same Markdown.
 */
export type MarkdownRenderer<Props = MarkdownProps> = (
  props: Props,
  children: string,
) => string | Promise<string>;

/**
 * What a component exports as `markdownRenderer` (from its .astro file) to say how its
 * elements become Markdown: `'skip'` leaves them out, `'unwrap'` keeps just their
 * children, or a function renders them.
 */
export type MarkdownRendererExport =
  MarkdownRenderer<MarkdownProps> | 'skip' | 'unwrap';

const fence = '```';

/** A fenced code block. Code that contains the fence is not supported, it throws. */
export function codeBlock(code: string, lang: string, title?: string) {
  if (code.includes(fence))
    throw new Error('Code containing a ``` fence is not supported');

  const meta = title ? ` title="${title}"` : '';

  return `${fence}${lang}${meta}\n${code.trim()}\n${fence}`;
}

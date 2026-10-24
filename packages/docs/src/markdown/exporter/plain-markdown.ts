import { isDeepStrictEqual } from 'node:util';
import { markdownToMdast, mdxToMdast } from 'satteri';
import type { MdxNode } from './mdx.ts';

/**
 * Plain Markdown is emitted as written, so it has to mean the same in plain Markdown as
 * it does in MDX. If the two parsers disagree (a component, an expression, indented
 * code...) it isn't plain Markdown, so throw.
 */
export function renderPlainMarkdown(node: MdxNode, source: string) {
  const markdown = sourceOf(node, source);

  // <br /> is JSX to MDX but plain HTML to Markdown, so ignore it
  const text = markdown.replaceAll('<br />', '');

  if (!isDeepStrictEqual(markdownToMdast(text), mdxToMdast(text))) {
    throw new Error(
      `Content that is not plain Markdown, at line ${node.position?.start.line}`,
    );
  }

  return markdown;
}

/** The node's text from the source, with the indentation of its first line removed from the rest. */
function sourceOf(node: MdxNode, source: string) {
  const start = node.position?.start;
  const end = node.position?.end;

  if (start?.offset === undefined || end?.offset === undefined) {
    throw new Error(`No source position for a ${node.type} node`);
  }

  const indent = ' '.repeat(start.column - 1);

  return source
    .slice(start.offset, end.offset)
    .split('\n')
    .map((line, index) =>
      index > 0 && line.startsWith(indent) ? line.slice(indent.length) : line,
    )
    .join('\n');
}

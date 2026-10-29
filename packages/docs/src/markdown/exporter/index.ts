import { extname } from 'node:path';
import { mdxToMdast } from 'satteri';
import { findMarkdownRenderer, readProps } from './component.ts';
import { readImports } from './imports.ts';
import { rewriteLinks } from './links.ts';
import { findPartial } from './partial.ts';
import { renderPlainMarkdown } from './plain-markdown.ts';
import type { MdxNode } from './mdx.ts';

/**
 * Markdown for a docs page, produced from its MDX source.
 *
 * Anything that is already Markdown is emitted as the author wrote it (sliced out of
 * the source using the node's position). Imports are dropped, `.mdx` partials are
 * expanded in place, and each JSX element is handed to the `markdownRenderer` export
 * of its component. A component without one, and anything else unexpected, throws.
 *
 * Links to other docs pages are then pointed at their Markdown versions: `pages` maps
 * the url of each page to its Markdown url.
 */
export async function exportMarkdown(
  source: string,
  pages: Map<string, string>,
): Promise<string> {
  return rewriteLinks(await renderSource(source), pages) + '\n';
}

async function renderSource(source: string): Promise<string> {
  const root = mdxToMdast(source);

  if (root.type !== 'root') throw new Error('Expected mdxToMdast to return a root');

  const findImport = readImports(
    root.children.filter(node => node.type === 'mdxjsEsm').map(node => node.value),
  );

  const renderNodes = async (nodes: MdxNode[]): Promise<string> =>
    (await Promise.all(nodes.map(node => renderNode(node))))
      .filter(markdown => markdown !== '')
      .join('\n\n');

  const renderNode = async (node: MdxNode): Promise<string> => {
    switch (node.type) {
      case 'mdxjsEsm':
        return '';

      case 'mdxFlowExpression':
        return renderFlowExpression(node.value);

      case 'mdxJsxFlowElement': {
        const path = findImport(node);

        switch (extname(path)) {
          case '.svg':
            return '';

          case '.mdx':
            return renderSource(findPartial(path));

          case '.astro': {
            const markdownRenderer = findMarkdownRenderer(path);

            switch (markdownRenderer) {
              case 'skip':
                return '';

              case 'unwrap':
                return renderNodes(node.children);

              default:
                return markdownRenderer(
                  readProps(node),
                  await renderNodes(node.children),
                );
            }
          }

          default:
            throw new Error(`Unsupported import: ${path}`);
        }
      }

      default:
        return renderPlainMarkdown(node, source);
    }
  };

  return renderNodes(root.children);
}

/** Only comments are allowed, and they leave nothing behind. */
function renderFlowExpression(expression: string) {
  if (expression.replace(/\/\*[\s\S]*?\*\//g, '').trim() === '') return '';

  throw new Error(`Unsupported MDX expression: {${expression}}`);
}

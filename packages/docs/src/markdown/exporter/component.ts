import type { JsxElement } from './mdx.ts';
import type { MarkdownRendererExport, MarkdownProps } from '../renderer.ts';

const components = import.meta.glob<{ markdownRenderer?: MarkdownRendererExport }>(
  '/src/components/*.astro',
  { eager: true },
);

/**
 * The markdown renderer the component at the path exports as `markdownRenderer` (see
 * `MarkdownRendererExport`). Every component rendered in a page needs one, so throws if there
 * isn't one.
 */
export function findMarkdownRenderer(path: string): MarkdownRendererExport {
  const component = components[path];

  if (!component) throw new Error(`No component in src/components at ${path}`);

  if (component.markdownRenderer === undefined) {
    throw new Error(
      `No markdown renderer for ${path}, add a markdownRenderer export to it`,
    );
  }

  return component.markdownRenderer;
}

/** The element's attributes as the props its `markdownRenderer` is given. */
export function readProps(element: JsxElement): MarkdownProps {
  return Object.fromEntries(
    element.attributes.map(attribute => {
      if (attribute.type === 'mdxJsxAttribute') {
        if (attribute.value === null) {
          return [attribute.name, true];
        }
        if (typeof attribute.value === 'string') {
          return [attribute.name, attribute.value];
        }
      }

      const name =
        attribute.type === 'mdxJsxAttribute' ? attribute.name : 'a spread';

      throw new Error(`<${element.name}> ${name} must be a string or have no value`);
    }),
  );
}

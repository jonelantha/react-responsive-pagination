import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { exportMarkdown } from '../markdown/exporter/index.ts';
import { getMarkdownUrl, getPageTitle, getPageUrl } from '../utils.ts';

export const getStaticPaths = (async () => {
  const docs = await getCollection('docs');

  // The url of each page, and where its Markdown version is served (see params)
  const pages = new Map(docs.map(doc => [getPageUrl(doc), getMarkdownUrl(doc)]));

  return docs.map(doc => ({
    params: { slug: doc.id },
    props: { doc, pages },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{
  doc: CollectionEntry<'docs'>;
  pages: Map<string, string>;
}> = ({ props: { doc, pages }, site }) => {
  const homePath = pages.get('/');

  if (!homePath) throw new Error('No docs page at /');

  const fields = {
    title: getPageTitle(doc.data.title),
    description: doc.data.description,
    // Every page but the home page points back to the home page, the index of the docs
    ...(getPageUrl(doc) !== '/' && { index: new URL(homePath, site).href }),
  };

  // JSON strings are valid YAML, so quotes and colons in the text are safe
  const frontmatter = Object.entries(fields)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join('\n');

  const markdown = exportMarkdown(doc.body ?? '', pages);

  return new Response(`---\n${frontmatter}\n---\n\n${markdown}`, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};

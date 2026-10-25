import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { exportMarkdown } from '../markdown/exporter/index.ts';
import { getPageUrl } from '../utils.ts';

export const getStaticPaths = (async () => {
  const docs = await getCollection('docs');

  // The url of each page, and where its Markdown version is served (see params)
  const pages = new Map(docs.map(doc => [getPageUrl(doc), `/${doc.id}.md`]));

  return docs.map(doc => ({
    params: { slug: doc.id },
    props: { doc, pages },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{
  doc: CollectionEntry<'docs'>;
  pages: Map<string, string>;
}> = ({ props }) => {
  const { title, description } = props.doc.data;
  const markdown = exportMarkdown(props.doc.body ?? '', props.pages);

  // JSON strings are valid YAML, so quotes and colons in the text are safe
  const frontmatter = `---
title: ${JSON.stringify(title)}
description: ${JSON.stringify(description)}
---`;

  return new Response(`${frontmatter}\n\n${markdown}`, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};

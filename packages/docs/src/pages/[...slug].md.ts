import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { exportMarkdown } from '../markdown/exporter/index.ts';

export const getStaticPaths = (async () => {
  const docs = await getCollection('docs');

  return docs.map(doc => ({ params: { slug: doc.id }, props: { doc } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ doc: CollectionEntry<'docs'> }> = ({ props }) =>
  new Response(exportMarkdown(props.doc.body ?? ''), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });

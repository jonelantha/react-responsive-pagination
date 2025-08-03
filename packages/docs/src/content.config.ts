import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const docs = defineCollection({
  loader: glob({ base: './src/content/docs', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    navTitle: z.string(),
    topNavOrder: z.number().optional(),
    topNavTitle: z.string().optional(),
    footerNavTitle: z.string().optional(),
    path: z.string().optional(),
    sideNavOrder: z.number().optional(),
    footerNavOrder: z.number(),
    addOverview: z.boolean().optional(),
    popupNavOnly: z.boolean().optional(),
    noArticlePadding: z.boolean().optional(),
  }),
});

export const collections = { docs };

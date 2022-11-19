import type { GatsbyNode } from 'gatsby';
import path from 'node:path';
import { createFilePath } from 'gatsby-source-filesystem';
import { compileMDXWithCustomOptions } from 'gatsby-plugin-mdx';
import { remarkHeadingsPlugin } from './remark-headings-plugin';

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions: { createPage },
}) => {
  const result = await graphql<Queries.CreatePagesQuery>(
    `
      query CreatePages {
        allMdx {
          nodes {
            fields {
              slug
            }
            frontmatter {
              title
              template
              path
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    `,
  );

  if (result.errors) {
    throw result.errors;
  }

  result.data!.allMdx.nodes.forEach(page => {
    const slug = page.fields.slug;
    const template = page.frontmatter?.template ?? 'docs';
    const pagePath = page.frontmatter?.path ?? slug;
    const templatePath = path.resolve(`./src/templates/${template}.tsx`);
    createPage({
      path: pagePath,
      component: `${templatePath}?__contentFilePath=${page.internal.contentFilePath}`,
      context: {
        template,
        slug,
      },
    });
  });
};

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions: { createNodeField },
  getNode,
}) => {
  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  async ({
    getNode,
    getNodesByType,
    pathPrefix,
    reporter,
    cache,
    actions: { createTypes },
    schema,
    store,
  }) => {
    const headingsResolver = schema.buildObjectType({
      name: 'Mdx',
      fields: {
        headings: {
          type: '[MdxHeading!]',
          async resolve(mdxNode) {
            const fileNode = getNode(mdxNode.parent);

            if (!fileNode) return null;

            const result = await compileMDXWithCustomOptions(
              {
                source: mdxNode.body,
                absolutePath: String(fileNode.absolutePath),
              },
              {
                pluginOptions: { plugins: [] },
                customOptions: {
                  mdxOptions: {
                    remarkPlugins: [remarkHeadingsPlugin],
                  },
                },
                getNode,
                getNodesByType,
                pathPrefix,
                reporter,
                cache,
                store,
              },
            );

            if (!result) return null;

            return result.metadata.headings;
          },
        },
      },
    });

    createTypes([
      `
      type MdxHeading {
        value: String!
        depth: Int!
      }

      type Site {
        siteMetadata: SiteMetadata!
      }

      type SiteMetadata {
        title: String!,
        description: String!,
        author: String!,
        siteUrl: String!,
      },

      type Mdx {
        fields: MdxFields!,
      },

      type MdxFields {
        slug: String!,
      },
    `,
      headingsResolver,
    ]);
  };

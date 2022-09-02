const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { compileMDXWithCustomOptions } = require('gatsby-plugin-mdx');
const { remarkHeadingsPlugin } = require('./remark-headings-plugin');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(
    `
      {
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

  result.data.allMdx.nodes.forEach(page => {
    const template = page.frontmatter.template ?? 'docs';
    const slug = page.fields.slug;
    const pagePath = page.frontmatter.path ?? slug;
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

exports.onCreateNode = ({ node, actions: { createNodeField }, getNode }) => {
  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};

exports.createSchemaCustomization = async ({
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
        type: '[MdxHeading]',
        async resolve(mdxNode) {
          const fileNode = getNode(mdxNode.parent);

          if (!fileNode) return null;

          const result = await compileMDXWithCustomOptions(
            {
              source: mdxNode.body,
              absolutePath: fileNode.absolutePath,
            },
            {
              pluginOptions: {},
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
        value: String
        depth: Int
      }
    `,
    headingsResolver,
  ]);
};

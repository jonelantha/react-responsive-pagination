const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

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

    createPage({
      path: pagePath,
      component: path.resolve(`./src/templates/${template}.tsx`),
      context: {
        template,
        slug,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};

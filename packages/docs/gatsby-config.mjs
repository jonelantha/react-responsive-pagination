// @ts-check
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

/**
 * @type {import('gatsby').GatsbyConfig}
 */
const gatsbyConfig = {
  flags: {},
  siteMetadata: {
    title: 'react-responsive-pagination',
    description: 'Responsive React pagination component',
    author: '@jonelantha',
    siteUrl: 'https://react-responsive-pagination.elantha.com',
  },
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './content',
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug],
        },
      },
    },
  ],
};

export default gatsbyConfig;

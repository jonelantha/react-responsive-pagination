module.exports = {
  flags: {
    DEV_SSR: true,
  },
  siteMetadata: {
    title: 'react-responsive-pagination',
    description: 'Responsive React pagination component',
    author: '@jonelantha',
    siteUrl: 'https://react-responsive-pagination.elantha.com',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
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
        rehypePlugins: [require('rehype-slug')],
        extensions: ['.mdx', '.md'],
      },
    },
  ],
};

const rehypeSetCodeAttributes = require('./rehype-set-code-attributes');

module.exports = {
  flags: {},
  siteMetadata: {
    title: 'react-responsive-pagination',
    description: 'Responsive React pagination component',
    author: '@jonelantha',
    siteUrl: 'https://react-responsive-pagination.elantha.com',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/content`,
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        mdxOptions: {
          remarkPlugins: [require('remark-gfm')],
          rehypePlugins: [wrapESMPlugin('rehype-slug'), rehypeSetCodeAttributes],
        },
      },
    },
  ],
};

function wrapESMPlugin(name) {
  return function wrapESM(opts) {
    return async (...args) => {
      const mod = await import(name);
      const plugin = mod.default(opts);
      return plugin(...args);
    };
  };
}

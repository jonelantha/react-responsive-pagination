function overrideWebpackConfig({ webpackConfig }) {
  webpackConfig.resolve.symlinks = false;

  return webpackConfig;
}

module.exports = {
  plugins: [{ plugin: { overrideWebpackConfig }, options: {} }],
};

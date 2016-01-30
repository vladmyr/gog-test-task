var path = require("path");
var webpack = require("webpack");

module.exports = function(webpackConfig){
  var plugins = [];

  // decide whether include plugins
  webpackConfig.plugins.hasHotModuleReplacement
    && plugins.push(new webpack.HotModuleReplacementPlugin());

  // replace path with absolute one
  webpackConfig.output.path = path.join(__dirname, webpackConfig.output.path);

  // handle regular expressions
  webpackConfig.module.loaders.forEach(function(loader){
    loader.test && (loader.test = new RegExp(loader.test));
    loader.include && (loader.include = new RegExp(loader.exclude));
    loader.exclude && (loader.exclude = new RegExp(loader.exclude));
  });

  return {
    context: __dirname,
    entry: webpackConfig.entry,
    output: webpackConfig.output,
    module: webpackConfig.module,
    resolve: webpackConfig.resolve,
    devServer: webpackConfig.devServer,
    plugins: plugins
  };
};
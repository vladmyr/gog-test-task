var path = require("path");
var webpack = require("webpack");

module.exports = function(webpackConfig){
  var plugins = [];

  // decide whether include plugins
  webpackConfig.plugins.hasHotModuleReplacement
    && plugins.push(new webpack.HotModuleReplacementPlugin());

  // replace path with absolute one
  webpackConfig.output.path = path.join(__dirname, webpackConfig.output.path);

  return {
    context: __dirname,
    entry: webpackConfig.entry,
    output: webpackConfig.output,
    module: webpackConfig.module,
    resolve: webpackConfig.resolve,
    devServer: webpackConfig.devServer,
    plugins: plugins
  }
};
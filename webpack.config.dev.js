process.env.NODE_APP_INSTANCE = "dev";

var webpackConfig = require("./webpack.config");
var config = require("config");

module.exports = webpackConfig(config.webpack);
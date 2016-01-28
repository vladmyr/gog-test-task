process.env.NODE_APP_INSTANCE = "prod";

var webpackConfig = require("./webpack.config");
var config = require("config");

module.exports = webpackConfig(config.webpack);
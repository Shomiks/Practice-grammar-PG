/* config-overrides.js */

const rewireInlineImportGraphqlAst = require("react-app-rewire-graphql-tag");
// const rewireWebpackBundleAnalyzer = require("react-app-rewire-webpack-bundle-analyzer");

module.exports = function override(config, env) {
  config = rewireInlineImportGraphqlAst(config, env);
  config.plugins = config.plugins.filter(plugin => {
    return plugin.constructor.name !== "ForkTsCheckerWebpackPlugin";
  });
  // if (env !== "production") {
  //   config = rewireWebpackBundleAnalyzer(config, env, {
  //     analyzerMode: "static",
  //     reportFilename: "report.html"
  //   });
  // }

  return config;
};

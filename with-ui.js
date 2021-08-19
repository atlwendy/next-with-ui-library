const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");
const merge = require("lodash.mergewith");

/**
 * Applies the required modifications to a given webpack config or configs, in order to
 * use @tuftandneedle/ui.
 * @param {Object|Object[]} config Webpack config or array of webpack configs
 * @param {Object} options
 * @param {boolean} [options.skipFontRule=false] flag to prevent font file rules being added to config
 * @param {boolean} [options.publicPathPrefix=""] prefix for public path used by file-loader when importing fonts
 * @returns {object} webpack config containing the required modifications
 */
module.exports = (
  config,
  options = {
    skipFontRule: false,
    publicPathPrefix: "",
  }
) => {
  const src = Array.isArray(config) ? config : [config];

  return merge(
    {},
    ...src,
    {
      resolve: {
        plugins: [
          new TsconfigPathsPlugin(), // Resolve paths defined in tsconfig.json
        ],
      },
      module: {
        rules: options.skipFontRule
          ? []
          : [
              {
                // Support importing font files
                test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: "file-loader",
                    options: {
                      name: "[name].[ext]",
                      outputPath: "static/fonts/",
                      publicPath: `/${options.publicPathPrefix}static/fonts/`,
                    },
                  },
                ],
              },
            ],
      },
    },
    // Customizes how to merge arrays
    (a, b) => {
      if (Array.isArray(a)) {
        return a.concat(b);
      }
    }
  );
};

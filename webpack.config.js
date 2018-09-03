// tslint:disable: no-var-requires no-require-imports
const path = require('path');
const webpack = require('webpack');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const copyWebpackPlugin = require('copy-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');


module.exports = (mode = 'development') => {

  console.log('Webpack mode ***', mode);

  const config = {

    mode: mode,

    devtool: 'eval-source-map',

    resolve: {
      extensions: ['.ts', '.js', '.scss']
    },

    resolveLoader: {
      modules: [
        'node_modules',
        'config/loaders'
      ]
    },

    entry: {
      'polyfills': './src/client/polyfills.ts',
      'vendor': './src/client/vendor.ts',
      'main': './src/client/main.ts'
    },

    output: {
      path: path.resolve('dist'),
      publicPath: '/dist/',
      filename: '[name].js',
      chunkFilename: '[id].chunk.js'
    },

    module: {
      rules: [
        /*
        * Source map loader support for *.js files
        * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
        *
        * See: https://github.com/webpack/source-map-loader
        */
        {
          test: /\.js$/,
          loader: 'source-map-loader',
          enforce: 'pre'
        },
        {
          test: /\.ts$/,
          loader: 'awesome-typescript-loader',
          exclude: [
            /\.spec\.ts/
          ],
          options: {
            useCache: true,
            configFileName: 'src/client/tsconfig.json'
          }
        },
        {
          test: /\.scss$/,
          use: [
            miniCssExtractPlugin.loader,
            'css-loader?sourceMap=true',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                ident: 'postcss',
                plugins: () => [
                  postcssPresetEnv({
                    stage: 2,
                    features: {
                      'nesting-rules': true
                    }
                  })
                ]
              }
            }
          ],
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff)$/,
          loader: 'url-loader',
          options: {
            publicPath: '/dist/',
            limit: 8192
          }
        }
      ]
    },

    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new copyWebpackPlugin([
        { from: 'src/assets', to: 'assets' },
      ]),
      new miniCssExtractPlugin({
        filename: 'main.css',
      }),
      new CheckerPlugin(),
    ]
  };

  return config;
};

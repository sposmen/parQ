// tslint:disable: no-var-requires no-require-imports
const path = require('path');


module.exports = (mode = 'development') => {

  console.log('Webpack mode ***', mode);

  const config = {

    mode: mode,

    devtool: 'source-map',

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

    ]
  };

  return config;
};

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const WebpackChunkHash = require('webpack-chunk-hash');
const isDev = process.env.NODE_ENV !== 'production';

const config = {
  resolve: {
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
  },
  entry: {
    vendor: ['babel-polyfill', 'react', 'react-dom'],
    main: ['./src/renderers/dom.js'],
  },
  output: {
    path: path.resolve('public', 'bundles'),
    filename: isDev ? '[name].js' : '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env', 'stage-2'],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),
    function() {
      this.plugin('done', function(stats) {
        const gVars = require('./.reactful.json');
        fs.writeFileSync(
          path.resolve('.reactful.json'),
          JSON.stringify(
            Object.assign({}, gVars, stats.toJson()['assetsByChunkName']),
            null,
            2
          )
        );
      });
    },
  ],
};

module.exports = config;

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.base.config.js');

module.exports = baseConfig({
  devtool: 'source-map',
  entry: [
    path.join(__dirname, './../../src/app/index.js')
  ],
  output: {
    filename: 'bundle-[hash].min.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './../../src/www/index.tpl.html'),
      inject: 'body',
      filename: 'index.html',
      favicon: path.join(__dirname, './../../src/www/favicon.ico'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new ExtractTextPlugin({
      filename: '[name].[hash].min.css',
      disable: false,
      allChunks: true
    })
  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: "css-loader",
            options: {
              modules: false,
              sourceMap: false,
              importLoaders: 1,
              localIdentName: "[name]--[local]--[hash:base64:8]"
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('postcss-import'),
                  require('postcss-mixins'),
                  require('postcss-each'),
                  require('postcss-cssnext')
                ];
              }
            }
          }
        ]
      })
    }]
  }
});

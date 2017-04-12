const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseconfig = require('./webpack.base.config.js');

module.exports = baseconfig({
  devtool: 'cheap-module-eval-source-map',
  entry: [
    path.join(__dirname, '../../src/app/index.js')
  ],
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../../src/www/index.tpl.html'),
      inject: 'body',
      filename: 'index.html'
    }),
    new Dotenv({
      path: './.env',
      safe: false
    })
  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: true,
            sourceMap: true,
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
    }]
  },
  performance: {
    hints: false
  }
});

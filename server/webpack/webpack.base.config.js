const path = require('path')
const webpack = require('webpack')

module.exports = (options) => ({
  entry: options.entry,
  output: Object.assign({
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/'
  }, options.output),
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        compact: false,
        presets: [
          ["es2015", {modules: false}],
          "stage-2",
          "react"
        ],
        plugins: [
          "transform-node-env-inline"
        ]
      }
    }, {
      test: /\.(eot|ico|png|svg|ttf|woff|woff2)$/,
      loader: 'file-loader?name=[name].[ext]'
    }].concat(options.module.rules)
  },
  plugins: options.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        WEATHER_API: JSON.stringify(process.env.WEATHER_API)
      }
    }),
    new webpack.NamedModulesPlugin()
  ]),
  devtool: options.devtool,
  target: 'web',
  performance: options.performance || {}
});

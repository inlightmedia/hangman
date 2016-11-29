var path = require('path'); // For Bootstrap
// var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // For Bootstrap

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// require('bootstrap-loader');

module.exports = {

  entry: './src/main.ts',
  output: {
    path: './dist',
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      {test: /\.ts$/, loader: 'ts'},
      {test: /\.html$/, loader: 'raw'},
      {test: /\.css$/, loader: 'raw'},
      // Bootstrap loaders
      {test: /\.css$/, include: path.resolve('src/app'), loader: 'raw'},
      {test: /\.css$/, exclude: path.resolve('src/app'), loader: ExtractTextPlugin.extract('style', 'css')},
      {test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, loader: 'file?name=fonts/[name].[ext]'}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.html', '.css']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.DefinePlugin({
      app: {
        environment: JSON.stringify(process.env.APP_ENVIRONMENT || 'development')
      }
    }),
    new ExtractTextPlugin('[name].css') // For Bootstrap
  ]
};
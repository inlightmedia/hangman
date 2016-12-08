// Setup Environment Variables & Default to Development 
// var gsap = require('gsap');

var path = require('path');
var root = __dirname;
var jQueryPath = root + '/src/js-libraries/jquery.min.js';
var TweenMaxPath = root + '/src/js-libraries/TweenMax.min.js';
var TimelineMaxPath = root + '/src/js-libraries/TimelineMax.min.js';
var outputPath = root + '/dist';

var gsapPath = "/node_modules/gsap/src/uncompressed/";

var webpack = require('webpack');
var webpackConfig = new webpack.DefinePlugin({
  app: {
    environment: JSON.stringify(process.env.APP_ENVIRONMENT || 'development')
  }
})

var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/src/index.html',
  filename: 'index.html',
  inject: 'body'
});

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ExtractTextPluginConfig = new ExtractTextPlugin(
  "index_bundle.css"
);

module.exports = {      
  context: __dirname + '/src',
  entry: {
      vendors: ['jquery','gsap', 'bootstrap', 'webpack/hot/dev-server', 'webpack-dev-server/client?http://localhost:8080'],
      app: ['./main.ts']
      
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js'
  },
  externals: {
    jquery: 'jQuery'
    // 'TweenLite': 'TweenLite'
  },
  module: {        
    noParse: [    
      new RegExp(jQueryPath),
      new RegExp(gsapPath),
      new RegExp(TweenMaxPath),
      new RegExp(TimelineMaxPath)
    ],
    loaders: [
    {
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: 'ts',
      include: path.join(__dirname, 'src')
    }, {
      test: /\.html$/,
      exclude: /node_modules/,
      loader: "html-loader",
      include: path.join(__dirname, 'src')
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: "style-loader!css-loader?modules&importLoaders=1!postcss-loader?sourceMap=inline",
      include: path.join(__dirname, 'src')
    },{
      test: /jquery\.js/,
      loader: 'null-loader',
      exclude: path.resolve('node_modules/jquery/')
    }
    
    // ,    
    // { 
    //   test: require.resolve("gsap"), 
    //   loader: "expose?$!expose?gsap" 
    // }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.html', '.css'],
    alias: {
      "jquery": jQueryPath,
      "TweenMax": TweenMaxPath,
      "TweenLite": TimelineMaxPath,
      'gsap': 'gsap'            
    }
  },
  plugins: [
    HtmlWebpackPluginConfig,
    webpackConfig,
    ExtractTextPluginConfig,    
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        'window.jQuery': "jquery",
        TweenMax: "gsap"
    }),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.bundle.js', Infinity)
  ]
};
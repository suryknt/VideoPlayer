/// https://webpack.github.io/docs/configuration.html

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var ENV =  'development';
var BUILD_PATH = process.env.BUILD_PATH && (process.env.BUILD_PATH === 'webapp');

var __PROD__ = (ENV === 'production');

var define_globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(ENV)
  },
  'NODE_ENV'     : ENV,
  '__DEV__'      : !__PROD__
};

var babel_query_presets = ['es2015', 'react', 'stage-0'];

 babel_query_presets.push('react-hmre');


var output_path = BUILD_PATH ? '../../main/webapp/static' : './dist/static';

var config = {
  name: 'client',
  target: 'web',
  entry: [
    'babel-polyfill',
    './source/index'
  ],
  output: {
    filename: 'bundle.[hash].js',
    path: path.join(__dirname, output_path),
    publicPath: 'static/'
  },
  plugins: [
    new webpack.DefinePlugin(define_globals)
  ],
    devServer: {
      inline: true,
      port: 4000
   },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          plugins: [
            'transform-runtime',
            'transform-decorators-legacy'
          ],
          presets: babel_query_presets
        }
      },
      {
        test: /\.css?$/,
        loaders: ['style', 'css']
      },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
};

//
  /// development

  config.devtool = 'source-map';

  config.entry.push(
    'event-source-polyfill',
    'webpack-hot-middleware/client?path=/__webpack_hmr'
  );

  config.output = {
    filename: 'bundle.js',
    path: path.join(__dirname, '../static'),
    publicPath: '/static/'
  };

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );


// console.log('webpack:ENV:', ENV, __PROD__, config);

module.exports = config;

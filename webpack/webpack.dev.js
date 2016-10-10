
var webpack = require('webpack');
var loaders = require("./loaders");

var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var Url = require('url');
var Proxy = require('proxy-middleware');
var proxyOptions = Url.parse('http://localhost:8080/sailcom-proxy/');
    proxyOptions.route = '/api';
    proxyOptions.cookieRewrite = 'http://localhost:8081';

module.exports = {
  entry: ['./src/index.ts'],
  output: {
    filename: 'build.js',
    path: 'dist'
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.ts', '.js', '.json']
  },
  resolveLoader: {
    modulesDirectories: ["node_modules"]
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      hash: true
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 8081,
      server: {
        baseDir: 'dist',
        routes: {
          '/sailcom-proxy': 'dist'
        },
        middleware: [Proxy(proxyOptions)]
      },
      ui: false,
      online: false,
      notify: false
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.jquery': 'jquery'
    })
  ],
  module: {
    loaders: loaders
  }
};
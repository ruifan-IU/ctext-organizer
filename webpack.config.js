const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, './build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    host: 'localhost',
    port: 8080,
  
    static: {
      directory: path.join(__dirname, './build'),
      publicPath: '/',
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/assets/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },
  plugins: [new HtmlWebpackPlugin({
    template: './index.html',
  })],
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
           presets: ['@babel/preset-env', '@babel/preset-react'],
         },
      },
      {
        test: /\.scss$/,
        exclude: /node-modules/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      }
    ]
  }
}
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './app/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './app/main/main.jsx',
  output: {
    path: path.resolve('build'),
    filename: 'index_dev_bundle.js'
  },
  devtool: '#sourcemap',
  module: {
    rules: [
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/}
    ],
  },
  plugins: [HtmlWebpackPluginConfig]

}
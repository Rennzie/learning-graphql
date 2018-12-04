const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const APP_DIR = path.resolve(__dirname, '../src');

module.exports = env => {
  const { PLATFORM } = env;
  return merge([
    {
      entry: ['@babel/polyfill', APP_DIR],
      output: {
        filename: '[name].bundle.js',
        // chunkFilename: '[name].chunk.bundle.js',
        path: path.resolve(__dirname, '..', 'dist'),
        publicPath: '/'
      },
      resolve: { extensions: ['.mjs', '.js', '.jsx'] },
      module: {
        rules: [
          {
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: { loader: 'babel-loader' }
          },
          {
            test: /\.css$/,
            use: [
              PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
              'css-loader'
            ]
          },
          {
            test: /\.scss$/,
            use: [
              PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
              'css-loader',
              'sass-loader'
            ]
          },
          {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          filename: './index.html'
        }),
        new webpack.DefinePlugin({
          'process.env.VERSION': JSON.stringify(env.VERSION),
          'process.env.PLATFORM': JSON.stringify(env.PLATFORM)
        }),
        new CopyWebpackPlugin([{ from: 'src/assets' }])
      ]
    }
  ]);
};

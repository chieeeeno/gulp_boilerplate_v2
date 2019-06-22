import { scripts as config } from './tasks/config';
const isDevelop = process.env.NODE_ENV === 'development';

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    'assets/js/top': `${config.srcRoot}/assets/js/top.js`,
  },
  module: {
    rules: [{ test: /\.js$/, use: 'babel-loader' }],
  },
  output: {
    filename: '[name].js',
  },
  devtool: isDevelop ? 'source-map' : false,
};

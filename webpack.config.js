import { GOOGLE_MAP_API_KEY, SCRIPTS_PATH } from './tasks/config'
import webpack from 'webpack'
import TerserPlugin from 'terser-webpack-plugin'

const env = process.env.NODE_ENV || 'development'
const isDevelop = env === 'development'

module.exports = {
  cache: true,
  mode: env,
  entry: {
    top: `${SCRIPTS_PATH.srcRoot}/assets/js/top.js`,
  },
  module: {
    rules: [{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules\/(?!(dom7|swiper)\/).*/ }],
  },
  output: {
    filename: '[name].bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      GOOGLE_MAP_API_KEY: isDevelop ? JSON.stringify(GOOGLE_MAP_API_KEY.develop) : JSON.stringify(GOOGLE_MAP_API_KEY.production),
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            // eslint-disable-next-line
            drop_console: true,
          },
        },
      }),
    ],
    splitChunks: {
      name: 'vendor',
      chunks: 'all',
    },
    namedChunks: true,
  },
  devtool: isDevelop ? 'source-map' : false,
}

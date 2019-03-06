const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

require('dotenv').config()

module.exports = {
  mode:
    process.env.NODE_ENV === 'development'
      ? 'development'
      : process.env.NODE_ENV,
  devtool: false,
  externals: [nodeExternals()],
  name: 'server',
  plugins: [new webpack.NamedModulesPlugin()],
  target: 'node',
  entry: [path.resolve(path.join(__dirname, 'src/server.js'))],
  output: {
    publicPath: './',
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    alias: {
      shared: path.resolve('../shared')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        options: {
          babelrc: true
        }
      }
    ]
  },
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  }
}

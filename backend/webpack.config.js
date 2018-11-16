const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'development',
  devtool: false,
  externals: [nodeExternals()],
  name: 'server',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.NamedModulesPlugin()
  ],
  target: 'node',
  entry: [path.resolve(path.join(__dirname, 'src/server.js'))],
  output: {
    publicPath: './',
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js'],
    modules: [path.resolve(__dirname, '..', 'shared')]
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

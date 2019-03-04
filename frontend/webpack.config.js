const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: ['@babel/polyfill', './src/index.js']
  },
  output: {
    publicPath: '/',
    chunkFilename: '[name]-[chunkhash].js',
    filename: '[hash]-[name]-entry.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        API_HOST: JSON.stringify(process.env.API_HOST),
        VERSION: JSON.stringify(process.env.TRAVIS_COMMIT || 'unknown')
      }
    }),
    new HtmlWebpackPlugin({
      template: './index.template.html'
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, 'src/service-worker/sw.js')
    }),
    new FaviconsWebpackPlugin(path.resolve('src/assets/logo.png')),
    new WebpackPwaManifest({
      name: 'unwelch',
      short_name: 'unwelch',
      description: 'Friendly betting',
      background_color: '#ffffff',
      theme_color: '#ffffff',
      start_url: '.',
      orientation: 'portrait',
      display: 'standalone',
      inject: true,
      ios: true,
      icons: [
        {
          src: path.resolve('src/assets/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
        }
      ]
    })
  ],
  resolve: {
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
    alias: {
      components: path.resolve('./components'),
      src: path.resolve('./src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        resolve: {
          extensions: ['.js', '.jsx']
        },
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    port: 9000,
    publicPath: '/',
    historyApiFallback: true,
    disableHostCheck: true
  }
}

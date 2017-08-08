const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VENDOR_LIBS = [
    "axios",
    "lodash",
    "react",
    "react-dom",
    "react-redux",
    "react-router",
    "redux",
    "redux-form",
    "redux-promise",
    "redux-thunk"
]

module.exports = {
  // entry: [ // non code-splitting setup
  //   './src/index.js'
  // ],
  entry: { // Code splitting entry setup
    bundle: './src/index.js', //app specific code bundle
    vendor: VENDOR_LIBS //dependency lib bundle
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].[chunkhash].js' //name the bundled file with the key of the entry section
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
      // {
      //   use: ['style-loader', 'css-loader'], // order matters here, application from right to left
      //   test: /\.css$/
      // }
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 40000 }
        },
        'image-webpack-loader'
        ]
      }
    ],
  },
  plugins: [
      new ExtractTextPlugin('style.css'),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    inline: true,
    host: '0.0.0.0',
    port: 3210,
  },
};

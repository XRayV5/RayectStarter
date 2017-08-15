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
  entry: { // Code splitting entry setup
    bundle: './src/index.js', //app specific code bundle
    vendor: VENDOR_LIBS //dependency lib bundle
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js' //name the bundled file with the key of the entry section
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          // Due to be tested with .scss files
          use:[ {
                  loader: "css-loader",// translates CSS into CommonJS
                  options: {
                    sourceMap: true 
                  }
                }, {
                  loader: "sass-loader" ,// compiles Sass to CSS
                  options: {
                    sourceMap: true 
                  }
                }
              ]
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
      }),
      //Seting up for production: When 'process.env.NODE_ENV' === 'production', react bypassing all error checking procedures in dev mode
      new webpack.DefinePlugin({ 
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'build'),
    inline: true,
    hot: true,
    host: '0.0.0.0',
    port: 3210,
  },
};

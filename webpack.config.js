const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin");

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

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV !== "production"
});

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
        test: /\.(scss|css)$/,
        use: extractSass.extract({
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
    new WebpackCleanupPlugin(), 
    extractSass,
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    // **Uncomment to use Uglifyjs
    // new UglifyJSPlugin({
    //   parallel: {
    //     cache: true,
    //     workers: 4 // for e.g
    //   },
    //   sourceMap: true
    // }),
    // **Uncomment to build to compressed .gz files
    // new CompressionPlugin({
    //     asset: "[path].gz[query]",
    //     algorithm: "gzip",
    //     test: /\.js$|\.html$|\.json$/,
    //     threshold: 2048,
    //     minRatio: 0.8
    // }),
    //Seting up for production: When 'process.env.NODE_ENV' === 'production', react bypassing all error checking procedures in dev mode
    new webpack.DefinePlugin({ 
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
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

const path = require('path');

const {ESBuildMinifyPlugin} = require('esbuild-loader')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index'),
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'jsx', // Remove this if you're not using JSX
          target: 'es2015' // Syntax to compile to (see options below for possible values)
        }
      },
      {
        test: /\.css$/,
        use: [{
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, '/'),
    port: 9000
  },
  optimization: {
    minimize: true,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015', // Syntax to compile to (see options below for possible values)
        css: true  // Apply minification to CSS assets
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    }),
    /*new HtmlWebpackPlugin({
      template: "src/index.html" //source html
    })*/
  ]
};

//module.exports = config;

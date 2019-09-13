const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const { env } = process;

const options = {
  mode: env.NODE_ENV,
  entry: ['babel-core/register', 'babel-polyfill', './src/index.js'],
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: /\.css$/,
        exclude: /node_modules/,
        use: [{
          loader: 'style-loader',
          options: {
            injectType: 'linkTag',
          }
        }, 'file-loader'],
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[sha512:hash:base64:7].[ext]',
          },
        }
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            // Inline files smaller than 10 kB
            limit: 10 * 1024,
          },
        },
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV) }),
    new HtmlWebpackPlugin({
      title: 'React Hooks',
      inject: true, // Inject all files that are generated by webpack
      template: 'public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    // new BrowserSyncPlugin({
    //   host: 'localhost',
    //   port: 3000,
    //   // server: { baseDir: ['dist'] },
    //   // files: ['./dist/*'],
    //   notify: false
    // })
  ],
  devServer: {
    hot: true
  },
  devtool: env.NODE_ENV === 'development' ? 'cheap-module-eval-source-map' : undefined
};

module.exports = options;

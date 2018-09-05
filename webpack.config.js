const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: {
    app: './app/scripts/index.js',
    reviewer: './app/scripts/reviewer.js',
    uploader: './app/scripts/uploader.js',
    card: './app/scripts/card.js',
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  plugins: [
    // Copy our app's index.html to the build folder.
    new HtmlWebpackPlugin({ 
      filename: 'index.html',
      template: './app/index.html',
      chunks: ['app', 'card'] 
    }),
    new HtmlWebpackPlugin({
        filename: 'uploader.html', 
        template: './app/uploader.html',
        chunks: ['uploader']
    }),
    new HtmlWebpackPlugin({
        filename: 'reviewer.html', 
        template: './app/reviewer.html',
        chunks: ['reviewer']
    })
  ],
  devtool: 'source-map',
  module: {
    rules: [
      { 
        test: /\.s?css$/, 
        use: [ 'style-loader', 'css-loader', 'sass-loader' ] 
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      },     
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['env'],
          plugins: ['transform-react-jsx', 'transform-object-rest-spread', 'transform-runtime']
        }
      }
    ]
  }
}


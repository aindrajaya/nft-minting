const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path');

// const ROOT_DIRECTORY = path.join(__dirname, '..')
// const SRC_DIRECTORY = path.join('src')

const config = {
  mode: "development",
  entry: [path.resolve(__dirname, '/src/index.js')],
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: "jaya.js",
    publicPath: '/'
  },
  resolve: {
    modules: [path.resolve('node_modules'), 'node_modules']
  },
  module: {
    "rules": [
      {
        "test": /\.css$/,
        "use": [
          "style-loader",
          "css-loader"
        ]
      },
      {
        "test": /\.js$/,
        "exclude": /node_modules/,
        "use": {
          "loader": "babel-loader",
          "options": {
            "presets": [
              "@babel/preset-env",
            ]
          }
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html")
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.join(SRC_DIRECTORY, 'assets'),
    //       to: path.join('build') 
    //     }
    //   ]
    // })
  ]
}

module.exports = config
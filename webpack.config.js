const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

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
        "test": /\.js|jsx$/,
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
    })
  ]
}

module.exports = config
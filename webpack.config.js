var webpack = require('webpack');
var path = require('path');
var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    compressor: {
        screw_ie8: true,
        warnings: false
    },
    output: {
        comments: false
    }
});

module.exports = {
  entry: './src/app.ts',
  output: {
    filename: 'js/app.js',
    path: './dist',
    publicPath: 'https://assets.transparentkitchen.ca/'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.ts', '.js', '.json'],
    root: [
      path.resolve('./node_modules')
    ]
  },
  plugins: [
      uglifyJsPlugin
  ],
  module: {
    loaders: [
        { test: /\.ts$/, loader: 'ts-loader', exclude: "node_modules/" },
        { test: /\.hbs/, loader: "handlebars-loader", exclude: "node_modules/" },
        { test: /\.scss$/, loaders: ["style", "css", "sass"], exclude: "node_modules/" },
        { test: /\.(png|jpg)$/, loader: 'url-loader', exclude: "node_modules/" }
    ]
  }
};

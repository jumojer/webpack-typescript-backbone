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

module.exports.production = {
  entry: './src/js/app.ts',
  output: {
    filename: 'js/app.js',
    path: path.resolve('./dist'),
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

module.exports.development = {
    entry: './src/js/app.ts',
    output: {
        filename: 'js/app.js',
        path: path.resolve('./dist'),
    },
    devtool: 'source-map',
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
            { test: /\.scss$/, loaders: ["style", "css?sourceMap", "sass?sourceMap"], exclude: "node_modules/" },
            { test: /\.(png|jpg)$/, loader: 'url-loader', exclude: "node_modules/" }
        ]
    }
};

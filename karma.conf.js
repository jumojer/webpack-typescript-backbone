var webpack = require('webpack');

module.exports = function(config) {
  config.set({

  basePath: '',

  frameworks: ['mocha'],

  files: [
    'tests/index.ts',
    'tests/**/*.ts'
  ],

  preprocessors: {
    'tests/*': ['webpack']
  },

  webpack: {
    module: {
      loaders : [
        { test: /\.ts$/, loader: 'ts-loader', exclude: "node_modules/" },
        { test: /\.hbs/, loader: "handlebars-loader", exclude: "node_modules/" }
      ]
    }
  },

  webpackMiddleware: {
    stats: {
      colors: true
    },
    quiet: true
  },

  reporters: ['progress'],

  port: 9876,

  colors: true,

  logLevel: config.LOG_DISABLE,

  autoWatch: true,

  browsers: ['Chrome'],

  captureTimeout: 60000,

  singleRun: false,

  plugins: [
    require('karma-webpack'),
    require('karma-mocha'),
    require('karma-spec-reporter'),
    require('karma-chrome-launcher')
  ]
  });
};
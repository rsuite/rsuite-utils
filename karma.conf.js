
var webpackConfig = {
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: [
        'babel?babelrc'
      ],
      exclude: /node_modules/
    }]
  },
  externals: {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  devtool: 'inline-source-map'
};

module.exports = function (config) {
  const { env } = process;
  config.set({
    basePath: '',
    files: ['test/index.js'],
    frameworks: [
      'mocha',
      'sinon-chai'
    ],
    colors: true,
    reporters: ['mocha'],

    logLevel: config.LOG_INFO,
    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    browsers: env.BROWSER ? env.BROWSER.split(',') : ['Chrome'],
    customLaunchers: {
      ChromeCi: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    }
  });
};


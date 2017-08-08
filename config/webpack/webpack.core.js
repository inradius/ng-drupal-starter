const webpack = require('webpack');
const chalk = require('chalk');
const env = require('dotenv').config().parsed;
const _ = require('lodash');

const constants = require('./constants');
const helpers = require('./helpers');
const envMap = _.mapValues(env, v => JSON.stringify(v));

if (!envMap.APP_ENV) {
  envMap.APP_ENV = '"development"';
  console.log('APP_ENV is not set in your .env, it will default to "development"');
} else {
  const color = constants.ENV_COLOR[env.APP_ENV] || 'bgMagenta';
  console.log('APP_ENV is ' + chalk[color]('%s'), envMap.APP_ENV);
}

module.exports = {
  performance: {
    hints: false
  },
  resolve: {
    extensions: ['.js', '.ts'],
      modules: [helpers.root('node_modules')]
  },
  resolveLoader: {
    modules: [helpers.root('node_modules')]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': envMap
    }),
    new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
    }),
    new webpack.ContextReplacementPlugin(
        constants.CONTEXT_REPLACE_REGEX,
        helpers.root('./src')
    )
  ]
};

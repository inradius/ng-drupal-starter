require('ts-node').register({
  project: 'tsconfig-e2e.json'
});

var helpers = require('../webpack/helpers');

exports.config = {
  baseUrl: 'http://localhost:8080/',

  specs: [
    helpers.root('e2e/**/*.spec.ts')
  ],
  exclude: [],

  framework: 'jasmine2',

  allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000
  },
  directConnect: true,

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true']
    }
  },

  onPrepare: function() {
    browser.ignoreSynchronization = true;
  },

  /**
   * Angular configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular apps on the page instead of just the one matching
   * `rootEl`
   */
   useAllAngular2AppRoots: true
};

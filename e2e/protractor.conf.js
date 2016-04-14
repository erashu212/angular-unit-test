exports.config = {
  onPrepare: function() {
    var SpecReporter = require('jasmine-spec-reporter');
    // add jasmine spec reporter
    jasmine.getEnv().addReporter(new SpecReporter({
      displayStacktrace: 'none',
      colors: {
        success: 'green',
        failure: 'red',
        pending: 'yellow'
      },
      prefixes: {
        success: '✓ ',
        failure: '✗ ',
        pending: '* '
      },
    }));
  },
  capabilities: {
    'browserName': 'chrome',
  },
  specs: [
    'tests/*.js'
  ],
  chromeOnly: true,
  baseUrl: 'http://localhost:3333',
  framework: 'jasmine',
  allScriptsTimeout: 500000,
  rootElement: 'body',
  jasmineNodeOpts: {
    showColors: true,
    isVerbose: true,
    realtimeFailure: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 30000
  }
};

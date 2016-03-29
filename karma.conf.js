module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: ['spec'],
    browsers: ['PhantomJS'],
    // list of files to exclude
    exclude: [
    ],
    files: [
      'assets/js/angular.js',
      'assets/js/angular-route.js',
      'assets/js/angular-ui-router.min.js',
      'assets/js/angular-sanitize.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'app.js',
      'services/*.js',
      'controllers/*.js',
      'app.unit.js',
      'controllers/*.unit.js',
      'services/*.unit.js'
    ]
  });
};

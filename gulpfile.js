'use strict';

var Server = require('karma').Server;
var gulp = require('gulp');
var protractorQA = require('gulp-angular-protractor');
var gprotractor = require('gulp-protractor');

// Start a standalone server
var webdriver_standalone = gprotractor.webdriver_start;

// Download and update the selenium driver
var webdriver_update = gprotractor.webdriver_update;

gulp.task('webdriver_standalone', webdriver_standalone);

// Downloads the selenium webdriver
gulp.task('webdriver_update', webdriver_update);


gulp.task('test', function(callback) {
  gulp
    .src(['./e2e/tests/*.js'])
    .pipe(protractorQA({
      'configFile': './e2e/protractor.conf.js',
      'debug': false,
      'autoStartStopServer': true
    }))
    .on('error', function(e) {
      console.log(e);
    })
    .on('end', callback);
});

gulp.task('unit', function(done) {
  return new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

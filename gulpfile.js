'use strict';

var Server = require('karma').Server;
var gulp = require('gulp');

gulp.task('test', function (done) {
  return new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

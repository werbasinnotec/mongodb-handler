'use strict';

const eslint = require('gulp-eslint');
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const shell = require('gulp-shell');
const watch = require('gulp-watch');
const batch = require('gulp-batch');

const paths = {
  analyze: [ '**/*.js', '!node_modules/**/*.js', '!coverage/**/*.js' ],
  tests: [ 'test/**/*Test.js' ]
};

/* eslint-disable no-process-exit */
gulp.task('test', () => {
  return gulp.src(paths.tests, { read: false }).
  pipe(mocha({ timeout: 15000 })).
  once('error', function (err) {
    /* eslint-disable no-console */
    console.log(err.stack);
    /* eslint-enable no-console*/

    process.exit(1);
  }).
  once('end', function () {
    process.exit();
  });
});

gulp.task('lint', function () {
  return gulp.src(paths.analyze).
		pipe(eslint({
      parserOptions: {
        ecmaVersion: 8
      }
    })).
    pipe(eslint.format()).
    pipe(eslint.failAfterError());
});

gulp.task('watch', function () {
  watch(paths.analyze, batch(function (events, done) {
    gulp.start('default', done);
  }));
});

gulp.task('default', shell.task([
  'gulp lint',
  'gulp test'
]));
/* eslint-enable no-process-exit */

'use strict';

const roboter = require('roboter');

roboter.
  workOn('server').
  equipWith(function (task) {
    task('universal/analyze', {
      src: [ '**/*.js', '!node_modules/**/*.js', '!coverage/**/*.js' ],
      rules: '.eslintrc'
    });

    task('universal/test-units', {
      src: 'test/**/*Test.js'
    });
  }).
  start();

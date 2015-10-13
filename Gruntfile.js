'use strict';

const tourism = require('tourism');

module.exports = tourism({
  analyse: {
    server: [ '**/*.js', '!node_modules/**/*.js', '!coverage/**/*.js', '!use.js' ],
    options: {
      server: {
        language: 'es6'
      }
    }
  },
  test: {
    server: [ 'test/**/*.js' ]
  }
});

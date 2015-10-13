'use strict';

const assert = require('assertthat');
const mdbhandler = require('../lib/app.js');

suite('Test function mongodb-handler ', function () {
  test('mongodb-handler is a function.', function (done) {
    assert.that(mdbhandler).is.ofType('function');
    done();
  });

  test('mongodb-handler throws an error when method is not defined', function (done) {
    assert.that(function () {
      mdbhandler();
    }).is.throwing('method is not defined');
    done();
  });

  test('mongodb-handler throws an error when options is not defined', function (done) {
    assert.that(function () {
      mdbhandler('INSERT');
    }).is.throwing('options is not defined');
    done();
  });

  test('mongodb-handler throws an error when config is not defined', function (done) {
    assert.that(function () {
      mdbhandler('INSERT', { foo: 'bar' });
    }).is.throwing('config is not defined');
    done();
  });

  test('mongodb-handler throws an error when method is not avaiable', function (done) {
    assert.that(function () {
      mdbhandler('NOT', { foo: 'bar' }, { dbhost: 'test', dbport: 123, dbuser: 'foo', dbname: 'bar', dbpassword: '123' });
    }).is.throwing('Unknow method to switch');
    done();
  });
});

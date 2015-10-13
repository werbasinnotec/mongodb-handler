'use strict';

const assert = require('assertthat');
const log = require('../../lib/log');

suite('log ', function () {
  test('log.info is a function.', function (done) {
    assert.that(log.info).is.ofType('function');
    done();
  });
  test('log.info bring a info in Console.', function (done) {
    assert.that(log.info('test')).is.true();
    done();
  });
  test('log.debug is a function.', function (done) {
    assert.that(log.debug).is.ofType('function');
    done();
  });
  test('log.info bring a debug in Console.', function (done) {
    assert.that(log.debug('test')).is.true();
    done();
  });
  test('log.error is a function.', function (done) {
    assert.that(log.error).is.ofType('function');
    done();
  });
  test('log.info bring a error in Console.', function (done) {
    assert.that(log.error('test')).is.true();
    done();
  });
});

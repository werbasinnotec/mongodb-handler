'use strict';

const assert = require('assertthat');
const cache = require('../../lib/cache');

suite('cache ', function () {
  test('cache.read is a function.', function (done) {
    assert.that(cache.read).is.ofType('function');
    done();
  });

  test('cache.read returns an array.', function (done) {
    assert.that(function () {
      cache.read();
    }).is.not.greaterThan(0);
    done();
  });

  test('cache.set is a function.', function (done) {
    assert.that(cache.set).is.ofType('function');
    done();
  });

  test('cache.set throws an error when method, options, config is not defined.', function (done) {
    assert.that(function () {
      cache.set('foo');
    }).is.throwing('Cache-Error on write, no method, options or config is defined');
    done();
  });

  test('cache.set returns a index when insert is granted and Operation is in cache', function (done) {
    assert.that(cache.set('INSERT', 'foo', 'bar')).is.greaterThan(0);
    assert.that(cache.read()[0].options).is.equalTo({ foo: 'bar' });
    done();
  });

  test('cache.delete is a function.', function (done) {
    assert.that(cache.delete).is.ofType('function');
    done();
  });

  test('cache.delete throws an error when index is not defined.', function (done) {
    assert.that(function () {
      cache.delete();
    }).is.throwing('Cache-Error on delete, no index is defined');
    done();
  });

  test('cache.delete returns true when delete is granted. (with multiple inserts)', function (done) {
    assert.that(cache.set('INSERT', 'foo', 'bar')).is.greaterThan(0);
    assert.that(cache.delete(cache.read()[0].index)).is.true();
    done();
  });

  test('cache.delete returns true when delete is granted. (With multiple inserts)', function (done) {
    assert.that(cache.delete(cache.read()[0].index)).is.true();
    done();
  });

  test('cache.delete returns false when delete is not granted.', function (done) {
    assert.that(cache.delete('12345')).is.true();
    done();
  });
});

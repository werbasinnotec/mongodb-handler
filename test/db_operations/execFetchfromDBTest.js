'use strict';

const assert = require('assertthat');
const execFetchfromDB = require('../../lib/db_operations/execFetchfromDB');

suite('execFetchfromDB ', function () {
  test('is a function.', function (done) {
    assert.that(execFetchfromDB).is.ofType('function');
    done();
  });

  test('throws an error when index is not set.', function (done) {
    assert.that(function () {
      execFetchfromDB();
    }).is.throwing('execFetchfromDB - stampid is not set!');
    done();
  });
});

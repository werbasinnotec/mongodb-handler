'use strict';

const assert = require('assertthat');
const execUpdateinDB = require('../../lib/db_operations/execUpdateinDB');

suite('execUpdateinDB ', function () {
  test('is a function.', function (done) {
    assert.that(execUpdateinDB).is.ofType('function');
    done();
  });

  test('throws an error when index is not set.', function (done) {
    assert.that(function () {
      execUpdateinDB();
    }).is.throwing('execUpdateinDB - stampid is not set!');
    done();
  });
});

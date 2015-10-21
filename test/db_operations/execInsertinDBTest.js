'use strict';

const assert = require('assertthat');
const execInsertinDB = require('../../lib/db_operations/execInsertinDB');

suite('execInsertinDB ', function () {
  test('is a function.', function (done) {
    assert.that(execInsertinDB).is.ofType('function');
    done();
  });

  test('throws an error when index is not set.', function (done) {
    assert.that(function () {
      execInsertinDB();
    }).is.throwing('execInsertinDB - stampid is not set!');
    done();
  });
});

'use strict';

const assert = require('assertthat');
const execInsertinDB = require('../../lib/db_operations/execInsertinDB');
const cache = require('../../lib/cache');

suite('execInsertinDB ', function () {
  test('is a function.', function (done) {
    assert.that(execInsertinDB).is.ofType('function');
    done();
  });

  test('throws an error when index is not set.', function (done) {
    assert.that(function () {
      execInsertinDB();
    }).is.throwing('execInsertinDB - index is not set!');
    done();
  });

  suite('Test Database operations', function () {
    test('callback a error when Database is not reachable', function (done) {
      this.timeout(6 * 1000);

      // Set Test-Options
      const options = { coll: 'test', obj: { foo: 'bar' }};
      const config = { dbhost: '199.9.9.9', dbport: 27021, dbname: 'admin' };
      const opid = cache.set('INSERT', options, config);

      execInsertinDB(opid, function (err, res) {
        assert.that(err.err).is.equalTo('Error on connection');
        assert.that(res).is.false();
        done();
      });
    });

    test('callback an error when Insert is not success', function (done) {
      this.timeout(6 * 1000);

      // Set Test-Options
      const options = 'FOOBAR';
      const config = { dbhost: 'localhost', dbport: 27017, dbname: 'admin' };
      const opid = cache.set('INSERT', options, config);

      execInsertinDB(opid, function (err, res) {
        assert.that(err.err).is.equalTo('Error on operation');
        assert.that(res).is.false();
        done();
      });
    });

    test('callback true when Insert is success', function (done) {
      this.timeout(6 * 1000);

      // Set Test-Options
      const options = { coll: 'test', obj: { foo: 'bar' }};
      const config = { dbhost: 'localhost', dbport: 27017, dbname: 'admin' };
      const opid = cache.set('INSERT', options, config);

      execInsertinDB(opid, function (err, cb) {
        assert.that(err).is.equalTo(null);
        assert.that(cb).is.true();
        done();
      });
    });
  });
});

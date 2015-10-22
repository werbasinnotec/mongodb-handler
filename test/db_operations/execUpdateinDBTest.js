'use strict';

const assert = require('assertthat');
const execUpdateinDB = require('../../lib/db_operations/execUpdateinDB');
const cache = require('../../lib/cache');

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

  suite('Test Database operations', function () {
    test('callback a timeout when Database is not reachable', function (done) {
      this.timeout(6 * 1000);

      // Set Test-Options
      const options = { coll: 'test', criteria: { foo: 'bla' }, obj: { foo: 'bar' }};
      const config = { dbuser: 'test', dbpassword: '123', dbhost: '199.9.9.9', dbport: 27021, dbname: 'admin' };
      const stampid = cache.set('UPDATE', options, config);

      execUpdateinDB(stampid, function (err) {
        assert.that(err.err).is.equalTo('timeout');
        done();
      });
    });

    test('callback an error when delete is not success', function (done) {
      this.timeout(6 * 1000);

      // Set Test-Options
      const options = 'FOOBAR';
      const config = { dbhost: '127.0.0.1', dbport: 27017, dbname: 'admin' };
      const stampid = cache.set('UPDATE', options, config);

      execUpdateinDB(stampid, function (err) {
        assert.that(err.err).is.equalTo('ErrorOnExecution');
        done();
      });
    });

    test('callback true when delete is success', function (done) {
      this.timeout(6 * 1000);

      // Set Test-Options
      const options = { coll: 'test', criteria: { foo: 'bla' }, obj: { foo: 'bar' }};
      const config = { dbhost: '127.0.0.1', dbport: 27017, dbname: 'admin' };
      const stampid = cache.set('UPDATE', options, config);

      execUpdateinDB(stampid, function (err, cb) {
        assert.that(err).is.equalTo(null);
        assert.that(cb).is.true();
        done();
      });
    });
  });
});

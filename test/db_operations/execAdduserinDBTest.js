'use strict';

const assert = require('assertthat');
const execAdduserinDB = require('../../lib/db_operations/execAdduserinDB');
const cache = require('../../lib/cache');

suite('execAdduserinDB ', function () {
  test('is a function.', function (done) {
    assert.that(execAdduserinDB).is.ofType('function');
    done();
  });

  test('throws an error when index is not set.', function (done) {
    assert.that(function () {
      execAdduserinDB();
    }).is.throwing('execAdduserinDB - index is not set!');
    done();
  });

  suite('Test Database operations', function () {
    test('callback a error when Database is not reachable', function (done) {
      this.timeout(6 * 1000);

      // Set Test-Options
      const options = { coll: 'test', obj: { foo: 'bar' }};
      const config = { admindbuser: 'admin', admindbpassword: '1234', dbhost: '199.99.99', dbport: 27021 };
      const opid = cache.set('ADDUSER', options, config);

      execAdduserinDB(opid, function (err, res) {
        assert.that(err.err).is.equalTo('Error on connection');
        assert.that(res).is.false();
        done();
      });
    });

    test('callback an error when adduser is not success', function (done) {
      this.timeout(6 * 1000);

      // Set Test-Options
      const options = { newdbpassword: 'sinatra' };
      const config = { admindbuser: 'admin', admindbpassword: '1234', dbhost: '127.0.0.1', dbport: 27017 };
      const opid = cache.set('ADDUSER', options, config);

      execAdduserinDB(opid, function (err, res) {
        assert.that(err.err).is.equalTo('Error on operation');
        assert.that(res).is.false();
        done();
      });
    });

    test('callback true when adduser is success', function (done) {
      this.timeout(6 * 1000);

      // Set Test-Options
      const options = { newdbuser: 'franky', newdbpassword: 'sinatray', newdbname: 'musicals' };
      const config = { admindbuser: 'admin', admindbpassword: '1234', dbhost: '127.0.0.1', dbport: 27017 };
      const opid = cache.set('ADDUSER', options, config);

      execAdduserinDB(opid, function (err, cb) {
        assert.that(err).is.equalTo(null);
        assert.that(cb).is.true();
        done();
      });
    });
  });
});

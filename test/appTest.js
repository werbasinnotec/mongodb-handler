'use strict';

const assert = require('assertthat');
const mdbhandler = require('../lib/app.js');
const Db = require('mongodb').Db;
const Server = require('mongodb').Server;

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

  test('Add Admin-User to resolve all tests', function (done) {
    const db = new Db('admin', new Server('localhost', 27017));

    this.timeout(6 * 1000);

    // Establish connection to db
    db.open(function (err, ndb) {
      if (err) {
        throw err;
      }

      // Add a user to the database
      ndb.addUser('test', '1234');
      ndb.close();
    });
    done();
  });

  test('mongodb-handler callback true when adduser is granted', function (done) {
    const options = { newdbuser: 'frank', newdbpassword: 'sinatra', newdbname: 'musicals' };
    const config = { admindbuser: 'test', admindbpassword: '1234', dbhost: 'localhost', dbport: 27017 };

    this.timeout(6 * 1000);

    setTimeout(function () {
      mdbhandler('ADDUSER', options, config, function (err, cb) {
        assert.that(err).is.equalTo(null);
        assert.that(cb).is.true();
        done();
      });
    }, 5000);
  });

  test('mongodb-handler callback true when insert is granted', function (done) {
    this.timeout(6 * 1000);

    setTimeout(function () {
      mdbhandler('INSERT', { coll: 'test', obj: { foo: 'bar' }}, { dbuser: 'frank', dbpassword: 'sinatra', dbhost: 'localhost', dbport: 27017, dbname: 'musicals' }, function (err, cb) {
        assert.that(err).is.equalTo(null);
        assert.that(cb).is.true();
        done();
      });
    }, 5000);
  });

  test('mongodb-handler callback true when update is granted', function (done) {
    this.timeout(6 * 1000);

    mdbhandler('INSERT', { coll: 'test', obj: { foo: 'bar' }}, { dbuser: 'frank', dbpassword: 'sinatra', dbhost: 'localhost', dbport: 27017, dbname: 'musicals' }, function (err, cb) {
      assert.that(err).is.equalTo(null);
      assert.that(cb).is.true();
    });

    mdbhandler('UPDATE', { coll: 'test', criteria: { foo: 'bar' }, obj: { foo: 'large' }}, { dbuser: 'frank', dbpassword: 'sinatra', dbhost: 'localhost', dbport: 27017, dbname: 'musicals' }, function (err, cb) {
      assert.that(err).is.equalTo(null);
      assert.that(cb).is.true();
      done();
    });
  });

  test('mongodb-handler callback true when delete is granted', function (done) {
    this.timeout(6 * 1000);

    mdbhandler('INSERT', { coll: 'test', obj: { foo: 'bar' }}, { dbuser: 'frank', dbpassword: 'sinatra', dbhost: 'localhost', dbport: 27017, dbname: 'musicals' }, function (err, cb) {
      assert.that(err).is.equalTo(null);
      assert.that(cb).is.true();
    });

    mdbhandler('DELETE', { coll: 'test', obj: { foo: 'bar' }}, { dbuser: 'frank', dbpassword: 'sinatra', dbhost: 'localhost', dbport: 27017, dbname: 'musicals' }, function (err, cb) {
      assert.that(err).is.equalTo(null);
      assert.that(cb).is.true();
      done();
    });
  });

  test('mongodb-handler callback a object when fetch is granted', function (done) {
    this.timeout(6 * 1000);

    mdbhandler('INSERT', { coll: 'test', obj: { foo: 'bar' }}, { dbuser: 'frank', dbpassword: 'sinatra', dbhost: 'localhost', dbport: 27017, dbname: 'musicals' }, function (err, cb) {
      assert.that(err).is.equalTo(null);
      assert.that(cb).is.true();
    });

    mdbhandler('FETCH', { coll: 'test', obj: { foo: 'bar' }}, { dbuser: 'frank', dbpassword: 'sinatra', dbhost: 'localhost', dbport: 27017, dbname: 'musicals' }, function (err, cb) {
      assert.that(err).is.equalTo(null);
      assert.that(cb).is.ofType('object');
      done();
    });
  });

  test('mongodb-handler throws an error when method is not avaiable', function (done) {
    assert.that(function () {
      mdbhandler('NOT', { foo: 'bar' }, { dbhost: 'test', dbport: 123, dbuser: 'foo', dbname: 'bar', dbpassword: '123' });
    }).is.throwing('Unknow method to switch');
    done();
  });
});

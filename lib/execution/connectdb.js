'use strict';

const MongoClient = require('mongodb').MongoClient;
const Promise = require('bluebird');
const cache = require('./setandreadcache');

const connectdb = function (connectionstring, callback) {
  MongoClient.connect(connectionstring, { promiseLibrary: Promise, native_parser: true, auto_reconnect: true, poolSize: 5 }, (err, db) => {
    if (err) {
      return callback(err);
    }

    callback(null, db);
  });
};

module.exports = connectdb;

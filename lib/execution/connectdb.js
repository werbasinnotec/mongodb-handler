'use strict';

const MongoClient = require('mongodb').MongoClient;
const Promise = require('bluebird');

const connectdb = function (connectionstring, callback) {
  MongoClient.connect(connectionstring, {
    promiseLibrary: Promise,
    native_parser: true,
    auto_reconnect: true,
    poolSize: 5,
    useNewUrlParser: true
  }, (err, client) => {
    if (err) {
      return callback(err);
    }

    callback(null, client);
  });
};

module.exports = connectdb;

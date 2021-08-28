'use strict';

const MongoClient = require('mongodb').MongoClient;

const connectdb = function (connectionstring, callback) {
  MongoClient.connect(connectionstring, {
    useNewUrlParser: true
  }, (err, client) => {
    if (err) {
      return callback(err);
    }

    callback(null, client);
  });
};

module.exports = connectdb;

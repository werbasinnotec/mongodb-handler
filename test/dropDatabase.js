'use strict';

const MongoClient = require('mongodb').MongoClient;

const dropDatabase = (callback) => {
  /* eslint-disable no-console */
  console.log('Drop Database for tests');
  /* eslint-enable no-console */
  MongoClient.connect('mongodb://localhost:27017/mdbtest', (err, client) => {
    if (err) {
      return callback(err);
    }

    client.db().dropDatabase((err2) => {
      if (err2) {
        return callback(err2);
      }

      callback(null, true);
    });
  });
};

module.exports = dropDatabase;

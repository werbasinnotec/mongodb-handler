'use strict';

const cache = require('../cache');
const log = require('../log');
const MongoClient = require('mongodb').MongoClient;

const execFetchfromDB = function (index, callback) {
  if (!index) {
    throw new Error('execFetchfromDB - index is not set!');
  }

  let config;
  let options;
  let response;

  const promise = new Promise(function (resolve) {
    resolve();
  });

  // Read Operation from Cache
  promise.then(function () {
    return cache.read();
  }).then(function (operations) {
    let i = 0;

    for (i; i < operations.length; i++) {
      if (operations[i].index === index) {
        config = operations[i].config;
        options = operations[i].options;
      }
    }

    cache.delete(index);

  // Begin connection to database
  }).then(function () {
    let auth;

    if (config.dbuser) {
      auth = config.dbuser + ':' + config.dbpassword + '@';
    } else {
      auth = '';
    }

    log.debug('Running Function execFetchfromDB with follow index: ' + index + ' and follow Operationqueries: ' + JSON.stringify(config) + ' ' + JSON.stringify(options));
    return MongoClient.connect('mongodb://' + auth + config.dbhost +
                                ':' + config.dbport + '/?connectTimeoutMS=5000');

  // Catch error on Database connection
  }).catch(function (err) {
    log.error('Error on Mongo Connect: ' + err);
    return callback({ err: 'Error on connection' }, false);

  // Begin Database-Operation
  }).then(function (db) {
    log.info('Begin operation on collection');

    const collection = db.collection(options.coll);

    response = collection.find(options.obj).toArray();
    db.close();

  // Catch Error on Operation
  }).catch(function (err) {
    log.error('Error on Fetch: ' + err);
    callback({ err: 'Error on operation' }, false);

  // Final Callback
  }).then(function () {
    callback(null, response);
  });
};

module.exports = execFetchfromDB;

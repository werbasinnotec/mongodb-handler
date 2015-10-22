'use strict';

const cache = require('../cache');
const log = require('../log');
const MongoClient = require('mongodb').MongoClient;

const execFetchfromDB = function (index, callback) {
  if (!index) {
    throw new Error('execFetchfromDB - stampid is not set!');
  }

  let config;
  let options;
  let response;

  const promise = new Promise(function (resolve) {
    resolve();
  });

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
  }).catch(function (err) {
    log.error('Error on Mongo Connect: ' + err);
    return callback({ err: 'timeout' });
  }).then(function (db) {
    log.info('Begin operation on collection');

    const collection = db.collection(options.coll);

    response = collection.find(options.obj).toArray();
  }).catch(function (err) {
    log.error('Error on Delete: ' + err);
    return callback({ err: 'ErrorOnExecution' });
  }).then(function () {
    // delete Operation from cache
    cache.delete(index);

    callback(null, response);
  });
};

module.exports = execFetchfromDB;

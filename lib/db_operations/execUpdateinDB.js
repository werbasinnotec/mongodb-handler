'use strict';

const cache = require('../cache');
const log = require('../log');
const MongoClient = require('mongodb').MongoClient;

const execUpdateinDB = function (index, callback) {
  if (!index) {
    throw new Error('execUpdateinDB - index is not set!');
  }

  let config;
  let options;

  const promise = new Promise(function (resolve) {
    resolve();
  });

  promise.then(function () {
    return cache.read();

  // Read Operation from Cache
  }).then(function (operations) {
    let i = 0;

    for (i; i < operations.length; i++) {
      if (operations[i].index === index) {
        config = operations[i].config;
        options = operations[i].options;
      }
    }

    cache.delete(index);

  // Begin Connection to database
  }).then(function () {
    let auth;

    if (config.dbuser) {
      auth = config.dbuser + ':' + config.dbpassword + '@';
    } else {
      auth = '';
    }

    const connectionstring = 'mongodb://' + auth + config.dbhost + ':' + config.dbport + '/' + config.dbname + '/?connectTimeoutMS=5000';

    log.debug('Follow connectionstring is in use ' + connectionstring);
    log.debug('Running Function execUpdateInDB with follow index: ' + index + ' and follow Operationqueries: ' + JSON.stringify(config) + ' ' + JSON.stringify(options));

    return MongoClient.connect(connectionstring);

  // Catch error on Database connection
  }).catch(function (err) {
    log.error('Error on Mongo Connect: ' + err);
    return callback({ err: 'Error on connection' }, false);

  // Begin Database-Operation
  }).then(function (db) {
    log.info('Begin operation on collection');

    const collection = db.collection(options.coll);

    collection.update(options.criteria, options.obj);
    db.close();

  // Catch Error on Operation
  }).catch(function (err) {
    log.error('Error on Update: ' + err);
    callback({ err: 'Error on operation' }, false);

  // Final Callback
  }).then(function () {
    callback(null, true);
  });
};

module.exports = execUpdateinDB;

'use strict';

const cache = require('../cache');
const log = require('../log');
const MongoClient = require('mongodb').MongoClient;

const execDeleteinDB = function (index, callback) {
  if (!index) {
    throw new Error('execDeleteinDB - index is not set!');
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
  }).then(function () {
    let auth;

    if (config.dbuser) {
      auth = config.dbuser + ':' + config.dbpassword + '@';
    } else {
      auth = '';
    }

    const connectionstring = 'mongodb://' + auth + config.dbhost + ':' + config.dbport + '/' + config.dbname + '/?connectTimeoutMS=5000';

    log.debug('Follow connectionstring is in use ' + connectionstring);
    log.debug('Running Function execDeleteInDB with follow index: ' + index + ' and follow Operationqueries: ' + JSON.stringify(config) + ' ' + JSON.stringify(options));

    return MongoClient.connect(connectionstring);
  }).then(function (db) {
    log.info('Begin operation on collection');

    const collection = db.collection(options.coll);

    collection.deleteMany(options.obj);
    db.close();
  }).then(function () {
    callback(null, true);
  }).catch(function (err) {
    log.error('Error on delete... ' + err);
    callback(new Error(err), false);
  });
};

module.exports = execDeleteinDB;

'use strict';

const cache = require('../cache');
const log = require('../log');
const Db = require('mongodb').Db;
const Server = require('mongodb').Server;

const execAdduserinDB = function (index, callback) {
  if (!index) {
    throw new Error('execAdduserinDB - index is not set!');
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
    log.debug('Running Function execAdduserinDB with follow index: ' + index + ' and follow Operationqueries: ' + JSON.stringify(config) + ' ' + JSON.stringify(options));
    const db = new Db(options.newdbname, new Server(config.dbhost, config.dbport));

    return db;

  // Catch error on Database connection
  }).catch(function (err) {
    log.error('Error on Mongo Connect: ' + err);
    return callback({ err: 'Error on connection' }, false);

  // Authenticate on Admin-DB
  }).then(function (db) {
    log.info('Authenticate as admin-user');

    db.open(function () {
      const adminDb = db.admin();

      adminDb.authenticate(config.admindbuser, config.admindbpassword, function () {
        db.addUser(options.newdbuser, options.newdbpassword);
      });
    });

  // Catch Error on Operation
  }).catch(function (err) {
    log.error('Error on AddUser: ' + err);
    return callback({ err: 'Error on operation' }, false);

  // Final Callback
  }).then(function () {
    callback(null, true);
  });
};

module.exports = execAdduserinDB;

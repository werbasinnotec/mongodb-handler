'use strict';

const log = require('./log');
const MongoClient = require('mongodb').MongoClient;

const mdbhandler = function (method, options, config, callback) {
  if (!method) {
    throw new Error('method is not defined');
  }

  if (!options) {
    throw new Error('options is not defined');
  }

  if (!config || !config.dbhost || !config.dbport || !config.dbuser || !config.dbname || !config.dbpassword) {
    throw new Error('config is not defined');
  }

  MongoClient.connect('mongodb://' + config.dbuser + ':' + config.dbpassword + '@' + config.dbhost + ':' + config.dbport + '/' + config.dbname, function (err, db) {
    if (err) {
      log.info(err);
    }

    log.info(db);
  });

  switch (method) {
    case 'INSERT':
      log.debug('startet INSERT with follow options: ' + JSON.stringify(options));

      callback(true);
      break;

    case 'UPDATE':
      log.info('Follow Requirement startet: UPDATE');
      break;

    case 'FETCH':
      log.info('Follow Requirement startet: FETCH');
      break;

    case 'DELETE':
      log.info('Follow Requirement startet: DELETE');
      break;

    default:
      throw new Error('Unknow method to switch');
  }
};

module.exports = mdbhandler;

'use strict';

const cache = require('./cache');
const execAdduserinDB = require('./db_operations/execAdduserinDB');
const execDeleteinDB = require('./db_operations/execDeleteinDB');
const execFetchfromDB = require('./db_operations/execFetchfromDB');
const execInsertinDB = require('./db_operations/execInsertinDB');
const execUpdateinDB = require('./db_operations/execUpdateinDB');
const log = require('./log');

const mdbhandler = function (method, options, config, callback) {
  if (!method) {
    throw new Error('method is not defined');
  }

  if (!options) {
    throw new Error('options is not defined');
  }

  if (!config || !config.dbhost || !config.dbport) {
    throw new Error('config is not defined');
  }

  // Write Operation to Cache
  const operationid = cache.set(method, options, config);

  switch (method) {
    case 'INSERT':
      log.info('Follow Requirement startet: INSERT ' + JSON.stringify(options));
      execInsertinDB(operationid, function (err, cb) {
        return callback(err, cb);
      });
      break;

    case 'UPDATE':
      log.info('Follow Requirement startet: UPDATE');
      execUpdateinDB(operationid, function (err, cb) {
        callback(err, cb);
      });
      break;

    case 'FETCH':
      log.info('Follow Requirement startet: FETCH');
      execFetchfromDB(operationid, function (err, cb) {
        callback(err, cb);
      });
      break;

    case 'DELETE':
      log.info('Follow Requirement startet: DELETE');
      execDeleteinDB(operationid, function (err, cb) {
        callback(err, cb);
      });
      break;

    case 'ADDUSER':
      log.info('Follow Requirement startet: ADDUSER');
      execAdduserinDB(operationid, function (err, cb) {
        callback(err, cb);
      });
      break;

    default:
      throw new Error('Unknow method to switch');
  }
};

module.exports = mdbhandler;

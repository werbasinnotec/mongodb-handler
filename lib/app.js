'use strict';

const cache = require('./cache');
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

  if (!config || !config.dbhost || !config.dbport || !config.dbname) {
    throw new Error('config is not defined');
  }

  // Write Operation to Cache
  const stampid = cache.set(method, options, config);

  switch (method) {
    case 'INSERT':
      log.info('Follow Requirement startet: INSERT ' + JSON.stringify(options));
      execInsertinDB(stampid, function (err, cb) {
        return callback(err, cb);
      });
      break;

    case 'UPDATE':
      log.info('Follow Requirement startet: UPDATE');
      execUpdateinDB(stampid, function (updateCallback) {
        callback(updateCallback);
      });
      break;

    case 'FETCH':
      log.info('Follow Requirement startet: FETCH');
      execFetchfromDB(stampid, function (fetchCallback) {
        callback(fetchCallback);
      });
      break;

    case 'DELETE':
      log.info('Follow Requirement startet: DELETE');
      execDeleteinDB(stampid, function (deleteCallback) {
        callback(deleteCallback);
      });
      break;

    default:
      throw new Error('Unknow method to switch');
  }
};

module.exports = mdbhandler;

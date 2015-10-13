'use strict';

const log = require('./log');

const mdbhandler = function (method, options, config, callback) {
  if (!method) {
    throw new Error('method is not defined');
  }

  if (!options) {
    throw new Error('options is not defined');
  }

  if (!config) {
    throw new Error('config is not defined');
  }

  switch (method) {
    case 'INSERT':
      log.info('Follow Requirement startet: INSERT');
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

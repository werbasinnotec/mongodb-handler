'use strict';

// define logging
const Log = require('log');
const logDebug = new Log('debug'),
    logError = new Log('error'),
    logInfo = new Log('info');

exports.debug = function (text) {
  logDebug.debug('>> Mongodb-Handlermodul << ' + text);
  return true;
};

exports.info = function (text) {
  logInfo.info('>> Mongodb-Handlermodul << ' + text);
  return true;
};

exports.error = function (text) {
  logError.error('>> Mongodb-Handlermodul << ' + text);
  return true;
};

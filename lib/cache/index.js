'use strict';

const NodeCache = require('node-cache');
const cache = new NodeCache();
const moment = require('moment');

exports.read = function () {
  const operations = cache.get('operations');

  return operations;
};

exports.set = function (method, options, config) {
  if (!method || !options || !config) {
    throw new Error('Cache-Error on write, no method, options or config is defined');
  }

  let operations;

  if (cache.get('operations')) {
    operations = cache.get('operations');
  } else {
    operations = [];
  }

  const stamp = moment().unix();

  operations.push({ index: stamp, method, options, config });

  cache.set('operations', operations);

  return stamp;
};

exports.delete = function (index) {
  if (!index) {
    throw new Error('Cache-Error on delete, no index is defined');
  }

  let i = 0;
  const operations = cache.get('operations');

  for (i; i < operations.length; i++) {
    if (operations[i].index === index) {
      operations.splice(i, 1);
    }
  }

  cache.set('operations', operations);

  return true;
};

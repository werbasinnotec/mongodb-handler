'use strict';

const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });

exports.read = function (key) {
  return myCache.get(key);
};

exports.set = function (key, string) {
  myCache.set(key, string);
  return true;
};

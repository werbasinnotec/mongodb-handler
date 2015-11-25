'use strict';

const execution = require('./execution');

const mdbhandler = {
  insert: (config, options, callback) => {
    execution('insert', config, options, (err, cb) => {
      callback(err, cb);
    });
  },

  delete: (config, options, callback) => {
    execution('delete', config, options, (err, cb) => {
      callback(err, cb);
    });
  },

  update: (config, options, callback) => {
    execution('update', config, options, (err, cb) => {
      callback(err, cb);
    });
  },

  findandupdate: (config, options, callback) => {
    execution('findandupdate', config, options, (err, cb) => {
      callback(err, cb);
    });
  },

  fetch: (config, options, callback) => {
    execution('fetch', config, options, (err, cb) => {
      callback(err, cb);
    });
  }
};

module.exports = mdbhandler;

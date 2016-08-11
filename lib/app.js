'use strict';

const query = require('./server');

const mdbhandler = {
  insert: (options, callback) => {
    query('insert', options, (err, cb) => {
      callback(err, cb);
    });
  },

  delete: (options, callback) => {
    query('delete', options, (err, cb) => {
      callback(err, cb);
    });
  },

  update: (options, callback) => {
    query('update', options, (err, cb) => {
      callback(err, cb);
    });
  },

  findandupdate: (options, callback) => {
    query('findandupdate', options, (err, cb) => {
      callback(err, cb);
    });
  },

  fetch: (options, callback) => {
    query('fetch', options, (err, cb) => {
      callback(err, cb);
    });
  },

  bulk: (options, callback) => {
    query('bulk', options, (err, cb) => {
      callback(err, cb);
    });
  }
};

module.exports = mdbhandler;

'use strict';

const query = require('./server');
const Connection = require('./connection');
const ObjectID = require('mongodb').ObjectID;

const c = new Connection();

const mdbhandler = {
  start: () => {
    c.start();

    return c;
  },

  insert: (options, callback) => {
    query('insert', options, (err, cb) => {
      if (err) {
        return callback(err);
      }

      c.sendInsert(options.collection, cb.ops[0]);

      callback(null, cb);
    });
  },

  delete: (options, callback) => {
    query('delete', options, (err, cb) => {
      if (err) {
        return callback(err);
      }

      c.sendDelete(options.collection, options.doc);

      callback(null, cb);
    });
  },

  update: (options, callback) => {
    query('update', options, (err, cb) => {
      if (err) {
        return callback(err);
      }

      c.sendUpdate(options.collection, options.doc);

      callback(null, cb);
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
      if (err) {
        return callback(err);
      }
      const insertIDs = cb.getInsertedIds();

      for (let i = 0; i < options.doc.length; i++) {
        options.doc[i]._id = insertIDs[i]._id;
      }

      c.sendBulkInsert(options.collection, options.doc);

      callback(null, cb);
    });
  },

  fetchlastNdocuments: (options, callback) => {
    query('fetchlastNdocuments', options, (err, cb) => {
      callback(err, cb);
    });
  },

  validateObjectID: (objectid) => {
    if (/[a-f0-9]{24}/.test(objectid)) {
      objectid = new ObjectID(objectid.toString());
    }

    return objectid;
  }
};

module.exports = mdbhandler;

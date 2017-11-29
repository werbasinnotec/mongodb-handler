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
    options = mdbhandler.validateOptions(options);

    if (callback && typeof callback === 'function') {
      query('insert', options, (err, cb) => {
        if (err) {
          return callback(err);
        }

        c.sendInsert(options.collection, cb.ops[0], options.userId);

        return callback(null, cb);
      });
    } else {
      return new Promise((resolve, reject) => {
        query('insert', options, (err, cb) => {
          if (err) {
            return reject(err);
          }

          c.sendInsert(options.collection, cb.ops[0], options.userId);

          resolve(cb);
        });
      });
    }
  },

  delete: (options, callback) => {
    options = mdbhandler.validateOptions(options);

    if (callback && typeof callback === 'function') {
      query('delete', options, (err, cb) => {
        if (err) {
          return callback(err);
        }

        c.sendDelete(options.collection, options.doc, options.userId);

        return callback(null, cb);
      });
    } else {
      return new Promise((resolve, reject) => {
        query('delete', options, (err, cb) => {
          if (err) {
            return reject(err);
          }

          c.sendDelete(options.collection, options.doc, options.userId);

          resolve(cb);
        });
      });
    }
  },

  update: (options, callback) => {
    options = mdbhandler.validateOptions(options);

    if (callback && typeof callback === 'function') {
      query('update', options, (err, cb) => {
        if (err) {
          return callback(err);
        }

        c.sendUpdate(options.collection, options.doc, options.userId);

        callback(null, cb);
      });
    } else {
      return new Promise((resolve, reject) => {
        query('update', options, (err, cb) => {
          if (err) {
            return reject(err);
          }

          c.sendUpdate(options.collection, options.doc, options.userId);

          resolve(cb);
        });
      });
    }
  },

  findandupdate: (options, callback) => {
    options = mdbhandler.validateOptions(options);

    if (callback && typeof callback === 'function') {
      query('findandupdate', options, (err, cb) => {
        c.sendUpdate(options.collection, options.doc, options.userId);
        callback(err, cb);
      });
    } else {
      return new Promise((resolve, reject) => {
        query('findandupdate', options, (err, cb) => {
          if (err) {
            return reject(err);
          }

          c.sendUpdate(options.collection, options.doc, options.userId);
          resolve(cb);
        });
      });
    }
  },

  fetch: (options, callback) => {
    options = mdbhandler.validateOptions(options);

    if (callback && typeof callback === 'function') {
      query('fetch', options, (err, cb) => {
        callback(err, cb);
      });
    } else {
      return new Promise((resolve, reject) => {
        query('fetch', options, (err, cb) => {
          if (err) {
            return reject(err);
          }

          resolve(cb);
        });
      });
    }
  },

  bulk: (options, callback) => {
    options = mdbhandler.validateOptions(options);

    if (callback && typeof callback === 'function') {
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
    } else {
      return new Promise((resolve, reject) => {
        query('bulk', options, (err, cb) => {
          if (err) {
            return reject(err);
          }

          const insertIDs = cb.getInsertedIds();

          for (let i = 0; i < options.doc.length; i++) {
            options.doc[i]._id = insertIDs[i]._id;
          }

          c.sendBulkInsert(options.collection, options.doc);

          resolve(cb);
        });
      });
    }
  },

  fetchlastNdocuments: (options, callback) => {
    options = mdbhandler.validateOptions(options);

    if (callback && typeof callback === 'function') {
      query('fetchlastNdocuments', options, (err, cb) => {
        callback(err, cb);
      });
    } else {
      return new Promise((resolve, reject) => {
        query('fetchlastNdocuments', options, (err, cb) => {
          if (err) {
            return reject(err);
          }

          resolve(cb);
        });
      });
    }
  },

  validateObjectID: (objectid) => {
    if (/[a-f0-9]{24}/.test(objectid)) {
      objectid = new ObjectID(objectid.toString());
    }

    return objectid;
  },

  validateOptions: (options) => {
    if (!options || !options.collection || !options.doc) {
      throw new Error('Error: Function is called without any options or the optionobject is not complete!');
    }

    if (options.doc._id) {
      options.doc._id = mdbhandler.validateObjectID(options.doc._id);
    }

    return options;
  }
};

module.exports = mdbhandler;

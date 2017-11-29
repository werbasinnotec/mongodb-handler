'use strict';

const processenv = require('processenv');
const validateObj = require('validate');
const optionsschema = require('./execution/optionsschema.json');
const connectdb = require('./execution/connectdb');

const connectionstring = processenv('MDBHANDLER_CONSTRING') || 'mongodb://localhost:27017/mdbtest';

let db;

connectdb(connectionstring, (err, database) => {
  if (err) {
    throw err;
  }

  db = database;
});

const query = (method, options, callback) => {
  if (!options) {
    return callback('options not defined');
  }

  if (validateObj(optionsschema, { strip: false }).validate(options)[0]) {
    const errorMessage = validateObj(optionsschema, { strip: false }).validate(options)[0].message;

    return callback(errorMessage);
  }

  const collection = db.collection(options.collection);

  switch (method) {
    case 'insert':
      collection.insert(options.doc, (error, result) => {
        if (error) {
          return callback(error);
        }

        callback(null, result);
      });
    break;

    case 'delete':
      collection.deleteMany(options.doc, (error, result) => {
        if (error) {
          return callback(error);
        }

        callback(null, result);
      });
    break;

    case 'update':
      collection.update(options.update, options.doc, (error, result) => {
        if (error) {
          return callback(error);
        }

        callback(null, result);
      });
    break;

    case 'findandupdate':
      /* eslint-disable quote-props */
      collection.update(options.update, { '$set': options.doc }, { multi: true }, (error, result) => {
      /* eslint-enable quote-props */
        if (error) {
          return callback(error);
        }

        callback(null, result);
      });
    break;

    case 'fetch':
      collection.find(options.doc, options.querys).toArray((error, result) => {
        if (error) {
          return callback(error);
        }

        callback(null, result);
      });
    break;

    case 'fetchlastNdocuments':
      collection.find(options.doc).sort({ $natural: -1 }).limit(options.last).toArray((error, result) => {
        if (error) {
          return callback(error);
        }

        callback(null, result);
      });
    break;

    case 'bulk':
      const batch = collection.initializeOrderedBulkOp();

      for (let i = 0; i < options.doc.length; i++) {
        batch.insert(options.doc[i]);
      }

      batch.execute((error, result) => {
        if (error) {
          return callback(error);
        }

        callback(null, result);
      });
    break;

    default:

      callback('Error in case of function');
  }
};

module.exports = query;

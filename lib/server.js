'use strict';

const connectdb = require('./execution/connectdb');
const validateQuerys = require('./validateQuerys');
const connectionstring = process.env.MDBHANDLER_CONSTRING || 'mongodb://localhost:27017/mdbtest';

let db;

connectdb(connectionstring, (err, client) => {
  if (err) {
    throw err;
  }

  db = client.db();
});

const query = (method, options, callback) => {
  if (!options) {
    return callback('options not defined');
  }

  const collection = db.collection(options.collection);

  switch (method) {
    case 'aggregate':
      collection.aggregate(options.doc, options.options || {}).toArray((error, result) => {
        if (error) {
          return callback(error);
        }

        callback(null, result);
      });
    break;

    case 'insert':
      collection.insertOne(options.doc, (error, result) => {
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
      collection.updateOne(options.update, { $set: options.doc }, (error, result) => {
        if (error) {
          return callback(error);
        }

        callback(null, result);
      });
    break;

    case 'findandupdate':
      /* eslint-disable quote-props */
      collection.updateMany(options.update, { '$set': options.doc }, { multi: true }, (error, result) => {
      /* eslint-enable quote-props */
        if (error) {
          return callback(error);
        }

        callback(null, result);
      });
    break;

    case 'fetch':
      let querys;

      if (options.querys) {
        querys = validateQuerys(options.querys);
      }

      collection.find(options.doc, querys).toArray((error, result) => {
        if (error) {
          return callback(error);
        }

        if (querys && querys.getTotal) {
          collection.find(options.doc).count((err2, total) => {
            if (err2) {
              return callback(err2);
            }

            return callback(null, { total, data: result });
          });
        } else {
          callback(null, result);
        }
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

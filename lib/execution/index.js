'use strict';

// Require NPM Modules
const validateObj = require('validate');
const checkObject = require('./checkObject');
const connectdb = require('./connectdb');

// Require variables
const optionsschema = require('./optionsschema');

const execution = function (method, options, db, callback) {
  options = JSON.parse(new Buffer(options.options.toString(), 'base64').toString());

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
      options.doc = checkObject(options.doc);

      collection.insert(options.doc, (error, result) => {
        if (error) {
          return callback(error);
        }

        callback(null, result);
      });

    break;

    case 'delete':
      options.doc = checkObject(options.doc);

      collection.deleteMany(options.doc, (error, result) => {
        if (error) {
          return callback(error);
        }

        callback(null, result);
      });

    break;

    case 'update':
      options.doc = checkObject(options.doc);
      options.update = checkObject(options.update);

      collection.update(options.update, options.doc, (error, result) => {
        if (error) {
          return callback(error);
        }

        callback(null, result);
      });

    break;

    case 'findandupdate':
      options.doc = checkObject(options.doc);
      options.update = checkObject(options.update);

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
      options.doc = checkObject(options.doc);
      
      collection.find(options.doc).toArray((error, result) => {
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

module.exports = execution;

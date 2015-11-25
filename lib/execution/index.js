'use strict';

// Require NPM Modules
const MongoClient = require('mongodb').MongoClient;
const validateObj = require('validate');

// Require variables
const configschema = require('./configschema');
const optionsschema = require('./optionsschema');

const execution = function (method, config, options, callback) {
  // Define function-variables
  let user = '';
  let extensions = '/?connectTimeoutMS=5000';

  if (!options || !config) {
    return callback('options or config not defined');
  }

  if (validateObj(configschema).validate(config)[0]) {
    const errorMessage = validateObj(configschema).validate(config)[0].message;

    return callback(errorMessage);
  }

  if (validateObj(optionsschema, { strip: false }).validate(options)[0]) {
    const errorMessage = validateObj(optionsschema, { strip: false }).validate(options)[0].message;

    return callback(errorMessage);
  }

  if (config.dbuser || config.dbpassword) {
    user = config.dbuser + ':' + config.dbpassword + '@';
  }

  if (config.extensions) {
    extensions = config.extensions;
  }

  const connectionstring = 'mongodb://' + user + config.dbhost + ':' + config.dbport + '/' + config.dbname + extensions;

  MongoClient.connect(connectionstring, (err, db) => {
    if (err) {
      callback(err);
    }

    const collection = db.collection(options.collection);

    switch (method) {
      case 'insert':

        collection.insert(options.doc, (error, result) => {
          if (error) {
            db.close();
            return callback(error);
          }

          db.close();
          callback(null, result);
        });
        break;

      case 'delete':

        collection.deleteMany(options.doc, (error, result) => {
          if (error) {
            db.close();
            return callback(error);
          }
          db.close();
          callback(null, result);
        });
        break;

      case 'update':

        collection.update(options.update, options.doc, (error, result) => {
          if (error) {
            db.close();
            return callback(error);
          }
          db.close();
          callback(null, result);
        });
        break;

      case 'findandupdate':
        /* eslint-disable quote-props */
        collection.update(options.update, { '$set': options.doc }, { multi: true }, (error, result) => {
        /* eslint-enable quote-props */
          if (error) {
            db.close();
            return callback(error);
          }
          db.close();
          callback(null, result);
        });
        break;

      case 'fetch':

        collection.find(options.doc).toArray((error, result) => {
          if (error) {
            db.close();
            return callback(error);
          }
          db.close();
          callback(null, result);
        });
        break;

      default:

        callback('Error in case of function');
    }
  });
};

module.exports = execution;

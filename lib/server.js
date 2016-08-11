'use strict';

const net = require('net');
const execution = require('./execution');
const processenv = require('processenv');
const snooper = require('snooper');
const validateObj = require('validate');
const optionsschema = require('./execution/optionsschema.json');
const connectdb = require('./execution/connectdb');

const listenerPort = processenv('MDBHANDLER_PORT') || 4444;
const connectionstring = processenv('MDBHANDLER_CONSTRING') || 'mongodb://localhost:27017/mdbtest';

let db;
let coll;

connectdb(connectionstring, (err, database) => {
  if (err) {
    snooper.error(err);
    throw err;
  }

  const server = net.createServer((socket) => {
    socket.pipe(socket);
  });

  db = database;

  server.listen(listenerPort, (err2) => {
    if (err2) {
      snooper.error(err2);
      throw err2;
    }

    snooper.info({ info: 'MongodbHandler is running and connection to Database is successfully open', connectioninfo: connectionstring, port: listenerPort });
  });
});

const query = function(method, options, callback) {
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

module.exports = query;

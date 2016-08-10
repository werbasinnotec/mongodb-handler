'use strict';

const request = require('request');
const validateObj = require('validate');
const processenv = require('processenv');

// Require variables
const optionsschema = require('../execution/optionsschema');

const query = function (method, options, callback) {
  if (!options) {
    return callback('options not defined');
  }

  if (validateObj(optionsschema, { strip: false }).validate(options)[0]) {
    const errorMessage = validateObj(optionsschema, { strip: false }).validate(options)[0].message;

    return callback(errorMessage);
  }

  const listenerPort = processenv('MDBHANDLER_PORT') || 4444;

  switch (method) {
    case 'insert':
      request({ url: 'http://127.0.0.1:' + listenerPort + '/insert', method: 'POST', headers: { 'Content-Type': 'application/json' }, json: true, body: options }, (err, res) => {
        if (err) {
          return callback(err);
        }

        callback(null, res.body);
      });

    break;

    case 'delete':
      request({ url: 'http://127.0.0.1:' + listenerPort + '/delete', method: 'POST', headers: { 'Content-Type': 'application/json' }, json: true, body: options }, (err, res) => {
        if (err) {
          return callback(err);
        }

        callback(null, res.body);
      });

    break;

    case 'update':
      request({ url: 'http://127.0.0.1:' + listenerPort + '/update', method: 'POST', headers: { 'Content-Type': 'application/json' }, json: true, body: options }, (err, res) => {
        if (err) {
          return callback(err);
        }

        callback(null, res.body);
      });

    break;

    case 'findandupdate':
      request({ url: 'http://127.0.0.1:' + listenerPort + '/findandupdate', method: 'POST', headers: { 'Content-Type': 'application/json' }, json: true, body: options }, (err, res) => {
        if (err) {
          return callback(err);
        }

        callback(null, res.body);
      });

    break;

    case 'fetch':
      request({ url: 'http://127.0.0.1:' + listenerPort + '/fetch', method: 'POST', headers: { 'Content-Type': 'application/json' }, json: true, body: options }, (err, res) => {
        if (err) {
          return callback(err);
        }

        callback(null, res.body);
      });

    break;

    case 'bulk':
      request({ url: 'http://127.0.0.1:' + listenerPort + '/bulk', method: 'POST', headers: { 'Content-Type': 'application/json' }, json: true, body: options }, (err, res) => {
        if (err) {
          return callback(err);
        }

        callback(null, res.body);
      });

    break;

    default:

      callback('Error in case of function');
  }
};

module.exports = query;

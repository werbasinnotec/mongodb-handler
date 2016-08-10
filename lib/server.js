'use strict';

const execution = require('./execution');
const express = require('express');
const http = require('http');
const processenv = require('processenv');
const snooper = require('snooper');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const connectdb = require('./execution/connectdb');

const app = express();
const server = http.createServer(app);

const listenerPort = processenv('MDBHANDLER_PORT') || 4444;
const connectionstring = processenv('MDBHANDLER_CONSTRING') || 'mongodb://localhost:27017/mdbtest';

connectdb(connectionstring, (err, db) => {
  if (err) {
    snooper.error(err);
    throw err;
  }

  app.use(bodyParser.json({limit: '5mb'}));
  app.use(methodOverride());

  app.post('/insert', (req, res) => {
    execution('insert', req.body, db, (err, cb) => {
      if (err) {
        return res.status(500).send({ error: err });
      }

      res.status(200).send(cb);
    });
  });

  app.post('/delete', (req, res) => {
    execution('delete', req.body, db, (err, cb) => {
      if (err) {
        return res.status(500).send({ error: err });
      }

      res.status(200).send(cb);
    });
  });

  app.post('/update', (req, res) => {
    execution('update', req.body, db, (err, cb) => {
      if (err) {
        return res.status(500).send({ error: err });
      }

      res.status(200).send(cb);
    });
  });

  app.post('/findandupdate', (req, res) => {
    execution('findandupdate', req.body, db, (err, cb) => {
      if (err) {
        return res.status(500).send({ error: err });
      }

      res.status(200).send(cb);
    });
  });

  app.post('/fetch', (req, res) => {
    execution('fetch', req.body, db, (err, cb) => {
      if (err) {
        return res.status(500).send({ error: err });
      }

      res.status(200).send(cb);
    });
  });

  app.post('/bulk', (req, res) => {
    execution('bulk', req.body, db, (err, cb) => {
      if (err) {
        return res.status(500).send({ error: err });
      }

      res.status(200).send(cb);
    });
  });

  server.listen(listenerPort, (err2) => {
    if (err2) {
      snooper.error(err2);
      throw err2;
    }

    snooper.info({ info: 'MongodbHandler is running and connection to Database is successfully open' });
  });
});

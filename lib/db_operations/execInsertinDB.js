'use strict';

const cache = require('../cache');
const log = require('../log');

const execInsertinDB = function (index, callback) {
  if (!index) {
    throw new Error('execInsertinDB - stampid is not set!');
  }

  const operations = cache.read();
  let i = 0;
  let config;
  let options;

  for (i; i < operations.length; i++) {
    if (operations[i].index === index) {
      config = operations[i].config;
      options = operations[i].options;
    }
  }

  log.debug('Running Function execInsertinDB with follow index: ' + index + ' and follow Operationqueries: ' + config + ' ' + options);

  callback(true);

  // MongoClient.connect('mongodb://' + config.dbuser + ':' + config.dbpassword + '@' + config.dbhost + ':' + config.dbport + '/' + config.dbname, function (err, db) {
  //   if (err) {
  //     log.info(err);
  //   }
  // });
};

module.exports = execInsertinDB;

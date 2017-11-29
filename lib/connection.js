'use strict';

const EventEmitter = require('events').EventEmitter;
const util = require('util');
const pkg = require('../package.json');

const Connection = module.exports = function Connection () {
  EventEmitter.call(this);

  Connection.prototype.start = () => {
    setTimeout(() => {
      this.emit('ready', 'Mongodbhandler (' + pkg.version + ') is ready to subscribe all Events');
    }, 1000);
  };

  Connection.prototype.sendInsert = (collection, object, userid) => {
    this.emit('insert', { collection, object, userid });
  };

  Connection.prototype.sendBulkInsert = (collection, object, userid) => {
    this.emit('bulkinsert', { collection, object, userid });
  };

  Connection.prototype.sendDelete = (collection, object, userid) => {
    this.emit('delete', { collection, object, userid });
  };

  Connection.prototype.sendUpdate = (collection, object, userid) => {
    this.emit('update', { collection, object, userid });
  };
};

util.inherits(Connection, EventEmitter);

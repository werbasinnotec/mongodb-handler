'use strict';

const EventEmitter = require('events').EventEmitter;
const util = require('util');

const Connection = module.exports = function Connection () {
  EventEmitter.call(this);

  Connection.prototype.start = () => {
    setTimeout(() => {
      this.emit('ready', 'Mongodbhandler is ready to subscribe');
    }, 1000);
  };

  Connection.prototype.sendInsert = (collection, object) => {
    this.emit('insert', { collection, object });
  };

  Connection.prototype.sendBulkInsert = (collection, object) => {
    this.emit('bulkinsert', { collection, object });
  };

  Connection.prototype.sendDelete = (collection, object) => {
    this.emit('delete', { collection, object });
  };

  Connection.prototype.sendUpdate = (collection, object) => {
    this.emit('update', { collection, object });
  };
};

util.inherits(Connection, EventEmitter);

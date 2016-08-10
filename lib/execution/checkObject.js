'use strict';

const ObjectID = require('mongodb').ObjectID;

const checkObject = function (object) {
  for (let i = 0; i < Object.keys(object).length; i++) {
    let key = Object.keys(object)[i];

    if (ObjectID.isValid(object[key])) {
      let objectId;

      if (/[a-f0-9]{24}/.test(object[key])) {
        objectId = new ObjectID(object[key].toString());
      }

      object[key] = objectId;
    }
  }

  return object;
};

module.exports = checkObject;

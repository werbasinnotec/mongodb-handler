'use strict';

const validateQuerys = (querys) => {
  if (querys.limit) {
    querys.limit = Number(querys.limit);
  }

  if (querys.skip) {
    querys.skip = Number(querys.skip);
  }

  if (querys.sort) {
    const arr = querys.sort.split(',');

    querys.sort = arr;

    for (let i = 0; i < querys.sort.length; i++) {
      if (querys.sort[i].charAt(0) === '!') {
        querys.sort[i] = [ querys.sort[i].split('!')[1], 'desc' ];
      } else {
        querys.sort[i] = [ querys.sort[i], 'asc' ];
      }
    }
  }

  return querys;
};

module.exports = validateQuerys;

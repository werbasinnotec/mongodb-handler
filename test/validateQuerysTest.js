'use strict';

const { assert } = require('assertthat');
const validateQuerys = require('../lib/validateQuerys');

describe('validateQuerys....', () => {
  it('... is of type function', (done) => {
    assert.that(validateQuerys).is.ofType('function');

    done();
  });

  it('... returns correct Limit', (done) => {
    const obj = { limit: '10' };

    assert.that(validateQuerys(obj)).is.equalTo({ limit: 10 });
    assert.that(validateQuerys(obj).limit).is.ofType('number');
    done();
  });

  it('... returns correct skip', (done) => {
    const obj = { limit: '10', skip: '200' };

    assert.that(validateQuerys(obj)).is.equalTo({ limit: 10, skip: 200 });
    assert.that(validateQuerys(obj).limit).is.ofType('number');
    assert.that(validateQuerys(obj).skip).is.ofType('number');
    done();
  });

  it('... returns correct sort', (done) => {
    const obj = { limit: '10', skip: '200', sort: 'myProperty,!myDescProp' };
    const res = validateQuerys(obj);

    assert.that(res).is.equalTo({ limit: 10, skip: 200, sort: [[ 'myProperty', 'asc' ], [ 'myDescProp', 'desc' ]]});
    assert.that(res.limit).is.ofType('number');
    assert.that(res.skip).is.ofType('number');
    done();
  });
});

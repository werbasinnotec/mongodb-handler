'use strict';

const assert = require('assertthat');
const app = require('../lib/app.js');

describe('Mongodbhandler...', () => {
  it('... insert is a function', (done) => {
    assert.that(app.insert).is.ofType('function');
    done();
  });

  it('... delete is a function', (done) => {
    assert.that(app.delete).is.ofType('function');
    done();
  });

  it('... update is a function', (done) => {
    assert.that(app.update).is.ofType('function');
    done();
  });

  it('... findandupdate is a function', (done) => {
    assert.that(app.findandupdate).is.ofType('function');
    done();
  });

  it('... fetch is a function', (done) => {
    assert.that(app.fetch).is.ofType('function');
    done();
  });

  describe('... callbacks an error...', () => {
    it('... when no config is defined', (done) => {
      app.insert(undefined, undefined, (err) => {
        if (err) {
          assert.that(err).is.equalTo('options or config not defined');
          done();
        }
      });
    });

    it('... when no options is defined', (done) => {
      app.insert({}, undefined, (err) => {
        if (err) {
          assert.that(err).is.equalTo('options or config not defined');
          done();
        }
      });
    });

    it('... when dbhost in config is not defined', (done) => {
      app.insert({}, {}, (err) => {
        if (err) {
          assert.that(err).is.equalTo('dbhost is required in config');
          done();
        }
      });
    });

    it('... when dbport in config is not defined', (done) => {
      app.insert({ dbhost: '127.0.0.1' }, {}, (err) => {
        if (err) {
          assert.that(err).is.equalTo('dbport is missing or in error');
          done();
        }
      });
    });

    it('... when dbport in config is not in correct format', (done) => {
      app.insert({ dbhost: '127.0.0.1', dbport: 'foo' }, {}, (err) => {
        if (err) {
          assert.that(err).is.equalTo('dbport is missing or in error');
          done();
        }
      });
    });

    it('... when dbname in config is not defined', (done) => {
      app.insert({ dbhost: '127.0.0.1', dbport: 27017 }, {}, (err) => {
        if (err) {
          assert.that(err).is.equalTo('dbname is required in config');
          done();
        }
      });
    });

    it('... when collection in options is not defined', (done) => {
      app.insert({ dbhost: '127.0.0.1', dbport: 27017, dbname: 'unittest' }, { }, (err) => {
        if (err) {
          assert.that(err).is.equalTo('collection is required in options');
          done();
        }
      });
    });
  });

  describe('... callbacks results ...', () => {
    /* eslint-disable no-unused-vars */
    let flag = false;

    beforeEach((done) => {
      setTimeout(() => {
        flag = true;

        done();
      }, 1500);
    });
    /* eslint-enable no-unused-vars */

    it('... when a document is insert', (done) => {
      app.insert({ dbhost: '127.0.0.1', dbport: 27017, dbname: 'unittest' }, { collection: 'unittest', doc: { foo: 'bar' }}, (err, result) => {
        if (err) {
          throw err;
        }

        assert.that(result.result.ok).is.equalTo(1);
        done();
      });
    });

    it('... when a document fetched', (done) => {
      app.fetch({ dbhost: '127.0.0.1', dbport: 27017, dbname: 'unittest' }, { collection: 'unittest', doc: { foo: 'bar' }}, (err, result) => {
        if (err) {
          throw err;
        }

        assert.that(result[0].foo).is.equalTo('bar');
        done();
      });
    });

    it('... when a document updated', (done) => {
      app.update({ dbhost: '127.0.0.1', dbport: 27017, dbname: 'unittest' }, { collection: 'unittest', update: { foo: 'bar' }, doc: { foo: 'newbar' }}, (err) => {
        if (err) {
          throw err;
        }

        app.fetch({ dbhost: '127.0.0.1', dbport: 27017, dbname: 'unittest' }, { collection: 'unittest', doc: {}}, (err, result) => {
          if (err) {
            throw err;
          }

          assert.that(result[0].foo).is.equalTo('newbar');
          done();
        });
      });
    });

    it('... when a document is delete', (done) => {
      app.delete({ dbhost: '127.0.0.1', dbport: 27017, dbname: 'unittest' }, { collection: 'unittest', doc: { foo: 'newbar' }}, (err, result) => {
        if (err) {
          throw err;
        }

        assert.that(result.result.ok).is.equalTo(1);
        done();
      });
    });

    it('... when a document multi-updated', (done) => {
      app.insert({ dbhost: '127.0.0.1', dbport: 27017, dbname: 'unittest' }, { collection: 'unittest', doc: { foo: 'bar1' }}, (err) => {
        if (err) {
          throw err;
        }
      });

      app.insert({ dbhost: '127.0.0.1', dbport: 27017, dbname: 'unittest' }, { collection: 'unittest', doc: { foo: 'bar1' }}, (err) => {
        if (err) {
          throw err;
        }
      });

      app.insert({ dbhost: '127.0.0.1', dbport: 27017, dbname: 'unittest' }, { collection: 'unittest', doc: { foo: 'bar1' }}, (err) => {
        if (err) {
          throw err;
        }
      });

      app.findandupdate({ dbhost: '127.0.0.1', dbport: 27017, dbname: 'unittest' }, { collection: 'unittest', update: { foo: 'bar1' }, doc: { foo: 'multinewbar' }}, (err) => {
        if (err) {
          throw err;
        }
      });

      app.fetch({ dbhost: '127.0.0.1', dbport: 27017, dbname: 'unittest' }, { collection: 'unittest', doc: {}}, (err, result) => {
        if (err) {
          throw err;
        }

        assert.that(result[0].foo).is.equalTo('multinewbar');
        done();
      });
    });

    it('... when a bulk insert operation is running', (done) => {
      const insertobj = [];

      for (let i = 0; i < 20000; i++) {
        insertobj.push({ counter: i, text: 'foo', value: 'bar' });
      }

      app.bulk({ dbhost: '127.0.0.1', dbport: 27017, dbname: 'unittest' }, { collection: 'unittest', doc: insertobj }, (err, result) => {
        if (err) {
          throw err;
        }

        assert.that(result).is.ofType('object');
        done();
      });
    });
  });
});

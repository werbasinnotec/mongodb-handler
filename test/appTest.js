'use strict';

const assert = require('assertthat');
const app = require('../lib/app.js');

describe('Mongodbhandler...', () => {
  before(() => {
    require('./dropDatabase')((err) => {
      if (err) {
        throw err;
      }
    });
  });

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
    it('... when no options is defined', (done) => {
      app.insert(undefined, (err) => {
        if (err) {
          assert.that(err).is.equalTo('options not defined');
          done();
        }
      });
    });

    it('... when collection in options is not defined', (done) => {
      app.insert({ }, (err) => {
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
      app.insert({ collection: 'unittest', doc: { foo: 'bar' }}, (err, result) => {
        if (err) {
          throw err;
        }

        assert.that(result.result.ok).is.equalTo(1);
        done();
      });
    });

    it('... when a document fetched', (done) => {
      app.fetch({ collection: 'unittest', doc: { foo: 'bar' }}, (err, result) => {
        if (err) {
          throw err;
        }

        assert.that(result[0].foo).is.equalTo('bar');
        done();
      });
    });

    it('... when a document fetched by objectid', (done) => {
      app.insert({ collection: 'unittest', doc: { foo: 'bar' }}, (err, result) => {
        if (err) {
          throw err;
        }

        assert.that(result.result.ok).is.equalTo(1);

        app.fetch({ collection: 'unittest', doc: { _id: result.ops[0]._id }}, (err2, result2) => {
          if (err2) {
            throw err2;
          }

          assert.that(result2[0].foo).is.equalTo('bar');
          done();
        });
      });
    });

    it('... when a document updated', (done) => {
      app.update({ collection: 'unittest', update: { foo: 'bar' }, doc: { foo: 'newbar' }}, (err) => {
        if (err) {
          throw err;
        }

        app.fetch({ collection: 'unittest', doc: {}}, (err2, result) => {
          if (err2) {
            throw err2;
          }

          assert.that(result[0].foo).is.equalTo('newbar');
          done();
        });
      });
    });

    it('... when a document is delete', (done) => {
      app.delete({ collection: 'unittest', doc: { foo: 'newbar' }}, (err, result) => {
        if (err) {
          throw err;
        }

        assert.that(result.result.ok).is.equalTo(1);
        done();
      });
    });

    it('... when a document multi-updated', (done) => {
      app.insert({ collection: 'unittest', doc: { test: 'multi', foo: 'bar1' }}, (err) => {
        if (err) {
          throw err;
        }

        app.insert({ collection: 'unittest', doc: { test: 'multi', foo: 'bar1' }}, (err1) => {
          if (err1) {
            throw err1;
          }

          app.insert({ collection: 'unittest', doc: { test: 'multi', foo: 'bar1' }}, (err2) => {
            if (err2) {
              throw err2;
            }

            app.findandupdate({ collection: 'unittest', update: { foo: 'bar1' }, doc: { foo: 'multinewbar' }}, (err3) => {
              if (err3) {
                throw err3;
              }

              app.fetch({ collection: 'unittest', doc: { test: 'multi' }}, (err4, result) => {
                if (err4) {
                  throw err4;
                }

                assert.that(result[0].foo).is.equalTo('multinewbar');
                done();
              });
            });
          });
        });
      });
    });

    it('... when a bulk insert operation is running', (done) => {
      const insertobj = [];

      for (let i = 0; i < 20000; i++) {
        insertobj.push({ counter: i, text: 'foo', value: 'bar' });
      }

      app.bulk({ collection: 'unittest', doc: insertobj }, (err, result) => {
        if (err) {
          throw err;
        }

        assert.that(result).is.ofType('object');
        done();
      });
    });

    it('... when the last N documents are called', (done) => {
      app.fetchlastNdocuments({ collection: 'unittest', doc: { text: 'foo' }, last: 3 }, (err, result) => {
        if (err) {
          throw err;
        }

        assert.that(result[0].counter).is.equalTo(19999);
        assert.that(result[1].counter).is.equalTo(19998);
        assert.that(result[2].counter).is.equalTo(19997);
        done();
      });
    });
  });
});

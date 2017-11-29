'use strict';

const assert = require('assertthat');
const app = require('../lib/app.js');
/* eslint-disable */
let connection;

describe('Mongodbhandler...', () => {
  before((done) => {
    require('./dropDatabase')((err) => {
      if (err) {
        throw err;
      }

      connection = app.start();

      setTimeout(() => {
        done();
      }, 3000);
    });
  });
/* eslint-enable */

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

  it('... validateObjectID is a function', (done) => {
    assert.that(app.validateObjectID).is.ofType('function');
    done();
  });

  it('... validateObjectID must return a objectid', (done) => {
    assert.that(app.validateObjectID('592fe56fed807755eaefd461')).is.ofType('object');
    done();
  });

  describe('... throws an error...', () => {
    it('... when no options is defined', (done) => {
      assert.that(() => {
        app.insert(undefined);
      }).is.throwing('Error: Function is called without any options or the optionobject is not complete!');
      done();
    });

    it('... when no options not complete is defined', (done) => {
      assert.that(() => {
        app.insert({});
      }).is.throwing('Error: Function is called without any options or the optionobject is not complete!');
      done();
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

    it('... fetch with limits', (done) => {
      app.fetch({ collection: 'unittest', doc: { text: 'foo' }, querys: { limit: 100, skip: 100, sort: [[ 'counter', 'desc' ]]}}, (err, result) => {
        if (err) {
          throw err;
        }

        assert.that(result[0].counter).is.equalTo(19899);
        assert.that(result[99].counter).is.equalTo(19800);

        done();
      });
    });
  });

  describe('... when used promises / async await', () => {
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
      (async () => {
        try {
          const result = await app.insert({ collection: 'unittest', doc: { foo: 'promisebar' }});

          assert.that(result.result.ok).is.equalTo(1);
          done();
        } catch (err) {
          throw err;
        }
      })();
    });

    it('... when a document is delete', (done) => {
      (async () => {
        try {
          const result = await app.delete({ collection: 'unittest', doc: { foo: 'promisebar' }});

          assert.that(result.result.ok).is.equalTo(1);
          done();
        } catch (err) {
          throw err;
        }
      })();
    });

    it('... when a document updated', (done) => {
      (async () => {
        try {
          await app.insert({ collection: 'unittest', doc: { foo: 'update-test' }});
          await app.update({ collection: 'unittest', update: { foo: 'update-test' }, doc: { foo: 'updateAfterTest' }});

          const res = await app.fetch({ collection: 'unittest', doc: { foo: 'updateAfterTest' }});

          assert.that(res.length).is.greaterThan(0);
          assert.that(res[0].foo).is.equalTo('updateAfterTest');
          done();
        } catch (err) {
          throw err;
        }
      })();
    });

    it('... when a document multi-updated', (done) => {
      (async () => {
        try {
          await app.insert({ collection: 'unittest', doc: { test: 'multi', foo: 'bar2' }});
          await app.insert({ collection: 'unittest', doc: { test: 'multi', foo: 'bar2' }});
          await app.insert({ collection: 'unittest', doc: { test: 'multi', foo: 'bar2' }});
          await app.findandupdate({ collection: 'unittest', update: { foo: 'bar2' }, doc: { foo: 'multinewbar' }});

          const result = await app.fetch({ collection: 'unittest', doc: { test: 'multi' }});

          assert.that(result[0].foo).is.equalTo('multinewbar');
          done();
        } catch (err) {
          throw err;
        }
      })();
    });

    it('... when a document fetched by objectid', (done) => {
      (async () => {
        try {
          const insert = await app.insert({ collection: 'unittest', doc: { foo: 'fetchbar' }});

          const res = await app.fetch({ collection: 'unittest', doc: { _id: insert.ops[0]._id.toString() }});

          assert.that(res[0].foo).is.equalTo('fetchbar');
          done();
        } catch (err) {
          throw err;
        }
      })();
    });

    it('... when a bulk insert operation is running', (done) => {
      (async () => {
        const insertobj = [];

        for (let i = 0; i < 20000; i++) {
          insertobj.push({ counter: i, promisetext: 'Promise', promisevalue: 'Promisebar' });
        }

        try {
          const result = await app.bulk({ collection: 'promistestbulk', doc: insertobj });

          assert.that(result).is.ofType('object');
          done();
        } catch (err) {
          throw err;
        }
      })();
    });

    it('... when the last N documents are called', (done) => {
      (async () => {
        try {
          const result = await app.fetchlastNdocuments({ collection: 'promistestbulk', doc: { promisetext: 'Promise' }, last: 3 });

          assert.that(result[0].counter).is.equalTo(19999);
          assert.that(result[1].counter).is.equalTo(19998);
          assert.that(result[2].counter).is.equalTo(19997);

          done();
        } catch (err) {
          throw err;
        }
      })();
    });
  });
});

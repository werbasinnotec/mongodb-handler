# NPM Module mongodb-handler

This module handles all mongodb-transactions over a global calling.

### Installation

        npm install mongodb-handler

### Implementate in your project:

The following commands are present:

```javascript
const mdbhandler = require('mongodb-handler');

mdbhandler(method, options, config);
```

## Variable Declaration

####  method:

Set the method of the transaction. Following methods are available:

###### DELETE
=====

```javascript
const options = { coll: 'test', obj: { foo: 'bar' } }
const config = { dbuser: 'test', dbpassword: '123', dbhost: '199.9.9.9', dbport: 27021, dbname: 'admin' };

mdbhandler('DELETE', options, config, function (err, cb) {
    if (err) {
        throw err
    }
    // Implementate your code...
    console.log(cb);
});
```
This method will delete all object with 'foo' / 'bar' in collection 'test'.

When your mongodb have no authentication, the parameters dbuser and dbpassword can removed.

###### INSERT
=====
```javascript
const options = { coll: 'test', obj: { foo: 'bar' } }
const config = { dbuser: 'test', dbpassword: '123', dbhost: '199.9.9.9', dbport: 27021, dbname: 'admin' };

mdbhandler('INSERT', options, config, function (err, cb) {
    if (err) {
        throw err
    }
    // Implementate your code...
    console.log(cb);
});
```
This method will insert a object with 'foo' / 'bar' in collection 'test'

When your mongodb have no authentication, the parameters dbuser and dbpassword can removed.

###### FETCH
=====
```javascript
const options = { coll: 'test', obj: { foo: 'bar' } }
const config = { dbuser: 'test', dbpassword: '123', dbhost: '199.9.9.9', dbport: 27021, dbname: 'admin' };

mdbhandler('FETCH', options, config, function (err, cb) {
    if (err) {
        throw err
    }
    // Implementate your code...
    console.log(cb);
});
```
This method will fetch a object with 'foo' / 'bar' in collection 'test'



###### UPDATE
======
```javascript
const options = { coll: 'test', criteria: { foo: 'bla' }, obj: { foo: 'bar' }}
const config = { dbuser: 'test', dbpassword: '123', dbhost: '199.9.9.9', dbport: 27021, dbname: 'admin' };

mdbhandler('UPDATE', options, config, function (err, cb) {
    if (err) {
        throw err
    }
    // Implementate your code...
    console.log(cb);
});
```

###### ADDUSER
======
```javascript
const options = { newdbuser: 'frank', newdbpassword: 'sinatra', newdbname: 'musical' }
const config = { admindbuser: 'admin',  admindbpassword: 'password', dbhost: '199.9.9.9', dbport: 27021 };

mdbhandler('ADDUSER', options, config, function (err, cb) {
    if (err) {
        throw err
    }
    // Implementate your code...
    console.log(cb);
});
```

This method will update all objects with named critera in collection 'coll'.
When your mongodb have no authentication, the parameters dbuser and dbpassword can removed.

### Callback Error:

The errorcallback can response follow objects:
```
// When the database-connection is not successful
{
err: 'Error on connection'
}
// When the operation is not successful
{
err: 'Error on operation'
}
```

The details of the error you can see it on the log into the console.

## License

The MIT License (MIT)
Copyright (c) 2015 Werbasinnotec.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

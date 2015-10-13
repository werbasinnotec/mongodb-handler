# NPM Module mongodb-handler

This module handles all mongodb-transactions over a global calling

### Installation

        npm install mongodb-handler

### Implementate in your project:

The following commands are present:

```javascript
const mdb-handler = require('mongodb-handler');

mdb-handler(method, options, config);
```

## Variable Declaration

####  method:

Set the method of the transaction. Following methods are available:

###### DELETE
=====

```javascript
const options = { coll: 'test', obj: { foo: 'bar' } }

mdb-handler('DELETE', options, config);
```
This method will delete all object with 'foo' / 'bar' in collection 'test'

###### INSERT
=====
```javascript
const options = { coll: 'test', obj: { foo: 'bar' } }

mdb-handler('INSERT', options, config);
```
This method will insert a object with 'foo' / 'bar' in collection 'test'

###### FETCH
=====
```javascript
const options = { coll: 'test', obj: { foo: 'bar' } }

mdb-handler('FETCH', options, config);
```
This method will fetch a object with 'foo' / 'bar' in collection 'test'

###### UPDATE
======
```javascript
const options = { coll: 'test', criteria: 'crit', update: 'upd' }

mdb-handler('UPDATE', options, config);
```
This method will update all objects with named critera in collection 'coll'.

#### config:

Set the config for the transaction:



        { admindbuser: 'admin',
        admindbpassword: 'password',
        dbuser: 'productivuser',
        dbpassword: 'password',
        dbport: 27020,
        dbhost: 'host',
        dbname: 'productivdb' }

#### adminuser vs dbuser
This module will carry out all operations with the dbuser from the config. Is the dbuser not avaiable the module add this user automatically in the database.

## License

The MIT License (MIT)
Copyright (c) 2014-2015 Werbasinnotec.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

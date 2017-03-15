# NPM Module mongodb-handler

This module handles all mongodb-transactions over a global calling.

### Installation

        npm install mongodb-handler

### Implementate in your project:

The following commands are present:

```javascript
const mdbhandler = require('mongodb-handler');
```

To Startup in your Project you must start the mdb-service.

```javascript
require('mongodb-handler/lib/server');
```

### Config ENV Variable
- MDBHANDLER_CONSTRING: Defines the connectionstring to the database. Default is: 'mongodb://localhost:27017/mdbtest';
- MDBHANDLER_PORT: Defines the port where the mongodbhandler is listen. Default is 4444;

### Options (object)
-   collection: Defines the collection
-   update: Defines the document on update
-   doc: Defines the document

### Usage

#### Insert a document:

```javscript
mdbhandler.insert(options, (err, result) => {
    if (err) {
        throw err;
    }
    // Implementate your code here
    console.log(result);
});
```

#### Update a single document:

```javscript
mdbhandler.update(options, (err, result) => {
    if (err) {
        throw err;
    }
    // Implementate your code here
    console.log(result);
});
```

#### Multiupdate document:

```javscript
mdbhandler.findandupdate(options, (err, result) => {
    if (err) {
        throw err;
    }
    // Implementate your code here
    console.log(result);
});
```

#### Delete a document:

```javscript
mdbhandler.delete(options, (err, result) => {
    if (err) {
        throw err;
    }
    // Implementate your code here
    console.log(result);
});
```

#### Fetch documents:

```javscript
mdbhandler.fetch(options, (err, result) => {
    if (err) {
        throw err;
    }
    // Implementate your code here
    console.log(result);
});
```

#### Fetch last n documents:

```javscript

let options = { doc: { id = 'xyz' }, last: 10 };

mdbhandler.fetchlastNdocuments(options, (err, result) => {
    if (err) {
        throw err;
    }

    // Implementate your code here
    console.log(result);
});
```

#### Bulk insert documents:

```javscript
let options = { doc: [{obj1}, {obj2} ... ]};

mdbhandler.bulk(options, (err, result) => {
    if (err) {
        throw err;
    }
    // Implementate your code here
    console.log(result);
});
```

## License

The MIT License (MIT)
Copyright (c) 2015 Werbasinnotec.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

# Mongodb-handler

This module handles all mongodb-transactions over a global calling.

### Installation

```
npm install mongodb-handler
```

### What's new in v2

- The module provides promises, now
- Submit a userId to the modules eventlistener feature.

### Implementate in your project:

The module have an integrated Eventlistener to fetch all events through this module.

To Startup in your Project you must start the Eventlistener in your project.

```javascript
'use strict';

const mdbhandler = require('mongodb-handler');

const connection = mdbhandler.start();

connection.on('ready', (message) => {
  console.log(message); // Notification when system is ready
});

connection.on('insert', (message) => {
  console.log(message); // Notification when a document is insert
});

connection.on('bulkinsert', (message) => {
  console.log(message); // Notification when documents are insert with bulk
});

connection.on('delete', (message) => {
  console.log(message); // Notification when documents are deleted
});

connection.on('update', (message) => {
  console.log(message); // Notification when documents are updated
});
```

### Config ENV Variable
- MDBHANDLER_CONSTRING: Defines the connectionstring to the database. Default is: 'mongodb://localhost:27017/mdbtest';

### Options (object)
-   collection: Defines the collection
-   update: Defines the document on update
-   doc: Defines the document
-   userId: On this property it's possible to set the unique identifier of an user where changed a document. This module will submit this property to the modules eventlistener.
-   querys: Defines the querys (See (here)[https://mongodb.github.io/node-mongodb-native/markdown-docs/queries.html#query-options])

#### Additional query Parameters

-   querys.getTotal: When this property is true, the fetch will response follow structure:


````
{
  total: 400, // The totalamount of the query
  data: [
    .
    .
    .
  ]
}
````

This is necessary for the paging to transmit the complete content lenght.



### Usage

#### Insert a document

##### When you want to work with callbacks:

```javscript
mdbhandler.insert(options, (err, result) => {
    if (err) {
        throw err;
    }
    // Implementate your code here
    console.log(result);
});
```

##### Promise / Async await

```javscript

(async () => {
  try {
    const result = await mdbhandler.insert(options);
  } catch (err) {
    throw err;
  }
})();
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

##### Promise / Async await

```javscript

(async () => {
  try {
    const result = await mdbhandler.update(options);
  } catch (err) {
    throw err;
  }
})();
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

##### Promise / Async await

```javscript

(async () => {
  try {
    const result = await mdbhandler.findandupdate(options);
  } catch (err) {
    throw err;
  }
})();
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

##### Promise / Async await

```javscript

(async () => {
  try {
    const result = await mdbhandler.delete(options);
  } catch (err) {
    throw err;
  }
})();
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

##### Promise / Async await

```javscript

(async () => {
  try {
    const result = await mdbhandler.fetch(options);
  } catch (err) {
    throw err;
  }
})();
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

##### Promise / Async await

```javscript

(async () => {
  try {
    const result = await mdbhandler.fetchlastNdocuments(options);
  } catch (err) {
    throw err;
  }
})();
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

##### Promise / Async await

```javscript

(async () => {
  try {
    const result = await mdbhandler.bulk(options);
  } catch (err) {
    throw err;
  }
})();

## License

The MIT License (MIT)
Copyright (c) 2019 Werbasinnotec.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

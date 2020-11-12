![Downloads][link-download] ![Version][link-version] ![License][link-license]

# @teleology/express
Common utilities for wrapping express endpoints


# Installation 

```bash
yarn add @teleology/express body-parser
# or
npm i --save @teleology/express body-parser
```

# Documentation

## Wrapper

The wrapper function is a HOC, and will extract data from the incoming request event. Query, path, and body data will automatically be collected and exposed in the `data` object. Header keys will be lowercased. Note, this utility makes use of expresses body parser

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const { wrapper } = require('@teleology/express');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const handler = async ({ headers, data }) => {
  // Some implementation
};

app.get('/test', wrapper(handler));
```


[link-download]: https://img.shields.io/npm/dt/@teleology/express
[link-version]: https://img.shields.io/npm/v/@teleology/express.svg
[link-license]: https://img.shields.io/npm/l/@teleology/express.svg

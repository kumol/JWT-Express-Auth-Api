# append-header

Extends a response object with an appendHeader method.

## Usage

```js
var app = require('express')()
require('append-header')(app.response)

app.use(express.compress())
app.use(function (req, res, next) {
  res.appendHeader('Vary', 'Accept-Language')
  next()
})
```

The server response will now have a `Vary` header set to `Accept-Encoding, Accept-Language`.


## Extending all HTTP response objects

```js
var http = require('http')
require('append-header')(http.ServerResponse.prototype)
```

## Install

    $ npm install append-header

## License

MIT


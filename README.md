# node-foauth

node.js client library for foauth.org, using [request](https://github.com/mikeal/request) and [hooker](https://github.com/cowboy/javascript-hooker).

To get started:

```
npm install node-foauth
```

To use it:

```javascript
var foauth = require('node-foauth')('username@example.com', 'password');
```

Then use `foauth` like you'd use request, with the exception that you have to use `foauth.get` instead of the convenience form `foauth(uri)`. While making requests through node-foauth, your request URIs will be transparently converted to use https://foauth.org (meaning you can make requests the original API URLs), and your basic auth credentials will be sent along in a header.

request is Apache 2.0 licensed, javascript hooker is MIT, and node-foauth is MIT-licensed as well.

Have fun.

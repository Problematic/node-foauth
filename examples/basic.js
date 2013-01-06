var foauth = require('../lib/node-foauth')('username@example.com', 'password');

foauth.get('https://api.twitter.com/1/statuses/user_timeline.json', {
    headers: {
        'Accept-Encoding': 'none'
    },
    json: true
}, function (error, response, body) {
    console.log(arguments);
});

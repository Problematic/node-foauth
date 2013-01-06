var url = require('url'),
    request = require('request'),
    hooker = require('hooker'),
    FOAUTH_TEMPLATE = 'https://foauth.org/{hostname}{path}';

// Lifted from request module so we can hook properly
// organize params for post, put, head, del
var initParams = function (uri, options, callback) {
  if ((typeof options === 'function') && !callback) callback = options
  if (options && typeof options === 'object') {
    options.uri = uri
  } else if (typeof uri === 'string') {
    options = {uri:uri}
  } else {
    options = uri
    uri = options.uri
  }
  return { uri: uri, options: options, callback: callback }
};

var merge = function (destination) {
    var sources = [].slice.call(arguments, 1), source;

    for (var i = 0; i < sources.length; i++) {
        source = sources[i];
        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                destination[prop] = source[prop];
            }
        }
    }

    return destination;
};

var foauthURI = function (uri) {
    var parsed = url.parse(uri),
        target = FOAUTH_TEMPLATE
            .replace('{hostname}', parsed.hostname)
            .replace('{path}', parsed.path);

    return target;
};

var Foauth = function (username, password) {
    var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64'),
        frequest = merge({}, request);

    hooker.hook(frequest, ['get', 'post', 'put', 'head', 'del'], {
        pre: function (uri, options, callback) {
            var params = initParams(uri, options, callback);

            params.options.uri = params.uri = foauthURI(params.uri);

            if (params.options.headers && !params.options.headers['Authorization']) {
                params.options.headers['Authorization'] = auth;
            } else {
                params.options.headers = {
                    'Authorization': auth
                };
            }

            return hooker.filter(this, [params.uri, params.options, params.callback]);
        }
    });

    return frequest;
}

exports = module.exports = Foauth;

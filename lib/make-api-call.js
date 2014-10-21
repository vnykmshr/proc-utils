'use strict';

var util = require('util');
var request = require('request');

module.exports = function makeApiCall(endpoint, method, options, cb) {
    if (!cb && typeof options === 'function') {
        cb = options;
        options = {};
    }

    if (options.baseUrl && !(/http[s]*:\/\//gi).test(endpoint)) {
        endpoint = options.baseUrl + endpoint;
    }

    var reqOptions = {
        url: endpoint,
        method: method || 'GET',
        headers: options.headers || {},
        timeout: options.timeout || 30 * 1000
    };

    if (options.type) {
        reqOptions[options.type] = options.data;
    }

    util.log([options.user ? options.user.email : '', JSON.stringify(reqOptions),
        'xxx'].join(' '));

    request(reqOptions, function (err, res) {
        if (err) {
            err.code = 500;
            logApiCall(endpoint, method, err.message);
            return cb(err, (res ? res.body : null));
        }

        if (res.statusCode !== 200) {
            var message = res.body ? res.body.message : 'Error received';
            err = new Error(message);
            err.code = res.statusCode;
            logApiCall(endpoint, method, res.body);
            return cb(err, res.body);
        }

        // check if result is json
        var result;
        try {
            result = JSON.parse(res.body);
        } catch (e) {
            // not a json
            result = res.body;
        }

        cb(null, result);
    });
};

function logApiCall(endpoint, method, response) {
    util.log(util.format('%s - %s - response - %s', method.toString(), endpoint
        .toString(), JSON.stringify(response)));
}

//-- Test Code ----------------------------------------------------------
if (require.main === module) {
    (function () {
        var endpoint = '/test';
        var options = {
            baseUrl: 'http://localhost:3000'
        };

        module.exports(endpoint, 'get', options, console.log);
    })();
}

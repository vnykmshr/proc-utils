'use strict';

var util = require('util');
var http = require('http');
var path = require('path');
var express = require('express');
var proc = require('../');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res, next) {
    console.log(new Date());
    res.end('200 OK');
});

http.createServer(app)
    .on('error', function (err) {
        console.log(err);
        process.exit(1);
    })
    .listen(app.get('port'), function () {
        util.log("Web server listening on port " + app.get('port') + ' in ' +
            app.get('env'));
    });

// initialize process management
proc.init(app);

'use strict';

var proc = require('./lib/proc');
proc.utils = require('./lib/utils');
proc.predicate = require('./lib/predicate');
proc.extend = require('./lib/extend');
proc.scan = require('./lib/scan');

module.exports = proc;

//-- Test Code ----------------------------------------------------------
if (require.main === module) {
    (function () {
        console.log(proc);
    })();
}

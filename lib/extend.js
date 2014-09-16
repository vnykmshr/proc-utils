'use strict';

// extends 'from' object with members from 'to'. If 'to' is null, a deep clone of 'from' is returned
module.exports = function extend(from, to) {
    if (from === null || typeof from !== 'object') {
        return from;
    }
    if (from.constructor !== Object && from.constructor !== Array) {
        return from;
    }
    if (from.constructor === Date || from.constructor === RegExp ||
        from.constructor === Function || from.constructor === String ||
        from.constructor === Number || from.constructor === Boolean) {
        return new from.constructor(from);
    }


    to = to || new from.constructor();

    for (var name in from) {
        to[name] = typeof to[name] === "undefined" ? extend(from[name], null) :
            to[name];
    }

    return to;
};

//-- Test Code ----------------------------------------------------------
if (require.main === module) {
    (function () {
        var from = {
            name: 'Vinayak Mishra',
            email: 'vm@zyoba.com',
            date: new Date()
        };
        var to;
        console.log(from, module.exports(from, to));
    })();
}

'use strict';

var crypto = require('crypto');
var moment = require('moment');
var validUrl = require('valid-url');

/**
 * Collection of common util routines
 */
var utils = {
    /**
     * Validate required params
     *
     * @param {object} reqdata the request data
     * @param {array} params array of input params to validate
     * @param {boolean} any flag to indicate all or any suffices (optional)
     *
     * @return {Error} the error object, set if required params are missing
     */
    required: function (reqdata, params, any) {
        var missing = [];
        params.forEach(function (entry) {
            if (!reqdata[entry] && reqdata[entry] !== 0) missing.push(entry);
        });

        var err;
        if (missing.length) {
            if (!any || missing.length === params.length) {
                err = new Error('missing required params: ' + missing.join(any ?
                    '|' : ','));
            }
        }

        return err;
    },

    isTrue: function (str) {
        if (typeof str === 'undefined') return false;
        switch ((str + '').toLowerCase()) {
        case "undefined":
        case "false":
        case "null":
        case "off":
        case "no":
        case "0":
        case "":
            return false;
        default:
            return true;
        }
    },

    isValidEmail: function (email) {
        var pattern = /^[a-zA-Z0-9._\+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,4}$/g;
        return pattern.test(email);
    },

    formatTime: function (date) {
        return moment(date).format('HH:mm A');
    },

    formatDate: function (date) {
        return moment(date).format('MM/DD/YYYY');
    },

    formatFull: function (date) {
        return [utils.formatDate(date), utils.formatTime(date)].join(' ');
    },

    fileStamp: function (date) {
        return moment(date).format('YYYYMMDDHHmm');
    },

    isWebUri: function (url, strict) {
        if (!url) return url;

        if (!strict && url.indexOf('http://') === -1) {
            url = 'http://' + url;
        }

        return validUrl.isWebUri(url);
    },

    randomValueHex: function (len) {
        // generate random bytes
        // convert to hexadecimal format
        // return required number of characters
        return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').slice(0,
            len);
    }
};

module.exports = utils;

/** Test Code --------------------------------------------------------------- */
if (require.main === module) {
    (function () {
        var data = {
            id: 0
        };

        var err = utils.required(data, ['id', 'key'], true);
        console.log(err);
    })();
}

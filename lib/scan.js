'use strict';

var fs = require('fs');
var path = require('path');
var debug = require('debug')('models');

function scan(dir, ext) {
    if (!ext) {
        ext = '';
    }

    var filepath, stat, fileList = [],
        files = fs.readdirSync(dir);

    files.forEach(function (file) {
        filepath = path.join(dir, file);
        stat = fs.statSync(filepath);
        if (!stat) {
            debug('could not stat: ' + filepath + ', skipped');
            return;
        }

        if (stat.isDirectory()) {
            fileList = fileList.concat(scan(filepath, ext));
        } else if (stat.isFile()) {
            if (!ext || file.indexOf(ext, file.length - ext.length) !== -1) {
                fileList.push(filepath);
            }
        } else {
            debug('neither a file or dir: ' + filepath + ', skipped');
        }
    });

    return fileList;
}

module.exports = scan;

//-- Test Code ----------------------------------------------------------
if (require.main === module) {
    (function () {
        var dir = process.argv[2] || '.';
        var ext = process.argv[3] || '';
        console.log(scan(dir, ext));
    })();
}

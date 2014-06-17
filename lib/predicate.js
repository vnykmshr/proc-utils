'use strict';

module.exports = function predicate() {
  var fields = [],
    n_fields = arguments.length,
    field, name, reverse, cmp;

  var default_cmp = function (a, b) {
    if (a === b) return 0;
    return a < b ? -1 : 1;
  },
    getCmpFunc = function (primer, reverse) {
      var dfc = default_cmp,
        // closer in scope
        cmp = default_cmp;
      if (primer) {
        cmp = function (a, b) {
          return dfc(primer(a), primer(b));
        };
      }
      if (reverse) {
        return function (a, b) {
          return -1 * cmp(a, b);
        };
      }
      return cmp;
    };

  // preprocess sorting options
  for (var i = 0; i < n_fields; i++) {
    field = arguments[i];
    if (typeof field === 'string') {
      name = field;
      cmp = default_cmp;
    } else {
      name = field.name;
      cmp = getCmpFunc(field.primer, field.reverse);
    }
    fields.push({
      name: name,
      cmp: cmp
    });
  }

  // final comparison function
  return function (A, B) {
    var a, b, name, result;
    for (var i = 0; i < n_fields; i++) {
      result = 0;
      field = fields[i];
      name = field.name;

      result = field.cmp(A[name], B[name]);
      if (result !== 0) break;
    }
    return result;
  };
};

/** Test Code --------------------------------------------------------------- */
if (require.main === module) {
  (function () {
    var data = [{
      USER: "bob",
      SCORE: 2000,
      TIME: 32,
      AGE: 16,
      COUNTRY: "US"
    }, {
      USER: "jane",
      SCORE: 4000,
      TIME: 35,
      AGE: 16,
      COUNTRY: "DE"
    }, {
      USER: "tim",
      SCORE: 1000,
      TIME: 30,
      AGE: 17,
      COUNTRY: "UK"
    }, {
      USER: "mary",
      SCORE: 1500,
      TIME: 31,
      AGE: 19,
      COUNTRY: "PL"
    }, {
      USER: "joe",
      SCORE: 2500,
      TIME: 33,
      AGE: 18,
      COUNTRY: "US"
    }, {
      USER: "sally",
      SCORE: 2000,
      TIME: 30,
      AGE: 16,
      COUNTRY: "CA"
    }, {
      USER: "yuri",
      SCORE: 3000,
      TIME: 34,
      AGE: 19,
      COUNTRY: "RU"
    }, {
      USER: "anita",
      SCORE: 2500,
      TIME: 32,
      AGE: 17,
      COUNTRY: "LV"
    }, {
      USER: "mark",
      SCORE: 2000,
      TIME: 30,
      AGE: 18,
      COUNTRY: "DE"
    }, {
      USER: "amy",
      SCORE: 1500,
      TIME: 29,
      AGE: 19,
      COUNTRY: "UK"
    }];

    data.sort(module.exports({
      name: 'SCORE',
      reverse: true
    }, 'TIME', 'AGE'));

    console.log(data);
  })();
}

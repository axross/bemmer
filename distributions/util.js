"use strict";

var startsWith = function startsWith(string, search) {
  var position = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

  return string.lastIndexOf(search, position) === position;
};

var includes = function includes(string, search) {
  var position = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

  return string.indexOf(search, position) !== -1;
};

module.exports = {
  startsWith: startsWith,
  includes: includes
};
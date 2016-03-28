'use strict';

var createBuilder = require('./createBuilder');
var isBuilder = require('./isBuilder');

module.exports = {
  createBuilder: createBuilder,

  // undocumented
  isBuilder: isBuilder,

  // alias
  create: createBuilder
};
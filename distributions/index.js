'use strict';

var Bem = require('./Bem');
var createBuilder = require('./createBuilder');
var isBuilder = require('./createBuilder');

module.exports = {
  createBuilder: createBuilder,

  // undocumented
  Bem: Bem,
  isBuilder: isBuilder,

  // alias
  builder: createBuilder
};
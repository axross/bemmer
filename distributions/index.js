'use strict';

var Bem = require('./Bem');
var createBuilder = require('./createBuilder');
var isBuilder = require('./createBuilder');

module.exports = {
  createBuilder: createBuilder,
  isBuilder: isBuilder,

  // undocumented
  Bem: Bem,

  // alias
  builder: createBuilder
};
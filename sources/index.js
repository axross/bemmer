const Bem = require('./Bem');
const createBuilder = require('./createBuilder');
const isBuilder = require('./isBuilder');
const utils = require('./utils');

module.exports = {
  createBuilder,

  // undocumented
  Bem,
  isBuilder,
  utils,

  // alias
  builder: createBuilder,
};

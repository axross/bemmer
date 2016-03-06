const Bem = require('./Bem');
const createBuilder = require('./createBuilder');
const isBuilder = require('./createBuilder');

module.exports = {
  createBuilder,
  isBuilder,

  // undocumented
  Bem,

  // alias
  builder: createBuilder,
};

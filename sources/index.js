const Bem = require('./Bem');
const createBuilder = require('./createBuilder');
const isBuilder = require('./createBuilder');

module.exports = {
  createBuilder,

  // undocumented
  Bem,
  isBuilder,

  // alias
  builder: createBuilder,
};

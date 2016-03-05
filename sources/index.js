const Bem = require('./Bem');
const createBuilder = require('./createBuilder');
const isBuilder = require('./createBuilder');

module.exports = {
  Bem,
  createBuilder,
  isBuilder,

  // alias
  builder: createBuilder,
};

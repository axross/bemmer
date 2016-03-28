const createBuilder = require('./createBuilder');
const isBuilder = require('./isBuilder');

module.exports = {
  createBuilder,

  // undocumented
  isBuilder,

  // alias
  create: createBuilder,
};

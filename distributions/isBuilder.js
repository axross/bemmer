'use strict';

var __SYMBOL = {};

var isBuilder = function isBuilder(target) {
  return typeof target === 'function' && target.__SYMBOL === __SYMBOL;
};

isBuilder.__SYMBOL = __SYMBOL;

module.exports = isBuilder;
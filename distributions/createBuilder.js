'use strict';

var invariant = require('invariant');
var Bem = require('./Bem');

var _require = require('./isBuilder');

var __SYMBOL = _require.__SYMBOL;


var createBuilder = function createBuilder() {
  for (var _len = arguments.length, initialClassNames = Array(_len), _key = 0; _key < _len; _key++) {
    initialClassNames[_key] = arguments[_key];
  }

  invariant(initialClassNames.every(function (cn) {
    return typeof cn === 'string';
  }), 'expects each of arguments is a string');

  var initialBems = initialClassNames.filter(function (cn) {
    return cn.length >= 1;
  }).reduce(function (whole, cn) {
    return whole.concat(cn.split(' '));
  }, []).map(function (cn) {
    return Bem.fromFullClassName(cn);
  });

  var builder = function builder() {
    var elementsStr = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var modifiersObj = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    invariant(typeof elementsStr === 'string', 'expects elementsStr is a string');
    invariant(Object.prototype.toString.call(modifiersObj) === '[object Object]', 'expects modifiersObj is a plain object');
    invariant(/^[_a-zA-Z0-9-]*$/.test(elementsStr), 'expects elementsStr is a valid string (via. /^[_a-zA-Z0-9-]*$/)');
    invariant(Object.keys(modifiersObj).every(function (key) {
      return (/^[_a-zA-Z0-9-]*$/.test(key)
      );
    }), 'expects keys of modifiersObj are each of a valid string (via. /^[_a-zA-Z0-9-]*$/)');

    var elements = elementsStr.split('__').filter(function (element) {
      return element.length >= 1;
    });
    var modifiers = Object.keys(modifiersObj).filter(function (key) {
      return key.length >= 1;
    }).filter(function (key) {
      return !!modifiersObj[key];
    });

    return initialBems.map(function (bem) {
      return new Bem(Object.assign({}, bem, {
        elements: bem.elements.concat(elements),
        modifiers: bem.modifiers.concat(modifiers)
      })).toString();
    }).reduce(function (whole, cn) {
      return whole.concat(cn.split(' '));
    }, []).reduce(function (whole, cn) {
      return whole.concat(whole.indexOf(cn) !== -1 ? [] : [cn]);
    }, []).join(' ');
  };

  builder.__SYMBOL = __SYMBOL;

  return builder;
};

module.exports = createBuilder;
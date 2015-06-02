'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var DEFAULT_ELEMENT_PREFIX = '__';
var DEFAULT_MODIFIER_PREFIX = '--';
var SPLITTER_REGEXP = /[\-\_\.\*\+\:\;\/]{2,}/g;

var elementPrefix = DEFAULT_ELEMENT_PREFIX;
var modifierPrefix = DEFAULT_MODIFIER_PREFIX;

var extractElements = function extractElements(__whole) {
  var whole = __whole || '';

  return whole.split(SPLITTER_REGEXP).filter(function (piece) {
    return piece.length >= 1;
  });
};

var extractModifiers = function extractModifiers(__pairs) {
  var pairs = __pairs || {};

  return Object.keys(pairs).filter(function (key) {
    return pairs[key];
  }).map(function (key) {
    return key;
  });
};

var attachElements = function attachElements(classNames, elements) {
  if (elements.length === 0) return classNames;

  return classNames.map(function (cn) {
    return cn + elementPrefix + elements.join(elementPrefix);
  });
};

var attachModifiers = function attachModifiers(classNames, modifiers) {
  var attached = classNames.map(function (cn) {
    return modifiers.map(function (mo) {
      return cn + modifierPrefix + mo;
    });
  }).reduce(function (prev, curr) {
    return prev.concat(curr);
  });

  return classNames.concat(attached);
};

var bemmer = function bemmer() {
  for (var _len = arguments.length, classNames = Array(_len), _key = 0; _key < _len; _key++) {
    classNames[_key] = arguments[_key];
  }

  var fixedElements = [];
  var fixedModifiers = [];

  var generator = function generator(elementWhole, modifierPairs) {
    var elements = fixedElements.concat(extractElements(elementWhole));
    var modifiers = fixedModifiers.concat(extractModifiers(modifierPairs));

    var elementsAttached = attachElements(classNames, elements);
    var modifiersAttached = attachModifiers(elementsAttached, modifiers);

    return modifiersAttached.join(' ');
  };

  generator.set = function (elementWhole, modifierPairs) {
    fixedElements = fixedElements.concat(extractElements(elementWhole));
    fixedModifiers = fixedModifiers.concat(extractModifiers(modifierPairs));

    return generator;
  };

  return generator;
};

bemmer.setElementPrefix = function (prefix) {
  elementPrefix = prefix;
};

bemmer.setModifierPrefix = function (prefix) {
  modifierPrefix = prefix;
};

bemmer.DEFAULT_ELEMENT_PREFIX = DEFAULT_ELEMENT_PREFIX;
bemmer.DEFAULT_MODIFIER_PREFIX = DEFAULT_MODIFIER_PREFIX;

exports['default'] = bemmer;
module.exports = exports['default'];

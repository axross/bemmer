//
// Bemmer v0.3.2 by @axross
// feel free to post Issues and Pull Requests: https://github.com/axross/bemmer
//
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ELEMENT_REGEXP = /__([^_\-\s]+)/g;
var MODIFIER_REGEXP = /\-\-([^_\-\s]+)/g;

var Bem = (function () {
  function Bem(_ref) {
    var block = _ref.block;
    var elements = _ref.elements;
    var modifiers = _ref.modifiers;

    _classCallCheck(this, Bem);

    this.block = block;
    this.elements = elements;
    this.modifiers = modifiers;
  }

  _createClass(Bem, [{
    key: 'append',
    value: function append(_ref2) {
      var _ref2$elements = _ref2.elements;
      var elements = _ref2$elements === undefined ? [] : _ref2$elements;
      var _ref2$modifiers = _ref2.modifiers;
      var modifiers = _ref2$modifiers === undefined ? [] : _ref2$modifiers;

      return new Bem({
        block: this.block,
        elements: this.elements.concat(elements),
        modifiers: this.modifiers.concat(modifiers)
      });
    }
  }, {
    key: 'toString',
    value: function toString() {
      var elementsAttached = this.elements.reduce(function (prev, element) {
        return prev.concat(['__' + element]);
      }, [this.block]).join('');

      var modifiersAttached = this.modifiers.reduce(function (prev, modifier) {
        return prev.concat([elementsAttached + '--' + modifier]);
      }, [elementsAttached]).join(' ');

      return modifiersAttached;
    }
  }], [{
    key: 'fromClassName',
    value: function fromClassName(className) {
      var block = __extractBlock(className);
      var elements = __extract(ELEMENT_REGEXP, className);
      var modifiers = __extract(MODIFIER_REGEXP, className);

      return new Bem({ block: block, elements: elements, modifiers: modifiers });
    }
  }]);

  return Bem;
})();

var generateBuilder = function generateBuilder() {
  for (var _len = arguments.length, classNames = Array(_len), _key = 0; _key < _len; _key++) {
    classNames[_key] = arguments[_key];
  }

  var bems = classNames.filter(function (className) {
    return typeof className === 'string';
  }).reduce(function (prev, className) {
    return prev.concat(className.split(' '));
  }, []).filter(function (className) {
    return className.length > 0;
  }).map(function (className) {
    return Bem.fromClassName(className);
  });

  var builder = function builder(elements) {
    var modifiers = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (typeof elements !== 'string') {
      throw new TypeError('elements must be a String');
    }
    if (Object.prototype.toString.call(modifiers) !== '[object Object]') {
      throw new TypeError('modifiers must be a plain Object or undefined.');
    }

    return bems.map(function (bem) {
      return bem.append({
        elements: __parseElements(elements),
        modifiers: __parseModifiers(modifiers)
      });
    }).map(function (bem) {
      return bem.toString();
    }).reduce(function (prev, className) {
      return prev.concat(className.split(' '));
    }, []).reduce(function (prev, className) {
      return prev.concat(prev.indexOf(className) > -1 ? [] : [className]);
    }, []).join(' ');
  };

  builder.bems = bems;

  return builder;
};

var __extractBlock = function __extractBlock(value) {
  var block = value.split('__')[0].split('--')[0];

  if (value === '') {
    throw new Error('Invalid className given');
  }

  return block;
};

var __extract = function __extract(regexp, string) {
  var clonedRegexp = new RegExp(regexp);
  var extracted = [];

  while (true) {
    var result = clonedRegexp.exec(string);

    if (result === null) break;

    extracted.push(result[1]);
  }

  return extracted;
};

var __parseElements = function __parseElements(elements) {
  return elements.split('__').filter(function (element) {
    return element.length > 0;
  });
};

var __parseModifiers = function __parseModifiers(modifiers) {
  return Object.keys(modifiers).filter(function (modifier) {
    return !!modifiers[modifier];
  }).filter(function (modifier) {
    return modifier.length > 0;
  });
};

var Bemmer = {
  create: generateBuilder
};

exports['default'] = Bemmer;
module.exports = exports['default'];

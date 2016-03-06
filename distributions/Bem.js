'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var invariant = require('invariant');

var Bem = function () {
  function Bem(params) {
    _classCallCheck(this, Bem);

    var block = params.block;
    var elements = params.elements;
    var modifiers = params.modifiers;


    invariant(typeof block === 'string', 'expects block is a string');
    invariant(Array.isArray(elements) && elements.every(function (el) {
      return typeof el === 'string';
    }), 'expects elements is an array of strings');
    invariant(Array.isArray(modifiers) && modifiers.every(function (mo) {
      return typeof mo === 'string';
    }), 'expects modifiers is an array of strings');
    invariant(!block.includes('__') && !block.includes('--'), 'expects block does not include "__" or "--"');
    invariant(elements.every(function (el) {
      return !el.includes('__') && !el.includes('--');
    }), 'expects an item of elements does not include "__" or "--"');
    invariant(modifiers.every(function (mo) {
      return !mo.includes('__') && !mo.includes('--');
    }), 'expects an item of modifiers does not include "__" or "--"');

    this.block = block;
    this.elements = elements;
    this.modifiers = modifiers;
  }

  _createClass(Bem, [{
    key: 'toString',
    value: function toString() {
      var elementsAttached = this.elements.reduce(function (whole, current) {
        return whole + '__' + current;
      }, this.block);

      return this.modifiers.reduce(function (prev, modifier) {
        return prev.concat([elementsAttached + '--' + modifier]);
      }, [elementsAttached]).join(' ');
    }
  }], [{
    key: 'fromFullClassName',
    value: function fromFullClassName(fullClassName) {
      invariant(typeof fullClassName === 'string', 'expects fullClassName is a string');
      invariant(/^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/.test(fullClassName), 'expects fromFullClassName is the valid class name (via: https://www.w3.org/TR/CSS21/grammar.html#scanner)');

      var block = fullClassName.split('__')[0].split('--')[0];
      var elements = [];
      var modifiers = [];
      var parts = fullClassName.substr(block.length).match(/(__[A-Za-z0-9]+)|(\-\-[A-Za-z0-9]+)/g);

      if (Array.isArray(parts)) {
        parts.reduce(function (whole, matched) {
          return whole.indexOf(matched) === -1 ? whole.concat([matched]) : whole;
        }, []).forEach(function (matched) {
          if (matched.startsWith('__')) elements.push(matched.substr(2));
          if (matched.startsWith('--')) modifiers.push(matched.substr(2));
        });
      }

      return new Bem({ block: block, elements: elements, modifiers: modifiers });
    }
  }]);

  return Bem;
}();

module.exports = Bem;
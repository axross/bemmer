"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var DEFAULT_ELEMENT_PREFIX = "__";
var DEFAULT_MODIFIER_PREFIX = "--";

var _elementPrefix = DEFAULT_ELEMENT_PREFIX;
var _modifierPrefix = DEFAULT_MODIFIER_PREFIX;

var Bemmer = (function () {
  function Bemmer() {
    for (var _len = arguments.length, classNames = Array(_len), _key = 0; _key < _len; _key++) {
      classNames[_key] = arguments[_key];
    }

    _classCallCheck(this, Bemmer);

    this._classNames = classNames.map(function (className) {
      return className.split(/\s/).filter(function (v) {
        return v !== "";
      });
    }).reduce(function (prevArr, arr) {
      return prevArr.concat(arr);
    });

    this.elementNames = [];
    this.modifierNames = [];
  }

  _prototypeProperties(Bemmer, {
    setElementPrefix: {
      value: function setElementPrefix(prefix) {
        _elementPrefix = prefix;
      },
      writable: true,
      configurable: true
    },
    setModifierPrefix: {
      value: function setModifierPrefix(prefix) {
        _modifierPrefix = prefix;
      },
      writable: true,
      configurable: true
    }
  }, {
    element: {
      value: function element() {
        var elementName = arguments[0] === undefined ? "" : arguments[0];

        if (elementName === "") {
          return this;
        }elementName = elementName.replace(/[_\-\s]{2,}/g, "__").replace(/^[_\-\s]{2}/, "");

        this.elementNames.push(elementName);

        return this;
      },
      writable: true,
      configurable: true
    },
    el: {
      value: function el() {
        var _ref;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return (_ref = this).element.apply(_ref, args);
      },
      writable: true,
      configurable: true
    },
    modifier: {
      value: function modifier(_x, isEnable) {
        var modifierName = arguments[0] === undefined ? "" : arguments[0];

        if (modifierName === "") {
          return this;
        }if (isEnable !== void 0 && !isEnable) {
          return this;
        }modifierName = modifierName.replace(/[_\-\s]{2,}/g, "--").replace(/^[_\-\s]{2}/, "");

        this.modifierNames.push(modifierName);

        return this;
      },
      writable: true,
      configurable: true
    },
    mo: {
      value: function mo() {
        var _ref;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return (_ref = this).modifier.apply(_ref, args);
      },
      writable: true,
      configurable: true
    },
    root: {
      value: function root() {
        return this._classNames.map(function (v) {
          return v.split(/[\-_]{2}/)[0];
        }).join(" ");
      },
      writable: true,
      configurable: true
    },
    out: {
      value: function out() {
        var _this = this;

        return this._classNames.map(function (c) {
          return _this.elementNames.reduce(function (prev, curr) {
            return prev + "__" + curr;
          }, c);
        }).map(function (c) {
          return _this.modifierNames.map(function (modi) {
            return c + "--" + modi;
          });
        }).reduce(function (prevArr, arr) {
          return prevArr.concat(arr);
        }).join(" ");
      },
      writable: true,
      configurable: true
    }
  });

  return Bemmer;
})();

var className = new Bemmer("block");

console.log(className.el("element").mo("modifier").el("super-element").out());

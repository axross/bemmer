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

    if (classNames.length === 0) {
      this._blockNames = [];
    } else {
      this._blockNames = classNames.map(function (className) {
        return className.split(/\s/).filter(function (v) {
          return v !== "";
        });
      }).reduce(function (prevArr, arr) {
        return prevArr.concat(arr);
      });
    }

    this._elementNames = [];
    this._modifierNames = [];
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
    },
    DEFAULT_ELEMENT_PREFIX: {
      get: function () {
        return DEFAULT_ELEMENT_PREFIX;
      },
      configurable: true
    },
    DEFAULT_MODIFIER_PREFIX: {
      get: function () {
        return DEFAULT_MODIFIER_PREFIX;
      },
      configurable: true
    }
  }, {
    element: {
      value: function element() {
        var elementName = arguments[0] === undefined ? "" : arguments[0];

        if (elementName === "") {
          return this;
        }var elementNames = elementName.split(/[_\-\s]{2,}/g).filter(function (v) {
          return v !== "";
        });

        return new Bemmer()._init({
          _blockNames: this._blockNames,
          _elementNames: this._elementNames.concat(elementNames),
          _modifierNames: this._modifierNames });
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
        }var modifierNames = modifierName.split(/[_\-\s]{2,}/g).filter(function (v) {
          return v !== "";
        });

        return new Bemmer()._init({
          _blockNames: this._blockNames,
          _elementNames: this._elementNames,
          _modifierNames: this._modifierNames.concat(modifierNames) });
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
    getBlock: {
      value: function getBlock() {
        return this._blockNames.map(function (v) {
          return v.split(/[\-_]{2}/)[0];
        }).join(" ");
      },
      writable: true,
      configurable: true
    },
    out: {
      value: function out() {
        var _this = this;

        var classNames = this._blockNames.map(function (c) {
          return _this._elementNames.reduce(function (prev, curr) {
            return prev + _elementPrefix + curr;
          }, c);
        });

        if (this._modifierNames.length > 0) {
          classNames = classNames.map(function (c) {
            return _this._modifierNames.map(function (modi) {
              return c + _modifierPrefix + modi;
            });
          }).reduce(function (prevArr, arr) {
            return prevArr.concat(arr);
          });
        }

        return classNames.join(" ");
      },
      writable: true,
      configurable: true
    },
    _init: {
      value: function _init(prop) {
        this._blockNames = prop._blockNames;
        this._elementNames = prop._elementNames;
        this._modifierNames = prop._modifierNames;

        return this;
      },
      writable: true,
      configurable: true
    }
  });

  return Bemmer;
})();

module.exports = Bemmer;

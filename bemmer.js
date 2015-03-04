"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var ClassNamer = (function () {
  function ClassNamer() {
    for (var _len = arguments.length, classNames = Array(_len), _key = 0; _key < _len; _key++) {
      classNames[_key] = arguments[_key];
    }

    _classCallCheck(this, ClassNamer);

    this.__classNames = Array.prototype.concat.apply([], classNames.map(function (className) {
      return className.split(/\s/).filter(function (v) {
        return v !== "";
      });
    }));
  }

  _prototypeProperties(ClassNamer, null, {
    element: {
      value: function element() {
        var elementName = arguments[0] === undefined ? "" : arguments[0];

        elementName = elementName.replace(/[_\-\s]{2,}/, "__");
        elementName = elementName.replace(/^[_\-\s]{2}/, "");

        return this.__join("__" + elementName);
      },
      writable: true,
      configurable: true
    },
    state: {
      value: function state(_x, bool) {
        var stateName = arguments[0] === undefined ? "" : arguments[0];

        if (bool !== void 0 && !bool) {
          return this;
        }stateName = stateName.replace(/[_\-\s]{2,}/, "--");
        stateName = stateName.replace(/^[_\-\s]{2}/, "");

        return this.__join("--" + stateName);
      },
      writable: true,
      configurable: true
    },
    toString: {
      value: function toString() {
        return this.__classNames.join(" ");
      },
      writable: true,
      configurable: true
    },
    "do": {
      value: function _do() {
        return this.toString();
      },
      writable: true,
      configurable: true
    },
    getRoots: {
      value: function getRoots() {
        return this.__classNames.map(function (v) {
          return v.split(/[\-_]{2}/)[0];
        });
      },
      writable: true,
      configurable: true
    },
    getElements: {
      value: function getElements() {
        return /__([^\-_]+)/.exec(this.__classNames[0]).slice(1);
      },
      writable: true,
      configurable: true
    },
    getStates: {
      value: function getStates() {
        return /\-\-([^\-_]+)/.exec(this.__classNames[0]).slice(1);
      },
      writable: true,
      configurable: true
    },
    __join: {
      value: function __join(classNamePiece) {
        var newClassName = this.__classNames.map(function (v) {
          return v + classNamePiece;
        }).join(" ");

        return new ClassNamer(newClassName);
      },
      writable: true,
      configurable: true
    }
  });

  return ClassNamer;
})();

module.exports = ClassNamer;

var className = new ClassNamer("myComponent babel", "unko", "tinpo");

console.log(className.element("-_title_ inpo").state("--isEven", true).state("--isOdd", false).get());

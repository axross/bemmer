const DEFAULT_ELEMENT_PREFIX  = '__';
const DEFAULT_MODIFIER_PREFIX = '--';

var _elementPrefix  = DEFAULT_ELEMENT_PREFIX;
var _modifierPrefix = DEFAULT_MODIFIER_PREFIX;

export default class Bemmer {
  constructor(...classNames) {
    if (classNames.length === 0) {
      this._blockNames = [];
    } else {
      this._blockNames = classNames
        .map(className => {
          return className.split(/\s/).filter(v => { return v !== '' });
        })
        .reduce((prevArr, arr) => {
          return prevArr.concat(arr);
        });
    }

    this._elementNames  = [];
    this._modifierNames = [];
  }

  element(elementName = '') {
    if (elementName === '') return this;

    var elementNames = elementName
      .split(/[_\-\s]{2,}/g)
      .filter(v => { return v !== '' });

    return new Bemmer()._init({
      _blockNames:    this._blockNames,
      _elementNames:  this._elementNames.concat(elementNames),
      _modifierNames: this._modifierNames,
    });
  }

  el(...args) { return this.element(...args); }

  modifier(modifierName = '', isEnable) {
    if (modifierName === '')              return this;
    if (isEnable !== void 0 && !isEnable) return this;

    var modifierNames = modifierName
      .split(/[_\-\s]{2,}/g)
      .filter(v => { return v !== '' });

    return new Bemmer()._init({
      _blockNames:    this._blockNames,
      _elementNames:  this._elementNames,
      _modifierNames: this._modifierNames.concat(modifierNames),
    });
  }

  mo(...args) { return this.modifier(...args); }

  getBlock() {
    return this._blockNames
      .map(v => { return v.split(/[\-_]{2}/)[0] })
      .join(' ');
  }

  out() {
    var classNames = this._blockNames.map(c => {
      return this._elementNames.reduce((prev, curr) => {
        return prev + _elementPrefix + curr;
      }, c);
    });

    if (this._modifierNames.length > 0) {
      classNames = classNames.map(c => {
        return this._modifierNames.map(modi => {
          return c + _modifierPrefix + modi;
        });
      }).reduce((prevArr, arr) => {
        return prevArr.concat(arr);
      });
    }

    return classNames.join(' ');
  }

  _init(prop) {
    this._blockNames    = prop._blockNames;
    this._elementNames  = prop._elementNames;
    this._modifierNames = prop._modifierNames;

    return this;
  }

  static setElementPrefix(prefix) {
    _elementPrefix = prefix;
  }

  static setModifierPrefix(prefix) {
    _modifierPrefix = prefix;
  }

  static get DEFAULT_ELEMENT_PREFIX() {
    return DEFAULT_ELEMENT_PREFIX;
  }

  static get DEFAULT_MODIFIER_PREFIX() {
    return DEFAULT_MODIFIER_PREFIX;
  }
}

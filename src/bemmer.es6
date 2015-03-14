const DEFAULT_ELEMENT_PREFIX  = '__';
const DEFAULT_MODIFIER_PREFIX = '--';

var _elementPrefix  = DEFAULT_ELEMENT_PREFIX;
var _modifierPrefix = DEFAULT_MODIFIER_PREFIX;

class Bemmer {
  constructor(...classNames) {
    this._classNames = classNames
      .map(className => {
        return className.split(/\s/).filter(v => { return v !== ''; });
      })
      .reduce((prevArr, arr) => {
        return prevArr.concat(arr);
      });

    this.elementNames  = [];
    this.modifierNames = [];
  }

  element(elementName = '') {
    if (elementName === '') return this;

    elementName = elementName
                    .replace(/[_\-\s]{2,}/g, '__')
                    .replace(/^[_\-\s]{2}/, '');

    this.elementNames.push(elementName);

    return this;
  }

  el(...args) { return this.element(...args); }

  modifier(modifierName = '', isEnable) {
    if (modifierName === '')              return this;
    if (isEnable !== void 0 && !isEnable) return this;

    modifierName = modifierName
                     .replace(/[_\-\s]{2,}/g, '--')
                     .replace(/^[_\-\s]{2}/, '');

    this.modifierNames.push(modifierName);

    return this;
  }

  mo(...args) { return this.modifier(...args); }

  root() {
    return this._classNames
      .map(v => { return v.split(/[\-_]{2}/)[0] })
      .join(' ');
  }

  out() {
    return this._classNames
      .map(c => {
        return this.elementNames.reduce((prev, curr) => {
          return prev + '__' + curr;
        }, c);
      })
      .map(c => {
        return this.modifierNames.map(modi => { return c + '--' + modi });
      })
      .reduce((prevArr, arr) => {
        return prevArr.concat(arr);
      })
      .join(' ');
  }

  static setElementPrefix(prefix) {
    _elementPrefix = prefix;
  }

  static setModifierPrefix(prefix) {
    _modifierPrefix = prefix;
  }
}


var className = new Bemmer('block');

console.log(className.el('element').mo('modifier').el('super-element').out());

export default class Bemmer {
  constructor(...classNames) {
    this.__classNames = Array.prototype.concat.apply(
      [],
      classNames.map(className => {
        return className.split(/\s/).filter(v => { return v !== ''; });
      })
    );
  }

  element(elementName = '') {
    elementName = elementName.replace(/[_\-\s]{2,}/g, '__');
    elementName = elementName.replace(/^[_\-\s]{2}/, '');

    return this.__join(`__${elementName}`);
  }

  el(elementName) {
    return this.element(elementName);
  }

  state(stateName = '', isEnable) {
    if (isEnable !== void 0 && !isEnable) return this;

    stateName = stateName.replace(/[_\-\s]{2,}/g, '--');
    stateName = stateName.replace(/^[_\-\s]{2}/, '');

    return this.__join(`--${stateName}`);
  }

  st(stateName, isEnable) {
    return this.state(stateName, isEnable);
  }

  toString() {
    return this._toString();
  }

  get() {
    return this._toString();
  }

  getRoots() {
    return this.__classNames.map(v => {
      return v.split(/[\-_]{2}/)[0];
    });
  }

  getElements() {
    return /__([^\-_]+)/.exec(this.__classNames[0]).slice(1);
  }

  getStates() {
    return /\-\-([^\-_]+)/.exec(this.__classNames[0]).slice(1);
  }

  _toString() {
    return this.__classNames.join(' ');
  }

  __join(classNamePiece) {
    var newClassName = this.__classNames.map(v => {
      return v + classNamePiece;
    }).join(' ');

    return new Bemmer(newClassName);
  }
}

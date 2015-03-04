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

  state(stateName = '', bool) {
    if (bool !== void 0 && !bool) return this;

    stateName = stateName.replace(/[_\-\s]{2,}/g, '--');
    stateName = stateName.replace(/^[_\-\s]{2}/, '');

    return this.__join(`--${stateName}`);
  }

  toString() {
    return this.__classNames.join(' ');
  }

  do() {
    return this.toString();
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

  __join(classNamePiece) {
    var newClassName = this.__classNames.map(v => {
      return v + classNamePiece;
    }).join(' ');

    return new Bemmer(newClassName);
  }
}

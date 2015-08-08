const BLOCK_REGEXP    = /^([^_\-]+)/;
const ELEMENT_REGEXP  = /__([^_\-]+)[^_]{2,}/g;
const MODIFIER_REGEXP = /\-\-([^_\-]+)[^\-]{2,}/g;

class Bem {
  constructor({ block, elements, modifiers }) {
    this.block = block;
    this.elements = elements;
    this.modifiers = modifiers;
  }

  append({ elements = [], modifiers = [] }) {
    this.elements = this.elements.concat(elements);
    this.modifiers = this.modifiers.concat(modifiers);

    return this;
  }

  toString() {
    const elementsAttached = this.elements
      .reduce((prev, element) => {
        return prev.concat(['__' + element]);
      }, [this.block])
      .join('');

    const modifiersAttached = this.modifiers
      .reduce((prev, modifier) => {
        return prev.concat([`${elementsAttached}--${modifier}`]);
      }, [elementsAttached])
      .join(' ');

    return modifiersAttached;
  }

  static fromClassName(className) {
    const block = extract(BLOCK_REGEXP, className);
    const elements = extract(ELEMENT_REGEXP, className);
    const modifiers = extract(MODIFIER_REGEXP, className);

    return new Bem({ block, elements, modifiers });
  }
}

const extract = (regexp, string) => {
  const result = regexp.exec(string);

  return !!result ? Array.from(result).slice(1) : [];
}

const bemmer = (...classNames) => {
  const bems = classNames
    .filter(className => typeof className === 'string')
    .reduce((prev, className) => {
      return prev.concat(className.split(' '));
    }, [])
    .filter(className => className.length >= 1)
    .map(className => Bem.fromClassName(className));

  const builder = (elements = '', modifiers = {}) => {
    const sanitizedElements = elements.split('__')
      .filter(element => element.length > 0);
    const sanitizedModifiers = Object.keys(modifiers)
      .filter(modifier => !!modifiers[modifier])
      .filter(modifier => modifier.length > 0);

    return bems
      .map(bem => {
        return bem.append({
          elements: sanitizedElements,
          modifiers: sanitizedModifiers
        });
      })
      .map(bem => bem.toString())
      .reduce((prev, className) => {
        return prev.concat(prev.indexOf(className) > -1 ? [] : [className]);
      }, [])
      .join(' ');
  };

  return builder;
};

export default bemmer;

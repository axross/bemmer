const BLOCK_REGEXP    = /^([^_\-\s]+)/g;
const ELEMENT_REGEXP  = /__([^_\-\s]+)/g;
const MODIFIER_REGEXP = /\-\-([^_\-\s]+)/g;

class Bem {
  constructor({ block, elements, modifiers }) {
    this.block = block;
    this.elements = elements;
    this.modifiers = modifiers;
  }

  append({ elements = [], modifiers = [] }) {
    return new Bem({
      block: this.block,
      elements: this.elements.concat(elements),
      modifiers: this.modifiers.concat(modifiers),
    });
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
    const block = extract(BLOCK_REGEXP, className)[0];
    const elements = extract(ELEMENT_REGEXP, className);
    const modifiers = extract(MODIFIER_REGEXP, className);

    return new Bem({ block, elements, modifiers });
  }
}

const generateBuilder = (...classNames) => {
  const bems = classNames
    .filter(className => typeof className === 'string')
    .reduce((prev, className) => {
      return prev.concat(className.split(' '));
    }, [])
    .filter(className => className.length > 0)
    .map(className => Bem.fromClassName(className));

  const builder = (elements, modifiers) => {
    elements = elements || '';
    modifiers = modifiers || {};

    if (typeof elements !== 'string') {
      throw new TypeError('elements expect a string or null.');
    }
    if (Object.prototype.toString.call(modifiers) !== '[object Object]') {
      throw new TypeError('modifiers expect a plain object or null.');
    }

    return bems
      .map(bem => {
        return bem.append({
          elements: parseElements(elements),
          modifiers: parseModifiers(modifiers)
        });
      })
      .map(bem => bem.toString())
      .reduce((prev, className) => {
        return prev.concat(prev.indexOf(className) > -1 ? [] : [className]);
      }, [])
      .join(' ');
  };

  builder.clone = (elements = '', modifiers = {}) => {
    const built = builder(elements, modifiers);

    return bemmer(built);
  };

  builder.bems = bems;

  return builder;
};

const extract = (regexp, string) => {
  const clonedRegexp = new RegExp(regexp);
  let extracted = [];

  while (true) {
    let result = clonedRegexp.exec(string);

    if (result === null) break;

    extracted.push(result[1]);
  }

  return extracted;
}

const parseElements = (elements) => {
  return elements.split('__')
    .filter(element => element.length > 0);
};

const parseModifiers = (modifiers) => {
  return Object.keys(modifiers)
    .filter(modifier => !!modifiers[modifier])
    .filter(modifier => modifier.length > 0);
};

export default generateBuilder;

//
// Bemmer v0.4.0 by @axross
// feel free to post Issues and Pull Requests: https://github.com/axross/bemmer
//
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
    const block = __extractBlock(className);
    const elements = __extract(ELEMENT_REGEXP, className);
    const modifiers = __extract(MODIFIER_REGEXP, className);

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
    .map(className => Bem.fromClassName(className))

  const builder = (elements, modifiers = {}) => {
    if (typeof elements !== 'string') {
      throw new TypeError('elements must be a String');
    }
    if (Object.prototype.toString.call(modifiers) !== '[object Object]') {
      throw new TypeError('modifiers must be a plain Object or undefined.');
    }

    return bems
      .map(bem => {
        return bem.append({
          elements: __parseElements(elements),
          modifiers: __parseModifiers(modifiers)
        });
      })
      .map(bem => bem.toString())
      .reduce((prev, className) => {
        return prev.concat(className.split(' '));
      }, [])
      .reduce((prev, className) => {
        return prev.concat(prev.indexOf(className) > -1 ? [] : [className]);
      }, [])
      .join(' ');
  };

  builder.bems = bems;

  return builder;
};

const __extractBlock = value => {
  const block = value.split('__')[0].split('--')[0];

  if (value === '') {
    throw new Error('Invalid className given');
  }

  return block;
};

const __extract = (regexp, string) => {
  const clonedRegexp = new RegExp(regexp);
  let extracted = [];

  while (true) {
    let result = clonedRegexp.exec(string);

    if (result === null) break;

    extracted.push(result[1]);
  }

  return extracted;
}

const __parseElements = (elements) => {
  return elements.split('__')
    .filter(element => element.length > 0);
};

const __parseModifiers = (modifiers) => {
  return Object.keys(modifiers)
    .filter(modifier => !!modifiers[modifier])
    .filter(modifier => modifier.length > 0);
};

const Bemmer = {
  create: generateBuilder,
};

export default Bemmer;

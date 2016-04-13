const invariant = require('invariant');
const { includes, startsWith } = require('./util');

class Bem {
  constructor(params) {
    const {
      block,
      elements,
      modifiers,
    } = params;

    invariant(
      typeof block === 'string',
      'expects block is a string'
    );
    invariant(
      Array.isArray(elements) && elements.every(el => typeof el === 'string'),
      'expects elements is an array of strings'
    );
    invariant(
      Array.isArray(modifiers) && modifiers.every(mo => typeof mo === 'string'),
      'expects modifiers is an array of strings'
    );
    invariant(
      block.indexOf('__') === -1 && block.indexOf('--') === -1,
      'expects block does not include "__" or "--"'
    );
    invariant(
      elements.every(el => el.indexOf('__') === -1 && el.indexOf('--') === -1),
      'expects an item of elements does not include "__" or "--"'
    );
    invariant(
      modifiers.every(mo => mo.indexOf('__') === -1 && mo.indexOf('--') === -1),
      'expects an item of modifiers does not include "__" or "--"'
    );

    this.block = block;
    this.elements = elements;
    this.modifiers = modifiers;
  }

  toString() {
    const elementsAttached = this.elements
      .reduce((whole, current) => `${whole}__${current}`, this.block);

    return this.modifiers
      .reduce((prev, modifier) => {
        return prev.concat([`${elementsAttached}--${modifier}`]);
      }, [elementsAttached])
      .join(' ');
  }

  static fromFullClassName(fullClassName) {
    invariant(
      typeof fullClassName === 'string',
      'expects fullClassName is a string'
    );
    invariant(
      /^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/.test(fullClassName),
      'expects fromFullClassName is the valid class name (via: https://www.w3.org/TR/CSS21/grammar.html#scanner)'
    );

    const block = fullClassName.split('__')[0].split('--')[0];
    const elements = [];
    const modifiers = [];
    const parts = fullClassName.substr(block.length)
      .match(/(__[A-Za-z0-9]+)|(\-\-[A-Za-z0-9]+)/g);

    if (Array.isArray(parts)) {
      parts
        .forEach(matched => {
          /* eslint no-magic-numbers: 0 */
          if (startsWith(matched, '__')) elements.push(matched.substr(2));
          if (startsWith(matched, '--')) modifiers.push(matched.substr(2));
        });
    }

    return new Bem({ block, elements, modifiers });
  }
}

module.exports = Bem;

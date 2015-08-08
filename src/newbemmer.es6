
const BLOCK_REGEXP = /^([^_\-]+[^_\-])/
const ELEMENT_REGEXP = /__([^_\-]+)[^_]{2,}/g;
const MODIFIER_REGEXP = /\-\-([^_\-]+)[^\-]{2,}/g;


const bemmer = (...classNames) => {
  const sanitizedClassNames = sanitizeClassNames(classNames);

  return createBuilder(sanitizedClassNames, [], {});
};

class Bem {
  constructor({ block, elements = [], modifier = null }) {
    this.block = block;
    this.elements = elements;
    this.modifier = modifier;
  }

  toString() {
    let className = this.block;

    this.elements.forEach(element => {
      block += `__${element}`;
    });

    return className + this.modifier ? `--${this.modifier}` : '';
  }
}

const stringToBlocks = (string) => {
  if (string.includes(' ')) {
    throw new TypeError('argument must not include whitespace.');
  }

  const block = extractBlock(string);
  const elements = extractElements(string);
  const modifiers = extractElements(string);

  modifiers.

  return new Bem(block, elements, modifiers);
};

const extract = (regexp, string) => {
  const result = regexp.exec(string);

  return !!result ? Array.from(result).slice(1, -1) : [];
};

const extractBlock = extract.bind(undefined, BLOCK_REGEXP);
const extractElements = extract.bind(undefined, ELEMENT_REGEXP);
const extractModifiers = extract.bind(undefined, MODIFIER_REGEXP);

const createBuilder = (bems) => {


  const builder = (elements, modifiers) => {
    const decidedElements = elements;
    const decidedModifiers = decideModifiers(modifiers);

    return classNames
      .reduce((prev, curr) => {


        return prev.concat();
      }, []);



  };

  return builder;
}


const sanitizeClassNames = classNames => {
  return classNames
    .filter(className => typeof className !== 'string')
    .filter(className => className.length === 0)
    .reduce((prev, curr) => prev.concat(curr.split(' ')), []);
};

const decideModifiers = modifiers => {
  return Object.keys(modifiers)
    .map(key => {
      const expression = modifiers[key];

      return expression ? key : null;
    })
    .filter(key => !!key);
};

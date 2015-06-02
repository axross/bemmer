const DEFAULT_ELEMENT_PREFIX  = '__';
const DEFAULT_MODIFIER_PREFIX = '--';
const SPLITTER_REGEXP         = /[\-\_\.\*\+\:\;\/]{2,}/g;

var elementPrefix  = DEFAULT_ELEMENT_PREFIX;
var modifierPrefix = DEFAULT_MODIFIER_PREFIX;

const extractElements = __whole => {
  const whole = __whole || '';

  return whole.split(SPLITTER_REGEXP)
    .filter(piece => piece.length >= 1);
};

const extractModifiers = __pairs => {
  const pairs = __pairs || {};

  return Object.keys(pairs)
    .filter(key => pairs[key])
    .map(key => key);
};

const attachElements = (classNames, elements) => {
  if (elements.length === 0) return classNames;

  return classNames
    .map(cn => cn + elementPrefix + elements.join(elementPrefix));
};

const attachModifiers = (classNames, modifiers) => {
  const attached = classNames
    .map(cn => {
      return modifiers
        .map(mo => cn + modifierPrefix + mo);
    })
    .reduce((prev, curr) => prev.concat(curr))

  return classNames.concat(attached);
};

const bemmer = (...classNames) => {
  var fixedElements  = [];
  var fixedModifiers = [];

  const generator = (elementWhole, modifierPairs) => {
    const elements  = fixedElements.concat(extractElements(elementWhole));
    const modifiers = fixedModifiers.concat(extractModifiers(modifierPairs));

    const elementsAttached  = attachElements(classNames, elements);
    const modifiersAttached = attachModifiers(elementsAttached, modifiers);

    return modifiersAttached.join(' ');
  };

  generator.set = (elementWhole, modifierPairs) => {
    fixedElements  = fixedElements.concat(extractElements(elementWhole));
    fixedModifiers = fixedModifiers.concat(extractModifiers(modifierPairs));

    return generator;
  };

  return generator;
};

bemmer.setElementPrefix = prefix => {
  elementPrefix = prefix;
};

bemmer.setModifierPrefix = prefix => {
  modifierPrefix = prefix;
};

bemmer.DEFAULT_ELEMENT_PREFIX  = DEFAULT_ELEMENT_PREFIX;
bemmer.DEFAULT_MODIFIER_PREFIX = DEFAULT_MODIFIER_PREFIX;

export default bemmer;

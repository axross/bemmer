const invariant = require('invariant');
const Bem = require('./Bem');
const { __SYMBOL } = require('./isBuilder');

const createBuilder = (...initialClassNames) => {
  invariant(
    initialClassNames.every(cn => typeof cn === 'string'),
    'expects each of arguments is a string'
  );

  const initialBems = initialClassNames
    .filter(cn => cn.length >= 1)
    .reduce((whole, cn) => whole.concat(cn.split(' ')), [])
    .map(cn => Bem.fromFullClassName(cn));

  const builder = (elementsStr = '', modifiersObj = {}) => {
    invariant(
      typeof elementsStr === 'string',
      'expects elementsStr is a string'
    );
    invariant(
      Object.prototype.toString.call(modifiersObj) === '[object Object]',
      'expects modifiersObj is a plain object'
    );
    invariant(
      /^[_a-zA-Z0-9-]*$/.test(elementsStr),
      'expects elementsStr is a valid string (via. /^[_a-zA-Z0-9-]*$/)'
    );
    invariant(
      Object.keys(modifiersObj).every(key => /^[_a-zA-Z0-9-]*$/.test(key)),
      'expects keys of modifiersObj are each of a valid string ' +
      '(via. /^[_a-zA-Z0-9-]*$/)'
    );

    const elements = elementsStr.split('__')
      .filter(element => element.length >= 1);
    const modifiers = Object.keys(modifiersObj)
      .filter(key => key.length >= 1)
      .filter(key => !!modifiersObj[key]);

    return initialBems
      .map(bem => {
        return new Bem(Object.assign({}, bem, {
          elements: bem.elements.concat(elements),
          modifiers: bem.modifiers.concat(modifiers),
        })).toString();
      })
      .reduce((whole, cn) => whole.concat(cn.split(' ')), [])
      .reduce((whole, cn) => {
        return whole.concat(whole.indexOf(cn) === -1 ? [cn] : []);
      }, [])
      .join(' ');
  };

  builder.__SYMBOL = __SYMBOL;

  return builder;
};

module.exports = createBuilder;

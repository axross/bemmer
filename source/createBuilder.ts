import Bem from './Bem';

type ModifiersObject = {
  [key: string]: boolean;
}

type Builder = (stringifiedElements?: string, modifiersObject?: ModifiersObject) => string;

const createBuilder = (...initialClassNames: (string | undefined)[]): Builder => {
  if (initialClassNames.some(className => typeof className !== 'string' && typeof className !== 'undefined')) {
    throw new TypeError(
      'createBuilder(): all of initialClassNames must be a string'
    );
  }

  const initialBems = initialClassNames
    .reduce((whole, className) => {
      if (typeof className !== 'string' || className.trim() === '') return whole;

      return whole.concat(className.split(' '));
    }, [] as string[])
    .map(className => Bem.fromFullClassName(className));

  const builder = (stringifiedElements: string = '', modifiersObject: ModifiersObject = {}): string => {
    if (typeof stringifiedElements !== 'string') {
      throw new TypeError(
        'builder(): a stringifiedElements must be a string'
      );
    }

    if (Object.prototype.toString.call(modifiersObject) !== '[object Object]') {
      throw new TypeError(
        'builder(): a modifiersObject must be a plain object'
      );
    }

    const elements = stringifiedElements.split('__')
      .filter(element => element !== '');
    const modifiers = Object.keys(modifiersObject)
      .filter(key => key !== '' && modifiersObject[key]);

    return initialBems
      .map(bem => new Bem(Object.assign({}, bem, {
        elements: bem.elements.concat(elements),
        modifiers: bem.modifiers.concat(modifiers),
      })).toString())
      .reduce((whole, className) => whole.concat(className.split(' ')), [] as string[])
      .reduce((whole, className) => {
        if (whole.indexOf(className) !== -1) return whole;

        return whole.concat([className])
      }, [] as string[])
      .join(' ');
  };

  return builder;
};

export default createBuilder;

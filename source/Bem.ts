class Bem {
  block: string;
  elements: string[];
  modifiers: string[];

  constructor({ block, elements, modifiers }: { block: string, elements: string[], modifiers: string[] }) {
    this.block = block;
    this.elements = elements;
    this.modifiers = modifiers;
  }

  toString(): string {
    const elementsAttached = this.elements
      .reduce((whole, current) => `${whole}__${current}`, this.block);

    return this.modifiers
      .reduce((whole, modifier) => whole.concat([`${elementsAttached}--${modifier}`]), [elementsAttached])
      .join(' ');
  }

  static fromFullClassName(fullClassName: string): Bem {
    const block = fullClassName.split('__')[0].split('--')[0];
    const leftover = fullClassName.substr(block.length);
    const elementMatches = leftover.match(/__[A-Za-z0-9]+/g);
    const modifierMatches = leftover.match(/--[A-Za-z0-9]+/g);
    const elements: string[] = [];
    const modifiers: string[] = [];

    if (Array.isArray(elementMatches)) {
      for (let i = 0; i < elementMatches.length; ++i) {
        elements.push(elementMatches[i].substr(2));
      }
    }

    if (Array.isArray(modifierMatches)) {
      for (let i = 0; i < modifierMatches.length; ++i) {
        modifiers.push(modifierMatches[i].substr(2));
      }
    }

    return new Bem({ block, elements, modifiers });
  }
}

export default Bem;
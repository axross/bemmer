import expect from 'expect.js';
import bemmer from '../bemmer';

describe('Bemmer', () => {
  describe('bemmer()', () => {
    it('can generate className with received elements and modifiers', () => {
      const cn = bemmer('block');
      const generated = cn('__element__eelement', {
        isModifier: true,
        isMmodifier: false,
      });
      const classNames = generated.split(' ');

      expect(classNames).to.contain('block__element__eelement');
      expect(classNames).to.contain('block__element__eelement--isModifier');
    });

    it('can receive the plural classNames', () => {
      const cn = bemmer('block', 'bblock');
      const generated = cn('__element__eelement', {
        isModifier: true,
        isMmodifier: false,
      });
      const classNames = generated.split(' ');

      expect(classNames).to.contain('block__element__eelement');
      expect(classNames).to.contain('bblock__element__eelement');
      expect(classNames).to.contain('block__element__eelement--isModifier');
      expect(classNames).to.contain('bblock__element__eelement--isModifier');
    });

    it('should return plain className if it did not receive any arguments', () => {
      const cn = bemmer('block', 'bblock');
      const generated = cn();
      const classNames = generated.split(' ');

      expect(classNames).to.contain('block');
      expect(classNames).to.contain('bblock');
    });

    it('should generate no-modifier-attached-className if it did not receive any modifiers', () => {
      const cn = bemmer('block', 'bblock');
      const generated = cn('__element__eelement');
      const classNames = generated.split(' ');

      expect(classNames).to.contain('block__element__eelement');
      expect(classNames).to.contain('bblock__element__eelement');
    });

    it('should generate no-element-attached-className if it did not receive any elements', () => {
      const cn = bemmer('block', 'bblock');
      const generated = cn(null, {
        isModifier: true,
        isMmodifier: false,
      });
      const classNames = generated.split(' ');

      expect(classNames).to.contain('block');
      expect(classNames).to.contain('block--isModifier');
      expect(classNames).to.contain('bblock');
      expect(classNames).to.contain('bblock--isModifier');
    });
  });

  describe('bemmer.set()', () => {
    it('should return extended generate() function that includes received elements and modifiers', () => {
      const cn = bemmer('block', 'bblock');
      const fixed = cn.set('__element__eelement', {
        isModifier: true,
        isMmodifier: false,
      });
      const fixedClassNames = fixed().split(' ');

      expect(fixedClassNames).to.contain(
        'block__element__eelement'
      );
      expect(fixedClassNames).to.contain(
        'bblock__element__eelement'
      );
      expect(fixedClassNames).to.contain(
        'block__element__eelement--isModifier'
      );
      expect(fixedClassNames).to.contain(
        'bblock__element__eelement--isModifier'
      );

      const extended = fixed('__eeelement', {
        isMmmodifier: true,
      });
      const extendedClassNames = extended.split(' ');

      expect(extendedClassNames).to.contain(
        'block__element__eelement__eeelement'
      );
      expect(extendedClassNames).to.contain(
        'bblock__element__eelement__eeelement'
      );
      expect(extendedClassNames).to.contain(
        'block__element__eelement__eeelement--isModifier'
      );
      expect(extendedClassNames).to.contain(
        'bblock__element__eelement__eeelement--isModifier'
      );
      expect(extendedClassNames).to.contain(
        'block__element__eelement__eeelement--isMmmodifier'
      );
      expect(extendedClassNames).to.contain(
        'bblock__element__eelement__eeelement--isMmmodifier'
      );
    });
  });

  describe('bemmer.setElementPrefix()', () => {
    afterEach(() => {
      bemmer.setElementPrefix(bemmer.DEFAULT_ELEMENT_PREFIX);
    });

    it('should set prefix of element that used when bemmer() ', () => {
      bemmer.setElementPrefix('_-_-');

      const cn = bemmer('block');
      const generated = cn('__element__eelement', {
        isModifier: true,
        isMmodifier: false,
      });
      const classNames = generated.split(' ');

      expect(classNames).to.contain('block_-_-element_-_-eelement');
      expect(classNames).to.contain('block_-_-element_-_-eelement--isModifier');
    });
  });

  describe('bemmer.setElementPrefix()', () => {
    afterEach(() => {
      bemmer.setModifierPrefix(bemmer.DEFAULT_MODIFIER_PREFIX);
    });

    it('should set prefix of element that used when bemmer() ', () => {
      bemmer.setModifierPrefix('$#$#');

      const cn = bemmer('block');
      const generated = cn('__element__eelement', {
        isModifier: true,
        isMmodifier: false,
      });
      const classNames = generated.split(' ');

      expect(classNames).to.contain('block__element__eelement');
      expect(classNames).to.contain('block__element__eelement$#$#isModifier');
    });
  });
});

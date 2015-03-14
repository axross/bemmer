import should from 'should';
import Bemmer from '../bemmer';

describe('Bemmer', () => {
  describe('Bemmer#getBlock()', () => {
    it('should returns base class names', () => {
      var bemmerA = new Bemmer('block');

      should(bemmerA.getBlock())
        .be.equal('block');

      var bemmerB = new Bemmer('block blocken ', 'blocking');

      should(bemmerB.getBlock())
        .be.equal('block blocken blocking');

      var bemmerC = new Bemmer('block', 'blocker');

      should(bemmerC.element('element').modifier('isState').getBlock())
        .be.equal('block blocker');
    });
  });

  describe('Bemmer#element()', () => {
    it('should play a "Element" role of BEM', () => {
      var bemmer = new Bemmer('block');

      should(bemmer.element('element').out())
        .be.equal('block__element');

      should(bemmer.element('elementes').element('elemental').out())
        .be.equal('block__elementes__elemental');
    });

    it('should can apply plural blocks', () => {
      var bemmer = new Bemmer('block', 'blocken blocking');

      should(bemmer.element('element').out())
        .be.equal('block__element blocken__element blocking__element');
    });
  });

  describe('Bemmer#el()', () => {
    it('should alias to Bemmer#element()', () => {
      var bemmer = new Bemmer('block');

      should(bemmer.element('element').out())
        .be.equal('block__element');
    });
  });

  describe('Bemmer#modifier()', () => {
    it('should play a "Modifier" roke of BEM', () => {
      var bemmer = new Bemmer('block');

      should(bemmer.element('element').modifier('modifier').out())
        .be.equal('block__element--modifier');

      should(bemmer.modifier('modifierist').element('elemental').out())
        .be.equal('block__elemental--modifierist');
    });

    it('should can apply plural blocks', () => {
      var bemmer = new Bemmer('block', 'blocken blocking');

      should(bemmer.modifier('modifier').out())
        .be.equal('block--modifier blocken--modifier blocking--modifier');
    });

    it('should apply enable/disable with 2nd argument', () => {
      var bemmer = new Bemmer('block');

      should(bemmer.element('element').modifier('modifier', true).out())
        .be.equal('block__element--modifier');

      should(bemmer.element('elemental').modifier('modifierist', false).out())
        .be.equal('block__elemental');
    });

    it('should dont overlap modifier', () => {
      var bemmerA = new Bemmer('block');

      should(bemmerA.modifier('modifier').modifier('modifierist').out())
        .be.equal('block--modifier block--modifierist');

      var bemmerB = new Bemmer('block blocking', 'blocken');

      should(
        bemmerB.el('element').mo('modifier').mo('modifierist').out().split(' ')
      )
        .be.containDeep([
          'block__element--modifier',
          'blocking__element--modifier',
          'blocken__element--modifier',
          'block__element--modifierist',
          'blocking__element--modifierist',
          'blocken__element--modifierist'
        ]);
    });
  });

  describe('Bemmer#mo()', () => {
    it('should alias to Bemmer#modifier', () => {
      var bemmer = new Bemmer('block');

      should(bemmer.element('element').modifier('modifier').out())
        .be.equal('block__element--modifier');
    });
  })

  describe('Bemmer.setElementPrefix()', () => {
    afterEach(() => {
      Bemmer.setElementPrefix(Bemmer.DEFAULT_ELEMENT_PREFIX);
    });

    it('should change element prefix', () => {
      Bemmer.setElementPrefix('-<<-');

      var bemmer = new Bemmer('block');

      should(bemmer.element('element').out())
        .be.equal('block-<<-element');

      Bemmer.setElementPrefix('xωx');

      var bemmer = new Bemmer('block');

      should(bemmer.element('element').out())
        .be.equal('blockxωxelement');
    });
  });

  describe('Bemmer.setModifierPrefix()', () => {
    afterEach(() => {
      Bemmer.setModifierPrefix(Bemmer.DEFAULT_MODIFIER_PREFIX);
    });

    it('should change modifier prefix', () => {
      Bemmer.setModifierPrefix('->>-');

      var bemmer = new Bemmer('block');

      should(bemmer.modifier('modifier').out())
        .be.equal('block->>-modifier');

      Bemmer.setModifierPrefix('*^q^*');

      var bemmer = new Bemmer('block');

      should(bemmer.modifier('modifier').out())
        .be.equal('block*^q^*modifier');
    });
  });
})

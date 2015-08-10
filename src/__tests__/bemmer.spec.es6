import expect from 'expect.js';
import bemmer from '../bemmer';

describe('bemmer', () => {
  describe('bemmer()', () => {
    it('should parse classNames', () => {
      const testProps = [
        {
          args: ['block'],
          expect: [
            {
              block: 'block',
              elements: [],
              modifier: [],
            },
          ],
        },
        {
          args: ['block', 'blockk', 'blockkk'],
          expect: [
            {
              block: 'block',
              elements: [],
              modifier: [],
            },
            {
              block: 'blockk',
              elements: [],
              modifier: [],
            },
            {
              block: 'blockkk',
              elements: [],
              modifier: [],
            },
          ]
        },
      ];

      testProps.forEach((prop) => {
        expect(bemmer(prop).bems).to.eql(prop.expect);
      });
    });
  //
  //   it('should ignore no-string values', () => {
  //     const testProps = [
  //       {
  //         args: ['block', null, undefined],
  //         expect: {
  //           block: 'block',
  //           elements: [],
  //           modifier: [],
  //         },
  //       },
  //       {
  //         args: ['block', 20, new Date(), 'blockk'],
  //         expect: {
  //           block: 'block blockk',
  //           elements: [],
  //           modifier: [],
  //         },
  //       },
  //     ];
  //   });
  //
  //   it('should ignore whitespaces', () => {
  //
  //   });
  });
  //
  // describe('builder()', () => {
  //   it('should building className', () => {
  //     const testProps = [
  //       {
  //         bemmerArgs: ['block'],
  //         builderArgs: ['__element__childElement', { isAvailable: true }],
  //         expect: 'block__element__childElement ' +
  //                 'block__element__childElement--isAvailable',
  //       },
  //       {
  //         bemmerArgs: ['block', 'externalBlock', 'anotherBlock'],
  //         builderArgs: ['__element__childElement', { isAvailable: true }],
  //         expect: 'block__element__childElement ' +
  //                 'block__element__childElement--isAvailable ' +
  //                 'externalBlock__element__childElement ' +
  //                 'externalBlock__element__childElement--isAvailable ' +
  //                 'anotherBlock__element__childElement ' +
  //                 'anotherBlock__element__childElement--isAvailable',
  //       },
  //       {
  //         bemmerArgs: ['block', 'externalBlock', 'anotherBlock'],
  //         builderArgs: ['__element__childElement', { isAvailable: true, ignoreMe: false }],
  //         expect: 'block__element__childElement ' +
  //                 'block__element__childElement--isAvailable ' +
  //                 'externalBlock__element__childElement ' +
  //                 'externalBlock__element__childElement--isAvailable ' +
  //                 'anotherBlock__element__childElement ' +
  //                 'anotherBlock__element__childElement--isAvailable',
  //       },
  //     ];
  //
  //     testProps.forEach((prop) => {
  //       const b = bemmer.apply(null, prop.bemmerArgs);
  //       const className = b.apply(null, prop.builderArgs);
  //
  //       expect(className).to.eql(prop.expect);
  //     });
  //   });
  //
  //   it('should split arguments with whitespaces', () => {
  //     const testProps = [
  //       {
  //         bemmerArgs: ['block', 'externalBlock anotherBlock'],
  //         builderArgs: ['__element__childElement', { isAvailable: true }],
  //         expect: 'block__element__childElement ' +
  //                 'block__element__childElement--isAvailable ' +
  //                 'externalBlock__element__childElement ' +
  //                 'externalBlock__element__childElement--isAvailable ' +
  //                 'anotherBlock__element__childElement ' +
  //                 'anotherBlock__element__childElement--isAvailable',
  //       },
  //       {
  //         bemmerArgs: ['block', 'exter nalBlock anoth erBlock'],
  //         builderArgs: ['__element__childElement', { isAvailable: true }],
  //         expect: 'block__element__childElement ' +
  //                 'block__element__childElement--isAvailable ' +
  //                 'exter__element__childElement ' +
  //                 'exter__element__childElement--isAvailable ' +
  //                 'nalBlock__element__childElement ' +
  //                 'nalBlock__element__childElement--isAvailable ' +
  //                 'anoth__element__childElement ' +
  //                 'anoth__element__childElement--isAvailable ' +
  //                 'erBlock__element__childElement ' +
  //                 'erBlock__element__childElement--isAvailable',
  //       },
  //     ];
  //
  //     testProps.forEach((prop) => {
  //       const b = bemmer.apply(null, prop.bemmerArgs);
  //       const className = b.apply(null, prop.builderArgs);
  //
  //       expect(className).to.eql(prop.expect);
  //     });
  //   });
  //
  //   it('should ignore empty string arguments', () => {
  //     const testProps = [
  //       {
  //         bemmerArgs: ['block', '   externalBlock anotherBlock'],
  //         builderArgs: ['__element__childElement', { isAvailable: true }],
  //         expect: 'block__element__childElement ' +
  //                 'block__element__childElement--isAvailable ' +
  //                 'externalBlock__element__childElement ' +
  //                 'externalBlock__element__childElement--isAvailable ' +
  //                 'anotherBlock__element__childElement ' +
  //                 'anotherBlock__element__childElement--isAvailable',
  //       },
  //       {
  //         bemmerArgs: ['block  ', '  externalBlock   anotherBlock     '],
  //         builderArgs: ['__element__childElement', { isAvailable: true }],
  //         expect: 'block__element__childElement ' +
  //                 'block__element__childElement--isAvailable ' +
  //                 'externalBlock__element__childElement ' +
  //                 'externalBlock__element__childElement--isAvailable ' +
  //                 'anotherBlock__element__childElement ' +
  //                 'anotherBlock__element__childElement--isAvailable',
  //       },
  //       {
  //         bemmerArgs: ['block  ', 'externalBlock', ' '],
  //         builderArgs: ['__element__childElement', { isAvailable: true }],
  //         expect: 'block__element__childElement ' +
  //                 'block__element__childElement--isAvailable ' +
  //                 'externalBlock__element__childElement ' +
  //                 'externalBlock__element__childElement--isAvailable',
  //       },
  //       {
  //         bemmerArgs: ['block  ', ' ', 'externalBlock', '     '],
  //         builderArgs: ['__element__childElement', { isAvailable: true }],
  //         expect: 'block__element__childElement ' +
  //                 'block__element__childElement--isAvailable ' +
  //                 'externalBlock__element__childElement ' +
  //                 'externalBlock__element__childElement--isAvailable',
  //       },
  //     ];
  //
  //     testProps.forEach((prop) => {
  //       const b = bemmer.apply(null, prop.bemmerArgs);
  //       const className = b.apply(null, prop.builderArgs);
  //
  //       expect(className).to.eql(prop.expect);
  //     });
  //   });
  //
  //   it('should ignore no-string arguments', () => {
  //     const testProps = [
  //       {
  //         bemmerArgs: ['block', undefined, 'externalBlock', null],
  //         builderArgs: ['__element__childElement', { isAvailable: true }],
  //         expect: 'block__element__childElement ' +
  //                 'block__element__childElement--isAvailable ' +
  //                 'externalBlock__element__childElement ' +
  //                 'externalBlock__element__childElement--isAvailable',
  //       },
  //       {
  //         bemmerArgs: ['block  ', '  externalBlock   anotherBlock     '],
  //         builderArgs: ['__element__childElement', { isAvailable: true }],
  //         expect: 'block__element__childElement ' +
  //                 'block__element__childElement--isAvailable ' +
  //                 'externalBlock__element__childElement ' +
  //                 'externalBlock__element__childElement--isAvailable ' +
  //                 'anotherBlock__element__childElement ' +
  //                 'anotherBlock__element__childElement--isAvailable',
  //       },
  //       {
  //         bemmerArgs: ['block  ', 'externalBlock', ' '],
  //         builderArgs: ['__element__childElement', { isAvailable: true }],
  //         expect: 'block__element__childElement ' +
  //                 'block__element__childElement--isAvailable ' +
  //                 'externalBlock__element__childElement ' +
  //                 'externalBlock__element__childElement--isAvailable',
  //       },
  //       {
  //         bemmerArgs: ['block  ', ' ', 'externalBlock', '     '],
  //         builderArgs: ['__element__childElement', { isAvailable: true }],
  //         expect: 'block__element__childElement ' +
  //                 'block__element__childElement--isAvailable ' +
  //                 'externalBlock__element__childElement ' +
  //                 'externalBlock__element__childElement--isAvailable',
  //       },
  //     ];
  //
  //     testProps.forEach((prop) => {
  //       const b = bemmer.apply(null, prop.bemmerArgs);
  //       const className = b.apply(null, prop.builderArgs);
  //
  //       expect(className).to.eql(prop.expect);
  //     });
  //   });
  // });
  //
  // // describe('bemmer()', () => {
  // //   it('ignore no-string or empty-string arguments', () => {
  // //     const testProps = [
  // //       {
  // //         args: ['block', 'externalBlock', 'anotherBlock'],
  // //         expect: ['block', 'externalBlock', 'anotherBlock'],
  // //       },
  // //       {
  // //         args: ['block', null, 'externalBlock', undefined],
  // //         expect: ['block', 'externalBlock'],
  // //       },
  // //       {
  // //         args: [23, new Date(), function() {}],
  // //         expect: [],
  // //       },
  // //       {
  // //         args: ['', ' ', '  '],
  // //         expect: [],
  // //       },
  // //     ];
  // //
  // //     testProps.forEach((prop) => {
  // //       const b = bemmer.apply(null, prop.args);
  // //       const blocks = b.bems.map((bem) => bem.block);
  // //
  // //       expect(blocks).to.eql(prop.expect);
  // //     });
  // //   });
  // //
  // //   it('should split arguments with whitespaces', () => {
  // //     const testProps = [
  // //       {
  // //         args: ['block', 'externalBlock anotherBlock', 'incomingBlock  lego'],
  // //         expect: ['block', 'externalBlock', 'anotherBlock', 'incomingBlock', 'lego'],
  // //       },
  // //     ];
  // //
  // //     testProps.forEach((prop) => {
  // //       const b = bemmer.apply(null, prop.args);
  // //       const blocks = b.bems.map((bem) => bem.block);
  // //
  // //       expect(blocks).to.eql(prop.expect);
  // //     });
  // //   });
  // //
  // //   it('should parsing elements and modifiers of arguments', () => {
  // //     const testProps = [
  // //       {
  // //         args: ['block', 'externalBlock__element', 'anotherBlock__element__grandson--isAvailable'],
  // //         expect: [
  // //           {
  // //             block: 'block',
  // //             elements: [],
  // //             modifiers: [],
  // //           },
  // //           {
  // //             block: 'externalBlock',
  // //             elements: ['element'],
  // //             modifiers: [],
  // //           },
  // //           {
  // //             block: 'anotherBlock',
  // //             elements: ['element', 'grandson'],
  // //             modifiers: ['isAvailable'],
  // //           },
  // //         ],
  // //       },
  // //       {
  // //         args: ['externalBlock__element', 'block anotherBlock__element__grandson--isAvailable'],
  // //         expect: [
  // //           {
  // //             block: 'externalBlock',
  // //             elements: ['element'],
  // //             modifiers: [],
  // //           },
  // //           {
  // //             block: 'block',
  // //             elements: [],
  // //             modifiers: [],
  // //           },
  // //           {
  // //             block: 'anotherBlock',
  // //             elements: ['element', 'grandson'],
  // //             modifiers: ['isAvailable'],
  // //           },
  // //         ],
  // //       },
  // //     ];
  // //
  // //     testProps.forEach((prop) => {
  // //       const b = bemmer.apply(null, prop.args);
  // //
  // //       expect(b.bems).to.eql(prop.expect);
  // //     });
  // //   });
  // // });
  // //
  // // describe('build()', () => {
  // //   it('should building classNames', () => {
  // //
  // //   });
  // // });
});

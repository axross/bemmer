const test = require('ava');
const bemmer = require('../distribution').default;

const ARGS = [
  /* eslint quote-props: 0 */
  [''],
  ['zzz'],
  ['zzz__yyy__xxx'],
  ['', { zzz: true }],
  ['zzz', { yyy: true }],
  ['zzz__yyy', { xxx: true }],
  ['zzz__yyy__xxx', { vvv: true, uuu: true }],
  ['zzz__yyy__xxx', { vvv: false, uuu: true }],
  ['zzz__111__xxx__222', { '333': true, vvv: true }],
];

const TESTCASES = [
  /* eslint max-len: 0 */
  {
    classnames: ['aaa'],
    expects: [
      'aaa',
      'aaa__zzz',
      'aaa__zzz__yyy__xxx',
      'aaa aaa--zzz',
      'aaa__zzz aaa__zzz--yyy',
      'aaa__zzz__yyy aaa__zzz__yyy--xxx',
      'aaa__zzz__yyy__xxx aaa__zzz__yyy__xxx--vvv aaa__zzz__yyy__xxx--uuu',
      'aaa__zzz__yyy__xxx aaa__zzz__yyy__xxx--uuu',
      'aaa__zzz__111__xxx__222 aaa__zzz__111__xxx__222--333 aaa__zzz__111__xxx__222--vvv',
    ],
  },
  {
    classnames: ['aaa__bbb'],
    expects: [
      'aaa__bbb',
      'aaa__bbb__zzz',
      'aaa__bbb__zzz__yyy__xxx',
      'aaa__bbb aaa__bbb--zzz',
      'aaa__bbb__zzz aaa__bbb__zzz--yyy',
      'aaa__bbb__zzz__yyy aaa__bbb__zzz__yyy--xxx',
      'aaa__bbb__zzz__yyy__xxx aaa__bbb__zzz__yyy__xxx--vvv aaa__bbb__zzz__yyy__xxx--uuu',
      'aaa__bbb__zzz__yyy__xxx aaa__bbb__zzz__yyy__xxx--uuu',
      'aaa__bbb__zzz__111__xxx__222 aaa__bbb__zzz__111__xxx__222--333 aaa__bbb__zzz__111__xxx__222--vvv',
    ],
  },
  {
    classnames: ['aaa__bbb--ccc'],
    expects: [
      'aaa__bbb aaa__bbb--ccc',
      'aaa__bbb__zzz aaa__bbb__zzz--ccc',
      'aaa__bbb__zzz__yyy__xxx aaa__bbb__zzz__yyy__xxx--ccc',
      'aaa__bbb aaa__bbb--ccc aaa__bbb--zzz',
      'aaa__bbb__zzz aaa__bbb__zzz--ccc aaa__bbb__zzz--yyy',
      'aaa__bbb__zzz__yyy aaa__bbb__zzz__yyy--ccc aaa__bbb__zzz__yyy--xxx',
      'aaa__bbb__zzz__yyy__xxx aaa__bbb__zzz__yyy__xxx--ccc aaa__bbb__zzz__yyy__xxx--vvv aaa__bbb__zzz__yyy__xxx--uuu',
      'aaa__bbb__zzz__yyy__xxx aaa__bbb__zzz__yyy__xxx--ccc aaa__bbb__zzz__yyy__xxx--uuu',
      'aaa__bbb__zzz__111__xxx__222 aaa__bbb__zzz__111__xxx__222--ccc aaa__bbb__zzz__111__xxx__222--333 aaa__bbb__zzz__111__xxx__222--vvv',
    ],
  },
  {
    classnames: ['aaa--bbb'],
    expects: [
      'aaa aaa--bbb',
      'aaa__zzz aaa__zzz--bbb',
      'aaa__zzz__yyy__xxx aaa__zzz__yyy__xxx--bbb',
      'aaa aaa--bbb aaa--zzz',
      'aaa__zzz aaa__zzz--bbb aaa__zzz--yyy',
      'aaa__zzz__yyy aaa__zzz__yyy--bbb aaa__zzz__yyy--xxx',
      'aaa__zzz__yyy__xxx aaa__zzz__yyy__xxx--bbb aaa__zzz__yyy__xxx--vvv aaa__zzz__yyy__xxx--uuu',
      'aaa__zzz__yyy__xxx aaa__zzz__yyy__xxx--bbb aaa__zzz__yyy__xxx--uuu',
      'aaa__zzz__111__xxx__222 aaa__zzz__111__xxx__222--bbb aaa__zzz__111__xxx__222--333 aaa__zzz__111__xxx__222--vvv',
    ],
  },
  {
    classnames: ['aaa bbb__ccc'],
    expects: [
      'aaa bbb__ccc',
      'aaa__zzz bbb__ccc__zzz',
      'aaa__zzz__yyy__xxx bbb__ccc__zzz__yyy__xxx',
      'aaa aaa--zzz bbb__ccc bbb__ccc--zzz',
      'aaa__zzz aaa__zzz--yyy bbb__ccc__zzz bbb__ccc__zzz--yyy',
      'aaa__zzz__yyy aaa__zzz__yyy--xxx bbb__ccc__zzz__yyy bbb__ccc__zzz__yyy--xxx',
      'aaa__zzz__yyy__xxx aaa__zzz__yyy__xxx--vvv aaa__zzz__yyy__xxx--uuu bbb__ccc__zzz__yyy__xxx bbb__ccc__zzz__yyy__xxx--vvv bbb__ccc__zzz__yyy__xxx--uuu',
      'aaa__zzz__yyy__xxx aaa__zzz__yyy__xxx--uuu bbb__ccc__zzz__yyy__xxx bbb__ccc__zzz__yyy__xxx--uuu',
      'aaa__zzz__111__xxx__222 aaa__zzz__111__xxx__222--333 aaa__zzz__111__xxx__222--vvv bbb__ccc__zzz__111__xxx__222 bbb__ccc__zzz__111__xxx__222--333 bbb__ccc__zzz__111__xxx__222--vvv',
    ],
  },
  {
    classnames: ['aaa bbb--ccc'],
    expects: [
      'aaa bbb bbb--ccc',
      'aaa__zzz bbb__zzz bbb__zzz--ccc',
      'aaa__zzz__yyy__xxx bbb__zzz__yyy__xxx bbb__zzz__yyy__xxx--ccc',
      'aaa aaa--zzz bbb bbb--ccc bbb--zzz',
      'aaa__zzz aaa__zzz--yyy bbb__zzz bbb__zzz--ccc bbb__zzz--yyy',
      'aaa__zzz__yyy aaa__zzz__yyy--xxx bbb__zzz__yyy bbb__zzz__yyy--ccc bbb__zzz__yyy--xxx',
      'aaa__zzz__yyy__xxx aaa__zzz__yyy__xxx--vvv aaa__zzz__yyy__xxx--uuu bbb__zzz__yyy__xxx bbb__zzz__yyy__xxx--ccc bbb__zzz__yyy__xxx--vvv bbb__zzz__yyy__xxx--uuu',
      'aaa__zzz__yyy__xxx aaa__zzz__yyy__xxx--uuu bbb__zzz__yyy__xxx bbb__zzz__yyy__xxx--ccc bbb__zzz__yyy__xxx--uuu',
      'aaa__zzz__111__xxx__222 aaa__zzz__111__xxx__222--333 aaa__zzz__111__xxx__222--vvv bbb__zzz__111__xxx__222 bbb__zzz__111__xxx__222--ccc bbb__zzz__111__xxx__222--333 bbb__zzz__111__xxx__222--vvv',
    ],
  },
  {
    classnames: ['aaa__bbb ccc--ddd'],
    expects: [
      'aaa__bbb ccc ccc--ddd',
      'aaa__bbb__zzz ccc__zzz ccc__zzz--ddd',
      'aaa__bbb__zzz__yyy__xxx ccc__zzz__yyy__xxx ccc__zzz__yyy__xxx--ddd',
      'aaa__bbb aaa__bbb--zzz ccc ccc--ddd ccc--zzz',
      'aaa__bbb__zzz aaa__bbb__zzz--yyy ccc__zzz ccc__zzz--ddd ccc__zzz--yyy',
      'aaa__bbb__zzz__yyy aaa__bbb__zzz__yyy--xxx ccc__zzz__yyy ccc__zzz__yyy--ddd ccc__zzz__yyy--xxx',
      'aaa__bbb__zzz__yyy__xxx aaa__bbb__zzz__yyy__xxx--vvv aaa__bbb__zzz__yyy__xxx--uuu ccc__zzz__yyy__xxx ccc__zzz__yyy__xxx--ddd ccc__zzz__yyy__xxx--vvv ccc__zzz__yyy__xxx--uuu',
      'aaa__bbb__zzz__yyy__xxx aaa__bbb__zzz__yyy__xxx--uuu ccc__zzz__yyy__xxx ccc__zzz__yyy__xxx--ddd ccc__zzz__yyy__xxx--uuu',
      'aaa__bbb__zzz__111__xxx__222 aaa__bbb__zzz__111__xxx__222--333 aaa__bbb__zzz__111__xxx__222--vvv ccc__zzz__111__xxx__222 ccc__zzz__111__xxx__222--ddd ccc__zzz__111__xxx__222--333 ccc__zzz__111__xxx__222--vvv',
    ],
  },
  {
    classnames: ['aaa__bbb__ccc--ddd eee--fff'],
    expects: [
      'aaa__bbb__ccc aaa__bbb__ccc--ddd eee eee--fff',
      'aaa__bbb__ccc__zzz aaa__bbb__ccc__zzz--ddd eee__zzz eee__zzz--fff',
      'aaa__bbb__ccc__zzz__yyy__xxx aaa__bbb__ccc__zzz__yyy__xxx--ddd eee__zzz__yyy__xxx eee__zzz__yyy__xxx--fff',
      'aaa__bbb__ccc aaa__bbb__ccc--ddd aaa__bbb__ccc--zzz eee eee--fff eee--zzz',
      'aaa__bbb__ccc__zzz aaa__bbb__ccc__zzz--ddd aaa__bbb__ccc__zzz--yyy eee__zzz eee__zzz--fff eee__zzz--yyy',
      'aaa__bbb__ccc__zzz__yyy aaa__bbb__ccc__zzz__yyy--ddd aaa__bbb__ccc__zzz__yyy--xxx eee__zzz__yyy eee__zzz__yyy--fff eee__zzz__yyy--xxx',
      'aaa__bbb__ccc__zzz__yyy__xxx aaa__bbb__ccc__zzz__yyy__xxx--ddd aaa__bbb__ccc__zzz__yyy__xxx--vvv aaa__bbb__ccc__zzz__yyy__xxx--uuu eee__zzz__yyy__xxx eee__zzz__yyy__xxx--fff eee__zzz__yyy__xxx--vvv eee__zzz__yyy__xxx--uuu',
      'aaa__bbb__ccc__zzz__yyy__xxx aaa__bbb__ccc__zzz__yyy__xxx--ddd aaa__bbb__ccc__zzz__yyy__xxx--uuu eee__zzz__yyy__xxx eee__zzz__yyy__xxx--fff eee__zzz__yyy__xxx--uuu',
      'aaa__bbb__ccc__zzz__111__xxx__222 aaa__bbb__ccc__zzz__111__xxx__222--ddd aaa__bbb__ccc__zzz__111__xxx__222--333 aaa__bbb__ccc__zzz__111__xxx__222--vvv eee__zzz__111__xxx__222 eee__zzz__111__xxx__222--fff eee__zzz__111__xxx__222--333 eee__zzz__111__xxx__222--vvv',
    ],
  },
  {
    classnames: ['aaa__bbb--ccc ddd--ccc eee'],
    expects: [
      'aaa__bbb aaa__bbb--ccc ddd ddd--ccc eee',
      'aaa__bbb__zzz aaa__bbb__zzz--ccc ddd__zzz ddd__zzz--ccc eee__zzz',
      'aaa__bbb__zzz__yyy__xxx aaa__bbb__zzz__yyy__xxx--ccc ddd__zzz__yyy__xxx ddd__zzz__yyy__xxx--ccc eee__zzz__yyy__xxx',
      'aaa__bbb aaa__bbb--ccc aaa__bbb--zzz ddd ddd--ccc ddd--zzz eee eee--zzz',
      'aaa__bbb__zzz aaa__bbb__zzz--ccc aaa__bbb__zzz--yyy ddd__zzz ddd__zzz--ccc ddd__zzz--yyy eee__zzz eee__zzz--yyy',
      'aaa__bbb__zzz__yyy aaa__bbb__zzz__yyy--ccc aaa__bbb__zzz__yyy--xxx ddd__zzz__yyy ddd__zzz__yyy--ccc ddd__zzz__yyy--xxx eee__zzz__yyy eee__zzz__yyy--xxx',
      'aaa__bbb__zzz__yyy__xxx aaa__bbb__zzz__yyy__xxx--ccc aaa__bbb__zzz__yyy__xxx--vvv aaa__bbb__zzz__yyy__xxx--uuu ddd__zzz__yyy__xxx ddd__zzz__yyy__xxx--ccc ddd__zzz__yyy__xxx--vvv ddd__zzz__yyy__xxx--uuu eee__zzz__yyy__xxx eee__zzz__yyy__xxx--vvv eee__zzz__yyy__xxx--uuu',
      'aaa__bbb__zzz__yyy__xxx aaa__bbb__zzz__yyy__xxx--ccc aaa__bbb__zzz__yyy__xxx--uuu ddd__zzz__yyy__xxx ddd__zzz__yyy__xxx--ccc ddd__zzz__yyy__xxx--uuu eee__zzz__yyy__xxx eee__zzz__yyy__xxx--uuu',
      'aaa__bbb__zzz__111__xxx__222 aaa__bbb__zzz__111__xxx__222--ccc aaa__bbb__zzz__111__xxx__222--333 aaa__bbb__zzz__111__xxx__222--vvv ddd__zzz__111__xxx__222 ddd__zzz__111__xxx__222--ccc ddd__zzz__111__xxx__222--333 ddd__zzz__111__xxx__222--vvv eee__zzz__111__xxx__222 eee__zzz__111__xxx__222--333 eee__zzz__111__xxx__222--vvv',
    ],
  },
  {
    classnames: ['aaa', 'bbb', 'ccc--ddd'],
    expects: [
      'aaa bbb ccc ccc--ddd',
      'aaa__zzz bbb__zzz ccc__zzz ccc__zzz--ddd',
      'aaa__zzz__yyy__xxx bbb__zzz__yyy__xxx ccc__zzz__yyy__xxx ccc__zzz__yyy__xxx--ddd',
      'aaa aaa--zzz bbb bbb--zzz ccc ccc--ddd ccc--zzz',
      'aaa__zzz aaa__zzz--yyy bbb__zzz bbb__zzz--yyy ccc__zzz ccc__zzz--ddd ccc__zzz--yyy',
      'aaa__zzz__yyy aaa__zzz__yyy--xxx bbb__zzz__yyy bbb__zzz__yyy--xxx ccc__zzz__yyy ccc__zzz__yyy--ddd ccc__zzz__yyy--xxx',
      'aaa__zzz__yyy__xxx aaa__zzz__yyy__xxx--vvv aaa__zzz__yyy__xxx--uuu bbb__zzz__yyy__xxx bbb__zzz__yyy__xxx--vvv bbb__zzz__yyy__xxx--uuu ccc__zzz__yyy__xxx ccc__zzz__yyy__xxx--ddd ccc__zzz__yyy__xxx--vvv ccc__zzz__yyy__xxx--uuu',
      'aaa__zzz__yyy__xxx aaa__zzz__yyy__xxx--uuu bbb__zzz__yyy__xxx bbb__zzz__yyy__xxx--uuu ccc__zzz__yyy__xxx ccc__zzz__yyy__xxx--ddd ccc__zzz__yyy__xxx--uuu',
      'aaa__zzz__111__xxx__222 aaa__zzz__111__xxx__222--333 aaa__zzz__111__xxx__222--vvv bbb__zzz__111__xxx__222 bbb__zzz__111__xxx__222--333 bbb__zzz__111__xxx__222--vvv ccc__zzz__111__xxx__222 ccc__zzz__111__xxx__222--ddd ccc__zzz__111__xxx__222--333 ccc__zzz__111__xxx__222--vvv',
    ],
  },
  {
    classnames: ['aaa bbb__ccc', undefined],
    expects: [
      'aaa bbb__ccc',
      'aaa__zzz bbb__ccc__zzz',
      'aaa__zzz__yyy__xxx bbb__ccc__zzz__yyy__xxx',
      'aaa aaa--zzz bbb__ccc bbb__ccc--zzz',
      'aaa__zzz aaa__zzz--yyy bbb__ccc__zzz bbb__ccc__zzz--yyy',
      'aaa__zzz__yyy aaa__zzz__yyy--xxx bbb__ccc__zzz__yyy bbb__ccc__zzz__yyy--xxx',
      'aaa__zzz__yyy__xxx aaa__zzz__yyy__xxx--vvv aaa__zzz__yyy__xxx--uuu bbb__ccc__zzz__yyy__xxx bbb__ccc__zzz__yyy__xxx--vvv bbb__ccc__zzz__yyy__xxx--uuu',
      'aaa__zzz__yyy__xxx aaa__zzz__yyy__xxx--uuu bbb__ccc__zzz__yyy__xxx bbb__ccc__zzz__yyy__xxx--uuu',
      'aaa__zzz__111__xxx__222 aaa__zzz__111__xxx__222--333 aaa__zzz__111__xxx__222--vvv bbb__ccc__zzz__111__xxx__222 bbb__ccc__zzz__111__xxx__222--333 bbb__ccc__zzz__111__xxx__222--vvv',
    ],
  },
  {
    classnames: ['aaa bbb__zzz', undefined],
    expects: [
      'aaa bbb__zzz',
      'aaa__zzz bbb__zzz__zzz',
      'aaa__zzz__yyy__xxx bbb__zzz__zzz__yyy__xxx',
      'aaa aaa--zzz bbb__zzz bbb__zzz--zzz',
      'aaa__zzz aaa__zzz--yyy bbb__zzz__zzz bbb__zzz__zzz--yyy',
      'aaa__zzz__yyy aaa__zzz__yyy--xxx bbb__zzz__zzz__yyy bbb__zzz__zzz__yyy--xxx',
      'aaa__zzz__yyy__xxx aaa__zzz__yyy__xxx--vvv aaa__zzz__yyy__xxx--uuu bbb__zzz__zzz__yyy__xxx bbb__zzz__zzz__yyy__xxx--vvv bbb__zzz__zzz__yyy__xxx--uuu',
      'aaa__zzz__yyy__xxx aaa__zzz__yyy__xxx--uuu bbb__zzz__zzz__yyy__xxx bbb__zzz__zzz__yyy__xxx--uuu',
      'aaa__zzz__111__xxx__222 aaa__zzz__111__xxx__222--333 aaa__zzz__111__xxx__222--vvv bbb__zzz__zzz__111__xxx__222 bbb__zzz__zzz__111__xxx__222--333 bbb__zzz__zzz__111__xxx__222--vvv',
    ],
  },
];

TESTCASES.forEach((testcase, i) => {
  const builder = bemmer.createBuilder(...testcase.classnames);

  ARGS.forEach((args, j) => {
    const result = bemmer.createBuilder(builder(...args))();

    test(`builder() returns correct classname string #${i + 1}-${j + 1}`, t => {
      t.is(result, testcase.expects[j]);
    });
  });
});

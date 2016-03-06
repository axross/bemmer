const test = require('ava');
const bemmer = require('../sources');

const TEST_INPUTS = [
  ['__zzz', { yyy: true }],
  ['__zzz__yyy', { xxx: true, www: false }],
  ['', { zzz: true }],
  ['__zzz'],
  ['__zzz_yyy', { xxx: true }],
  []
];

test('bemmer.createBuilder() #1', t => {
  const b = bemmer.createBuilder('aaa');
  const expected = [
    'aaa__zzz aaa__zzz--yyy',
    'aaa__zzz__yyy aaa__zzz__yyy--xxx',
    'aaa aaa--zzz',
    'aaa__zzz',
    'aaa__zzz_yyy aaa__zzz_yyy--xxx',
    'aaa'
  ];

  t.plan(TEST_INPUTS.length);

  TEST_INPUTS.forEach((input, i) => {
    t.is(b(...input), expected[i]);
  });
});

test('bemmer.createBuilder() #2', t => {
  const b = bemmer.createBuilder('aaa__bbb--ccc');
  const expected = [
    'aaa__bbb__zzz aaa__bbb__zzz--ccc aaa__bbb__zzz--yyy',
    'aaa__bbb__zzz__yyy aaa__bbb__zzz__yyy--ccc aaa__bbb__zzz__yyy--xxx',
    'aaa__bbb aaa__bbb--ccc aaa__bbb--zzz',
    'aaa__bbb__zzz aaa__bbb__zzz--ccc',
    'aaa__bbb__zzz_yyy aaa__bbb__zzz_yyy--ccc aaa__bbb__zzz_yyy--xxx',
    'aaa__bbb aaa__bbb--ccc'
  ];

  t.plan(TEST_INPUTS.length);

  TEST_INPUTS.forEach((input, i) => {
    t.is(b(...input), expected[i]);
  });
});

test('bemmer.createBuilder() #3', t => {
  const b = bemmer.createBuilder('aaa__bbb ccc');
  const expected = [
    'aaa__bbb__zzz aaa__bbb__zzz--yyy ccc__zzz ccc__zzz--yyy',
    'aaa__bbb__zzz__yyy aaa__bbb__zzz__yyy--xxx ccc__zzz__yyy ccc__zzz__yyy--xxx',
    'aaa__bbb aaa__bbb--zzz ccc ccc--zzz',
    'aaa__bbb__zzz ccc__zzz',
    'aaa__bbb__zzz_yyy aaa__bbb__zzz_yyy--xxx ccc__zzz_yyy ccc__zzz_yyy--xxx',
    'aaa__bbb ccc'
  ];

  t.plan(TEST_INPUTS.length);

  TEST_INPUTS.forEach((input, i) => {
    t.is(b(...input), expected[i]);
  });
});

test('bemmer.createBuilder() #4', t => {
  const b = bemmer.createBuilder('aaa__bbb aaa__bbb--ccc ddd ddd--ccc');
  const expected = [
    'aaa__bbb__zzz aaa__bbb__zzz--yyy aaa__bbb__zzz--ccc ddd__zzz ddd__zzz--yyy ddd__zzz--ccc',
    'aaa__bbb__zzz__yyy aaa__bbb__zzz__yyy--xxx aaa__bbb__zzz__yyy--ccc ddd__zzz__yyy ddd__zzz__yyy--xxx ddd__zzz__yyy--ccc',
    'aaa__bbb aaa__bbb--zzz aaa__bbb--ccc ddd ddd--zzz ddd--ccc',
    'aaa__bbb__zzz aaa__bbb__zzz--ccc ddd__zzz ddd__zzz--ccc',
    'aaa__bbb__zzz_yyy aaa__bbb__zzz_yyy--xxx aaa__bbb__zzz_yyy--ccc ddd__zzz_yyy ddd__zzz_yyy--xxx ddd__zzz_yyy--ccc',
    'aaa__bbb aaa__bbb--ccc ddd ddd--ccc'
  ];

  t.plan(TEST_INPUTS.length);

  TEST_INPUTS.forEach((input, i) => {
    t.is(b(...input), expected[i]);
  });
});

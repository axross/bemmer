// require hook
require('babel-register');

const test = require('ava');
const { Bem } = require('../sources');

test('#constructor() rejects when params is invalid', t => {
  const invalidFuncs = [
    () => new Bem({
      block: undefined,
      elements: ['element', 'childElement'],
      modifiers: ['modifier', 'secondModifier'],
    }),
    () => new Bem({
      block: 'block',
      elements: 'element',
      modifiers: ['modifier', 'secondModifier'],
    }),
    () => new Bem({
      block: 'block',
      elements: [123, 456],
      modifiers: ['modifier', 'secondModifier'],
    }),
    () => new Bem({
      block: 'block',
      elements: [null, null],
      modifiers: ['modifier', 'secondModifier'],
    }),
    () => new Bem({
      block: 'block',
      elements: ['element', 'childElement'],
      modifiers: [new Date(), new Date()],
    }),
    () => new Bem({
      block: 'block',
      elements: ['element', 'childElement'],
      modifiers: [true, false],
    }),
    () => new Bem({
      block: '__block',
      elements: ['element', 'childElement'],
      modifiers: ['modifier', 'secondModifier'],
    }),
    () => new Bem({
      block: '--block',
      elements: ['element', 'childElement'],
      modifiers: ['modifier', 'secondModifier'],
    }),
    () => new Bem({
      block: 'block',
      elements: ['__element', 'childElement'],
      modifiers: ['modifier', 'secondModifier'],
    }),
    () => new Bem({
      block: 'block',
      elements: ['element', 'childElement'],
      modifiers: ['--modifier', 'secondModifier'],
    }),
  ];

  t.plan(invalidFuncs.length);
  invalidFuncs.forEach(func => t.throws(func));
});

test('#constructor() returns an instance', t => {
  t.true(new Bem({
    block: 'block',
    elements: ['element', 'childElement'],
    modifiers: ['modifier', 'secondModifier'],
  }) instanceof Bem);

  t.true(new Bem({
    block: 'block',
    elements: ['element'],
    modifiers: [],
  }) instanceof Bem);

  t.true(new Bem({
    block: '',
    elements: [],
    modifiers: [],
  }) instanceof Bem);
});

test('#toString() returns a string', t => {
  t.is(new Bem({
    block: 'block',
    elements: ['element', 'childElement'],
    modifiers: ['modifier', 'secondModifier'],
  }).toString(), 'block__element__childElement block__element__childElement--modifier block__element__childElement--secondModifier');

  t.is(new Bem({
    block: 'block',
    elements: ['element'],
    modifiers: [],
  }).toString(), 'block__element');

  t.is(new Bem({
    block: '',
    elements: [],
    modifiers: [],
  }).toString(), '');
});

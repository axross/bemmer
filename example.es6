import bemmer from './src/bemmer';

const c = bemmer('aaa', 'bbb', undefined, '');

console.log(c('__el__elm', { isActive: true, isDisable: false }));

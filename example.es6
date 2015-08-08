import bemmer from './src/bemmer';

const c = bemmer('todoList', 'externalClassName');

console.log(c('__items'));
// => "todoList__items externalClassName__items"

console.log(c('__items__item', { isFinished: true }));
// => "todoList__items__item--isFinished externalClassName__items__item--isFinished"

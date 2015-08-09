import bemmer from './src/bemmer';

const b = bemmer('todoList', 'externalClassName');

console.log(b('__items'));
// => "todoList__items externalClassName__items"

console.log(b('__items__item', { isFinished: true }));
// => "todoList__items__item--isFinished externalClassName__items__item--isFinished"

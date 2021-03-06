const bemmer = require('./distributions');

const builder = bemmer.createBuilder('todoList', 'externalClassName');

console.log(builder('__items'));
// => "todoList__items externalClassName__items"

console.log(builder('__items__item', { finished: true }));
// => "todoList__items__item todoList__items__item--finished" +
//    "externalClassName__items__item externalClassName__items__item--finished"

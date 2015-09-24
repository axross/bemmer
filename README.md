Bemmer
================================

[BEM](https://en.bem.info/)-like simple classname builder.

[![npm version](https://badge.fury.io/js/bemmer.svg)](http://badge.fury.io/js/bemmer)
[![Circle CI](https://circleci.com/gh/axross/bemmer/tree/master.svg?style=svg&circle-token=456c6ed1164374fa5fc15e20e20be41ebefddbe6)](https://circleci.com/gh/axross/bemmer/tree/stable)
[![Circle CI](https://circleci.com/gh/axross/bemmer/tree/master.svg?style=svg&circle-token=456c6ed1164374fa5fc15e20e20be41ebefddbe6)](https://circleci.com/gh/axross/bemmer/tree/master)
[![license](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)](LICENSE)

## Example

```javascript
import Bemmer from 'bemmer';

const builder = Bemmer.create('todoList', 'externalClassName');

builder('__items');
// => "todoList__items externalClassName__items"

builder('__items__item', { finished: true });
// => "todoList__items__item todoList__items__item--finished" +
//    "externalClassName__items__item externalClassName__items__item--finished"
```

### with React

```javascript
import Bemmer from 'bemmer';
import React from 'react';

const TodoList = React.createClass({
  render() {
    const builder = Bemmer.create('todoList', this.props.className);

    return (
      <div className={builder()}>
        <ul className={builder('__items')}>
          {this.props.items.map(item => <TodoListItem className={builder('__items__item')} item={item} />)}
        </ul>
      </div>
    );
  },
});

const TodoListItem = React.createClass({
  render() {
    const builder = Bemmer.create('todoListItem', this.props.className);

    return (
      <li className={builder(null, { finished: this.props.item.finished })}>
        {this.props.item.body}
      </li>
    );
  },
});
```

## Usage

Use with [Browserify](http://browserify.org/) or [webpack](http://webpack.github.io/).

```sh
$ npm i -S bemmer
```

```
import bemmer from 'bemmer';
```

## API

### Bemmer.create(className : string [, ...className : string])

Create "Class name builder".

```javascript
Bemmer.create('todoList');

Bemmer.create('todoListItem', this.props.className);

Bemmer.create('todoListItem todoListItem--finished');
```

We called it `builder`.

#### builder(elements : string, modifiers : object)

Building class name. `builder()` returns a string separated with whitespace. See this:

```javascript
const builder = Bemmer.create('aaa');

builder('__bbb', { odd: this.props.id % 2 === 1 });
// => "aaa__bbb" (and "aaa__bbb--odd" if id is odd)
```

```javascript
const builder = Bemmer.create('aaa', 'bbb__ccc');

builder('__ddd__eee', { fff: true });
// => "aaa__ddd__eee aaa__ddd__eee--fff bbb__ccc__ddd__eee bbb__ccc__ddd__eee--fff"

builder();
// => "aaa bbb__ccc"

builder('', { ddd: true });
// => "aaa bbb__ccc aaa--ddd bbb__ccc--ddd"
```

## License

MIT

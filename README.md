Bemmer
================================

[BEM](https://en.bem.info/)-like simple classname builder.

[![npm version](https://badge.fury.io/js/bemmer.svg)](http://badge.fury.io/js/bemmer)
[![Build Status](https://drone.io/github.com/axross/bemmer/status.png)](https://drone.io/github.com/axross/bemmer/latest)
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
          {this.props.items.map(item => <TodoListItem className={b('__items__item')} item={item} />)}
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

### Bemmer.create(className [, ...className])

Create "Class name builder".

```javascript
Bemmer.create('todoList');

Bemmer.create('todoListItem', this.props.className);

Bemmer.create('todoListItem todoListItem--finished');
```

We called it `builder`.

#### builder(elements, modifiers)

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
```

## License

MIT

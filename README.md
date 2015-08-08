bemmer
================================

The solution for your fetid CSS class name definition.

[![npm version](https://badge.fury.io/js/bemmer.svg)](http://badge.fury.io/js/bemmer)
[![Build Status](https://drone.io/github.com/axross/bemmer/status.png)](https://drone.io/github.com/axross/bemmer/latest)
![license](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)

## Example

```javascript
import bemmer from 'bemmer';

const c = bemmer('todoList', 'externalClassName');

c('__items');
// => "todoList__items externalClassName__items"

c('__items__item', { isFinished: true });
// => "todoList__items__item--isFinished externalClassName__items__item--isFinished"
```

### with React

```javascript
import bemmer from 'bemmer';
import React from 'react';

const c = bemmer('todoList');

const TodoList = React.createClass({
  propTypes: {
    items: React.PropTypes.arrayOf(React.PropTypes.string),
  },

  render() {
    return (
      <div className={c()}>
        <ul className={c('__items')}>
          {this.props.items.map(item => this.renderItem(item))}
        </ul>
      </div>
    );
  },

  renderItem(item) {
    return (
      <li className={c('__items__item')}>
        {item}
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

### bemmer(...classNames)

### builder

## License

MIT

bemmer
================================

[`bemmer`](https://github.com/axross/bemmer) is a [BEM](https://en.bem.info/)-like simple classname builder.

[![npm version](https://badge.fury.io/js/bemmer.svg)](http://badge.fury.io/js/bemmer)
[![Circle CI](https://circleci.com/gh/axross/bemmer/tree/master.svg?style=svg&circle-token=456c6ed1164374fa5fc15e20e20be41ebefddbe6)](https://circleci.com/gh/axross/bemmer/tree/master)
[![license](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)](LICENSE)

<img src="logo.jpg" alt="bemmer" width="640">

## Example

```javascript
const bemmer = require('bemmer');

const builder = Bemmer.createBuilder('todoList', 'externalClassName');

builder('__items');
// => "todoList__items externalClassName__items"

builder('__items__item', { finished: true });
// => "todoList__items__item todoList__items__item--finished" +
//    "externalClassName__items__item externalClassName__items__item--finished"
```

## Usage

Use with [Browserify](http://browserify.org/) or [webpack](http://webpack.github.io/).

```sh
$ npm i -S bemmer
```

```javascript
// ES2015 imports
import bemmer from 'bemmer';

// ES5 require
const bemmer = require('bemmer');
```

## API

- [bemmer.createBuilder](#bemmercreatebuilder)
- [builder](#builder)

### bemmer.createBuilder

```
createBuilder(classname: string [... classname: string]): function
```

Create a Builder function.

```javascript
const builder = Bemmer.createBuilder('todoList');

// can plural arguments, use with React
const builder = Bemmer.createBuilder('todoList', this.props.className);

// parse a BEM-like full classname
const builder = Bemmer.createBuilder('todoList__item--finished');
```

### builder

```
builder([elements :string [, modifiers :object]]): string
```

Build a BEM-like full classname. When result are plural class name, It joined with whitespace. (ex. `todoList__item externalClassName__item`)

```javascript
const builder = Bemmer.createBuilder('todoList', 'main__todoList');

builder('__item', { odd: true });
// => "todoList__item todoList__item--odd main__todoList__item main__todoList__item--odd"
```

#### Use with React

##### Component:

```javascript
const TodoList = React.createClass({
  render() {
    const b = Bemmer.createBuilder('todoList', this.props.className);
    const listItems = this.props.listItems.map((listItem, i) => {
      return (
        <li className={b('item', { odd: i % 2 === 1 })}>
          {listItem}
        </li>
      );
    });

    return (
      <ul className={b()}>
        {listItems}
      </ul>
    );
  },
});
```

##### Result:

```html
<ul className="todoList classNameFromProps">
  <li className="todoList__item todoList__item--odd classNameFromProps__item classNameFromProps__item--odd">
    aaa
  </li>

  <li className="todoList__item todoList__item--odd classNameFromProps__item classNameFromProps__item--odd">
    bbb
  </li>

  <li className="todoList__item todoList__item--odd classNameFromProps__item classNameFromProps__item--odd">
    ccc
  </li>
</ul>
```

## License

MIT

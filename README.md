Bemmer
================================

Bemmer can generate `className` attribute [React](http://facebook.github.io/react/) friendly, with write only a line.

[![npm version](https://badge.fury.io/js/bemmer.svg)](http://badge.fury.io/js/bemmer)
![test](https://circleci.com/gh/axross/bemmer.svg?style=shield&circle-token=01a654ef30887aa9b843dfa7ce264dc7d942d726)
![license](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)

## Example

#### JSX :

```jsx
import React  from 'react';
import Bemmer from 'bemmer';

export default React.createClass({
  getInitialState() {
    return { count: 0 };
  },

  _onClick() {
    this.setState({ this.state.count += 1 });
  },

  render() {
    var bemmer = new Bemmer('counter', this.props.className);
    var count  = this.state.count;

    return (
      <div className={className.getBlock()}>
        <a
          className={bemmer.el('button').mo('isOdd', count % 2 === 1)}
          onClick={this._onClick}
        >
          {this.state.count}
        </a>
      </div>
    );
  },
});
```

#### Output :

```html
<div class="counter">
  <a class="coutner__button counter__button--isOdd">3</a>
</div>
```

## Usage

Requirement Node.js, or Browser with [Browserify](http://browserify.org/) or [webpack](http://webpack.github.io/).

```sh
$ npm install --save bemmer
```

#### <= ES5 :

```js
var Bemmer = require('bemmer');
```

#### >= ES6 :

```js
import Bemmer from 'bemmer';
```

## API

### `new Bemmer(...classNames)`

```js
var bemmer = new Bemmer('myComponent');

// can plural arguments
var pluralBemmerA = new Bemmer('myComponent', this.props.classname);
var pluralBemmerB = new Bemmer('myComponent yourComponent', 'hisComponent');
```

#### `Bemmer#out()`

```js
var bemmer = new Bemmer('myComponent');

bemmer.out();
// => 'myComponent'

bemmer.element('button').out();
// => 'myComponent__button'
```

#### `Bemmer#element(elementName)`
#### `Bemmer#el(elementName)`

```js
var bemmer = new Bemmer('myComponent', 'yourComponent');

bemmer.element('button').out();
bemmer.el('button').out();
// => 'myComponent__button yourComponent__button'

bemmer.element('button').element('label').out();
bemmer.element('__button__label').out();
// => 'myComponent__button__label yourComponent__button__label'
```

#### `Bemmer#modifier(modifierName, isEnable)`
#### `Bemmer#mo(modifierName, isEnable)`

```js
var bemmer = new Bemmer('myComponent');

bemmer.element('button').modifier('isBlueColor').out();
bemmer.el('button').mo('isBlueColor').out();
// => 'myComponent__button myComponent__button--isBlueColor'

bemmer.element('button').modifier('isDisable', xxx.length === 0).out();
// => 'myComponent__button'
// or 'myComponent__button myComponent__button--isDisable'
```

#### `Bemmer#getBlock()`

```js
var bemmer = new Bemmer('myComponent');

bemmer.getBlock();
// => 'myComponent'

bemmer.element('button').getBlock();
// => 'myComponent'

var pluralBemmer = new Bemmer('myComponent', 'yourComponent hisComponent');

pluralBemmer.getBlock();
// => 'myComponent yourComponent hisComponent'
```

### `Bemmer.setElementPrefix(prefix)`

Change element prefix.

```js
Bemmer.setElementPrefix('_');

var bemmer = new Bemmer('block');

bemmer.element('button').out();
// => 'block_button'

Bemmer.setModifierPrefix(Bemmer.DEFAULT_ELEMENT_PREFIX);
// Set default element prefix.
```

### `Bemmer.setModifierPrefix(prefix)`

Change modifier prefix.

```js
Bemmer.setModifierPrefix('-');

var bemmer = new Bemmer('block');

bemmer.modifier('isActive').out();
// => 'block-isActive'

Bemmer.setModifierPrefix(Bemmer.DEFAULT_MODIFIER_PREFIX);
// Set default modifier prefix.
```

## License

MIT

[WIP] Bemmer.js
================================

Bemmer can generate `className` attribute for React, with write only a line.

[![npm version](https://badge.fury.io/js/bemmer.svg)](http://badge.fury.io/js/bemmer)
![test](https://circleci.com/gh/axross/bemmer.svg?style=shield&circle-token=01a654ef30887aa9b843dfa7ce264dc7d942d726)
![license](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)

## Example

#### JSX :

```es6
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
      <div className={className.root}>
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

## API

### `new Bemmer(...classNames)`

```es6
var bemmer = new Bemmer('myComponent');

// can plural arguments
var pluralBemmerA = new Bemmer('myComponent', this.props.classname);
var pluralBemmerB = new Bemmer('myComponent yourComponent', 'hisComponent');
```

#### `Bemmer#out()`

```es6
var bemmer = new Bemmer('myComponent');

bemmer.out();
// => 'myComponent'

bemmer.element('button').out();
// => 'myComponent__button'
```

#### `Bemmer#element(elementName)`

```es6
var bemmer = new Bemmer('myComponent', 'yourComponent');

bemmer.element('button').out();
// => 'myComponent__button yourComponent__button'

bemmer.element('button').element('label').out();
bemmer.element('__button__label').out();
// => 'myComponent__button__label yourComponent__button__label'
```

#### `Bemmer#modifier(modifierName)`

```es6
var bemmer = new Bemmer('myComponent');

bemmer.element('button').modifier('isBlueColor').out();
// => 'myComponent__button myComponent__button--isBlueColor'

bemmer.element('button').modifier('isDisable', this.state.xxx === 'abc').out();
// => 'myComponent__button'
// or 'myComponent__button myComponent__button--isDisable'
```

#### `Bemmer#root()`

```es6
var bemmer = new Bemmer('myComponent');

bemmer.root();
// => 'myComponent'

bemmer.element('button').root();
// => 'myComponent'

var pluralBemmer = new Bemmer('myComponent', 'yourComponent hisComponent');

bemmer.root();
// => 'myComponent yourComponent hisComponent'
```

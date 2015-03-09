[WIP] bemmer.js
================================

Class name generator for React.js with BEM.

[![npm version](https://badge.fury.io/js/bemmer.svg)](http://badge.fury.io/js/bemmer)
![test](https://circleci.com/gh/axross/bemmer.svg?style=shield&circle-token=01a654ef30887aa9b843dfa7ce264dc7d942d726)
![license](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)

## Usage

```jsx
import React from 'react';
import Bemmer from 'bemmer';

export default React.createClass({
  getInitialState() {
    return {
      count: 0,
    };
  },

  _onClick() {
    this.setState({ this.state.count += 1 });
  },

  render() {
    var className = new Bemmer('counter', this.props.className);
    var count = this.state.count;

    return (
      <div className={className.root}>
        <a
          className={className.el('button').st('isOdd', count % 2 === 1)}
          onClick={this._onClick}
        >
          {this.state.count}
        </a>
      </div>
    );
  },
});
```

#### in DOM :

```html
  <div class="counter">
    <a class="counter__button--isOdd">3</a>
  </div>
```

## API

### new Bemmer()

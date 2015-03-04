[WIP] bemmer.js
================================

Class name generator for React.js with BEM.

[![npm version](https://badge.fury.io/js/bemmer.svg)](http://badge.fury.io/js/bemmer)
![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)

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

## API

### new Bemmer()

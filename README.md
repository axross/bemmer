Bemmer
================================

The solution for your fetid CSS class name definition.

[![npm version](https://badge.fury.io/js/bemmer.svg)](http://badge.fury.io/js/bemmer)
[![Build Status](https://drone.io/github.com/axross/bemmer/status.png)](https://drone.io/github.com/axross/bemmer/latest)
![license](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)

## Example

```javascript
import bemmer from 'bemmer';

const c = bemmer('className', 'otherClassName');

c('__element');
// => "className__element otherClassName__element"

c('__element', { isModifier: true });
// => "className__element otherClassName__element className__element--isModifier otherClassName__element--isModifier"
```

## Usage

Use [Browserify](http://browserify.org/) or [webpack](http://webpack.github.io/).

```sh
$ npm i -S bemmer
```

## Usage/APIs

### bemmer(...block)

Get a class name generator.

```js
const c = bemmer('className');

const c = bemmer('className', this.props.className);  // with React
```

It can receive the plural arguments. It expects the Block of BEM.

```javascript
const c = bemmer('className', 'otherClassName');

c('__element');
// => "className__element otherClassName__element"

c('__element__otherElement');
// => "className__element__otherElement otherClassName__element__otherElement"
```

Class name generator is function. First argument expects the Element of BEM.

```javascript
const c = bemmer('className');

c('__element', { isModifier: true });
// => "className__element className__element--isModifier"

const num = Math.floor(Math.random() * 100);

c('__element', { isEven: num % 2 === 0 });
// => "className__element className__element--isEven"
// or only "className__element"
```

Second argument means the Modifier of BEM. It expects object. object's key means Modifier name and value means that is enable or not.

### bemmer.setElementPrefix(prefix)

Change Element prefix.

```javascript
bemmer.setElementPrefix('_-');

const c = bemmer('className');

c('__element');
// => "className_-element"

bemmer.setElementPrefix(bemmer.DEFAULT_ELEMENT_PREFIX);
// Reset element prefix to default.
```

### bemmer.setModifierPrefix(prefix)

Change Modifier prefix.

```js
bemmer.setModifierPrefix('$$');

var c = bemmer('className');

c(null, { isModifier: true });
// => "className className$$isModifier"

bemmer.setModifierPrefix(bemmer.DEFAULT_MODIFIER_PREFIX);
// Reset modifier prefix to default.
```

## Tests

```
npm i
npm test
```

## License

MIT

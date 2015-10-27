# redux-fsa-linter

[![npm package](https://img.shields.io/npm/v/redux-fsa-linter.svg?style=flat-square)](https://www.npmjs.org/package/redux-fsa-linter)
[![build status](https://img.shields.io/travis/maxmechanic/redux-fsa-linter/master.svg?style=flat-square)](https://travis-ci.org/maxmechanic/redux-fsa-linter)

Get feedback on the shape of your actions while developing.

![linting](https://cloud.githubusercontent.com/assets/1638576/10747152/5b05b3e2-7c28-11e5-9593-1f542a02c8f0.gif)

## Installation
```
npm install redux-fsa-linter --save-dev
```

## Usage
```js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLinter from 'redux-fsa-linter';

const linter = createLinter();

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  linter
)(createStore);
```

The middleware will ignore anything passing through it that is not a plain object.

By default, the linter will alert the user of non-compliant actions by way of console warnings. Passing `true` to the `createLinter` function will result in non-compliant actions throwing errors. 

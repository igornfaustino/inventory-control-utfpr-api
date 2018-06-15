# Inventory control UTFPR - Production guide

A quick guide to standardize the production of inventory control system of the 'Universidade Tecnologica Federal do Paraná'



## Introduction

This document contains a standard for how to write the codes as well as good practices for writing comments. It also contains how the branches in git will be organized

This project is separated in two github repositories, the [inventory-control-utfpr-api](https://github.com/igornfaustino/inventory-control-utfpr-api) is the back-end for this project, and the [inventory-control-utfpr](https://github.com/igornfaustino/inventory-control-utfpr) is the front-end repository

## Starter guide

To start code in the two repositories is needed to use this command in each one to install all the dependencies needed in each repository

### Installation

install all the dependencies

``` bash
$ npm i
```

or

``` bash
$ npm install
```

### run

#### Back-end

to run the project type the follow command

```bash
$ npm start
```

#### Front-end

to run the front-end project is the same from the back-end,  just type the follow command

```bash
$ npm start
```

### add a dependency

if you need to add a new dependency to this project, just use the npm flag -s or --save

```bash
$ npm install -s [package]
```

or 

``` bash
$ npm install --save [package]
```

### build

the node application don't need to be build, just run in the final server

to build the react code in the front repository just type the follow command

``` bash
$ npm run build
```

### Run test

To run the test suite in each repository just type the command

``` bash
$ npm test
```

## Folder structure

### back-end

the basic structure is

```
  inventory-control-utfpr-aoi
├── server.js
├── package.json
├── public/
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes/
│   ├── index.js
│   └── users.js
|   └── ...
├── models/
└── utils/
└── test/
└── config/
```

### front-end

the basic structure is

```
  inventory-control-utfpr
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   └── favicon.ico
│   └── index.html
│   └── manifest.json
└── src
    └── components/
    └── pages/
    └── utils/
    └── App.css
    └── App.js
    └── App.test.js
    └── index.css
    └── index.js
    └── logo.svg
    └── registerServiceWorker.js
```

#### Directory rule

As a general rule, if a module (a utility, component, etc.) is only used within another module, then I want it nested in the directory structure like so:

```
└── components/
    └── Button/
    └── Header/
        └── HeaderNav/
        └── Header.js
        └── Header.css
        └── Header.test.js
```

`<HeaderNav>` will only be referenced from within the `<Header>` component, so it lives as a child. A `<Button>` could be referenced from anywhere, so it lives at the top level.



## Code style

this whole project is written in js, although react uses a coolest version, this session is the same for both back and front code



#### Note

All the text in this project must be written in English

### names

Identifiers use only ASCII letters and digits, and, in a small number of cases noted below, underscores and very rarely (when required by frameworks like Angular) dollar signs.

Give as descriptive a name as possible, within reason. Do not worry about saving horizontal space as it is far more important to make your code immediately understandable by a new reader. Do not use abbreviations that are ambiguous or unfamiliar to readers outside your project, and do not abbreviate by deleting letters within a word.

``` javascript
var priceCountReader      // No abbreviation.
var numErrors             // "num" is a widespread convention.
var numDnsConnections     // Most people know what "DNS" stands for.
```



#### Package

Package names are all `lowerCamelCase`. For example, `my.exampleCode.deepSpace`, but not `my.examplecode.deepspace` or `my.example_code.deep_space`.



#### Class

Class, interface, record, and typedef names are written in `UpperCamelCase`

```javascript
class MyClass
```

#### Methods

Method names are written in `lowerCamelCase`. Private methods’ names must end with a trailing underscore.

#### Enum

Enum names must follow the `UpperCamelCase` 



#### Constant names

Constant names use `CONSTANT_CASE`: all uppercase letters, with words separated by underscores.

##### What is a constant?

Not every thing with the word `const` is a constant

``` javascript
// Constants
const NUMBER = 5;
/** @const */ exports.NAMES = ImmutableList.of('Ed', 'Ann');
/** @enum */ exports.SomeEnum = { ENUM_CONSTANT: 'value' };

// Not constants
let letVariable = 'non-const';
class MyClass { constructor() { /** @const */ this.nonStatic = 'non-static'; } };
/** @type {string} */ MyClass.staticButMutable = 'not @const, can be reassigned';
const /** Set<String> */ mutableCollection = new Set();
const /** ImmutableSet<SomeMutableType> */ mutableElements = ImmutableSet.of(mutable);
const Foo = goog.require('my.Foo');  // mirrors imported name
const logger = log.getLogger('loggers.are.not.immutable');
```



#### Other

All the others names like variables, parameters and other are written in the `lowerCamelCase`.



### Indentation

### Doc string

we will use [JSdoc](https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler) is used on all classes, fields, and methods.



``` javascript
/**
 * Multiple lines of JSDoc text are written here,
 * wrapped normally.
 * @param {number} arg A number to do something to.
 */
function doSomething(arg) { … }
```

or in this single-line example:

```javascript
/** @const @private {!Foo} A short bit of JSDoc. */
this.foo_ = foo;
```



#### create list in the JSdoc

use markdown to create a list

``` javascript
/**
 * Computes weight based on three factors:
 *  - items sent
 *  - items received
 *  - last timestamp
 */
```



#### JSDoc tags

Google style allows a subset of JSDoc tags. See [9.1 JSDoc tag reference](https://google.github.io/styleguide/jsguide.html#appendices-jsdoc-tag-reference) for the complete list.



Illegal:

``` javascript
/**
 * The "param" tag must occupy its own line and may not be combined.
 * @param {number} left @param {number} right
 */
function add(left, right) { ... }
```



Simple tags that do not require any additional data (such as `@private`, `@const`, `@final`, `@export`) may be combined onto the same line, along with an optional type when appropriate.



use this:

``` javascript
/**
 * Place more complex annotations (like "implements" and "template")
 * on their own lines.  Multiple simple tags (like "export" and "final")
 * may be combined in one line.
 * @export @final
 * @implements {Iterable<TYPE>}
 * @template TYPE
 */
class MyClass {
  /**
   * @param {!ObjType} obj Some object.
   * @param {number=} num An optional number.
   */
  constructor(obj, num = 42) {
    /** @private @const {!Array<!ObjType|number>} */
    this.data_ = [obj, num];
  }
}
```



#### Examples



Classes, interfaces and records must be documented with a description and any template parameters, implemented interfaces, visibility, or other appropriate tags. The class description should provide the reader with enough information to know how and when to use the class, as well as any additional considerations necessary to correctly use the class. Textual descriptions may be omitted on the constructor. `@constructor` and `@extends` annotations are not used with the `class` keyword unless the class is being used to declare an `@interface` or it extends a generic class.

``` javascript
/**
 * A fancier event target that does cool things.
 * @implements {Iterable<string>}
 */
class MyFancyTarget extends EventTarget {
  /**
   * @param {string} arg1 An argument that makes this more interesting.
   * @param {!Array<number>} arg2 List of numbers to be processed.
   */
  constructor(arg1, arg2) {
    // ...
  }
};

/**
 * Records are also helpful.
 * @extends {Iterator<TYPE>}
 * @record
 * @template TYPE
 */
class Listable {
  /** @return {TYPE} The next item in line to be returned. */
  next() {}
}
```


Parameter and return types must be documented. The `this` type should be documented when necessary. Method, parameter, and return descriptions (but not types) may be omitted if they are obvious from the rest of the method’s JSDoc or from its signature. Method descriptions should start with a sentence written in the third person declarative voice. If a method overrides a superclass method, it must include an `@override` annotation. Overridden methods must include all `@param` and `@return` annotations if any types are refined, but should omit them if the types are all the same.



``` javascript
/** This is a class. */
class SomeClass extends SomeBaseClass {
  /**
   * Operates on an instance of MyClass and returns something.
   * @param {!MyClass} obj An object that for some reason needs detailed
   *     explanation that spans multiple lines.
   * @param {!OtherClass} obviousOtherClass
   * @return {boolean} Whether something occurred.
   */
  someMethod(obj, obviousOtherClass) { ... }

  /** @override */
  overriddenMethod(param) { ... }
}

/**
 * Demonstrates how top-level functions follow the same rules.  This one
 * makes an array.
 * @param {TYPE} arg
 * @return {!Array<TYPE>}
 * @template TYPE
 */
function makeArray(arg) { ... }
```

Anonymous functions do not require JSDoc, though parameter types may be specified inline if the automatic type inference is insufficient.

 ```javascript
promise.then(
    (/** !Array<number|string> */ items) => {
      doSomethingWith(items);
      return /** @type {string} */ (items[0]);
    });
 ```



## Git Flow

At this project, we will be using the git flow approach with the continuous integration, powered by Travis CI

I personally recommend use a GitKraken application for this workflow

[git flow quick tutorial](https://www.youtube.com/watch?v=eTOgjQ9o4vQ)

### branches

basically, we will have some branches

#### Master

just have the release stable code

#### Develop

all the code will be written here, basically here all the features will be merged up and go for test in the Travis CI

#### Features

the features brunch will be use to create new features, once that feature is ready, will be merged into the develop brunch

all different feature have your only feature brunch. to know that a branch is for a specific feature the name style is like this

`feature/my-feature`

#### Release

after all the features are ready for the release, this branch will be created to the final work, to prepare the code for the release

Release names are the number of the release, like `release/1.0.0`

after the release is ready, this branch is merged into the master and the develop

#### Hotfix

hotfix is the branch to solve some issue that might occurred after the release

the name for this branch is like `hotfix/1.0.1`



### Comments

in a release, the master branch will be untouched until the end of the release, all the work will be done in isolated branches, one for each feature, and once that feature is done, will be merged into the develop branch. After all the features are done, the release branch will be create for the release comments, and something like that. Once the release are ready to go, the code will be merged into the master and the develop. at this point, the master and the develop branches are the same. after that, all the process are repeat.

## References

- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html#naming-rules-common-to-all-identifiers)
- [Express js](http://expressjs.com)
- [React js](https://reactjs.org)
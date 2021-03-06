linguistic.js
-
![version](http://img.shields.io/npm/v/linguistic.svg?style=flat)
![travis](https://travis-ci.org/chiefGui/linguistic.js.svg?branch=master)
![Downloads](http://img.shields.io/npm/dm/linguistic.svg?style=flat)
![Dependencies](https://david-dm.org/chiefgui/linguistic.js.svg?style=flat)
![license](http://img.shields.io/npm/l/linguistic.svg?style=flat)

A tiny, modular, dependency-free library to translate your web application on demand using the DOM as reference.

### Getting started

#### Installing

    npm install linguistic

Or you can use a script from the [`build/`](https://github.com/chiefGui/linguistic.js/tree/master/build) folder.

_Note: linguistic.js is compatible with CommonJS, AMD or window invokation._

#### Usage
**linguistic** is designed based on modularity thinking. It is unobtrusive and let you decide what convention you want to follow.

That being said, its flow is basically divided in four fragments, which are:

1. **A dictionary.** It is responsible to read a physical element and pull a text into it;
2. **A dictionaries collection.** It is responsible to route which dictionary will be used for which language;
3. **A handler.** It is responsible to handle the dictionaries;
4. **A translator.** It is responsible to, with the correct dictionaries, translate your application on demand.

Maybe you're scared, huh? But don't be — it's easier than you think. See the following example:

```js
var linguistic = require ('linguistic');

var pt = {
  'h1': 'Olá, mundo!',
  'h3': 'Como você está?'
};

var en = {
  'h1': 'Hello, world!',
  'h3': 'How do you do?'
};

var dictionaries = {
  'pt-BR': pt,
  'en-US': en
};

linguistic.handle(dictionaries).translate();
```

Looking deeper:

- `pt` is a `dictionary` for portuguese language (JavaScript object);
- `en` is a `dictionary` for english language (JavaScript object);
- `dictionaries` is a `dictionary` of languages (JavaScript object);

This will work based on a HTML like this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Linguisticjs Markup Demonstration</title>
</head>
<body>
  <h1>Bonjour le monde !</h1>
  <h3>Comment ça va ?</h3>
</body>
</html>
```


#### How does linguistic.js decide when to use `pt-BR` or `en-US`?

Under the hood, it uses [`navigator.language`](http://www.w3schools.com/jsref/prop_nav_language.asp) as its first criteria. In other words, it is primarily based on client's browser language. If you want to apply your own logic to handle the language that linguistic.js must to consider, feel free to do it through `.interpret()` method, such as:

```js
linguistic
  .interpret('pt-BR')
  .handle(dictionaries)
  .translate();
```

Of course, the example above is flat and probably you won't apply it — but you can, for instance, make something sharper depending of your need, like extracting the locale from URL. _Learn more further._

### Injecting complexity to your translations

Having this markup as example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Linguisticjs Markup Demonstration</title>
</head>
<body>
  <h1>Bonjour le <span class="target"></span> !</h1>
  <h3>Comment ça va ?</h3>
</body>
</html>
```

We can do:

```js
var linguistic = require ('linguistic');

var names = [];

function getRandom (matrix) {
  return matrix[Math.floor(Math.random() * matrix.length)];
};

var en = {
  'h1 span.target': function () {
    names = ['world', 'ninja'];
    return 'Hello, ' + getRandom(names) + '!';
  },
  'h3': 'How do you do?'
};

var pt = {
  'h1 span.target': function () {
    names = ['mundo', 'ninja'];
    return 'Olá, ' + getRandom(names) + '!';
  },
  'h3': 'Como você está?'
};

var dictionaries = {
  'en-US': en,
  'pt-BR': pt
};

linguistic.handle(dictionaries).translate();

```

You see? It's possible to use any element you want to get its string translated, also you are not limited to use only strings in the values of your dictionaries — functions are here to make all the logic you need and/or want.

### Dealing with pluralisation

There are two ways to work with pluralisations. The easy way:

```js
var en = {
  '.followers': [
    5,
    'No followers',
    'One follower',
    '%s followers'
  ]
};
```

Yes, simple as that: an array with four spaces!

-  The very first value should be the number to assert quantity;
- The second value should to be wether the value is 0;
- The third value should to be wether the value is 1;
- The fourth value should to be wether the value is 2 or plus.

Or, if you want to implement your own logic:

```js
var en = {
  '.followers': function () {
    var value = 5;

    if (value === 0) {
      return 'Nobody likes you. No followers.';
    };

    if (value === 1) {
      return 'One follower';
    };

    if (value > 1) {
      return value + ' followers';
    };

    if (value === 5) {
      return '5ive followers';
    };
  }
};
```

### Interface

#### .translate() : returns `void`
Applies a dictionary against the language the client is requesting.

```js
linguistic.translate();
```

Wether the element doesn't exist in your markup, linguistic will leave it untouchable. In other words, with its default value.

_Note: `translate` method depends of a handled dictionary. See the next topic._

#### .handle(Object) : returns `void`
It handles a compatible dictionary based on the client's language — which can be pre-defined through `.interpret()` or assuming the default criteria, that is `navigator.language` property.

```js
linguistic.handle(dictionaries);
```

#### .clientLanguage : is a `string`
Get the language linguistic is assuming to use.

```js
linguistic.clientLanguage;
```

#### .handleLanguage() : returns `void`
Handle the language client is using.

```js
linguistic.handleLanguage();
```

#### .setUsefulDictionary(Object) : returns `void`
It creates a `usefulDictionary` that is the one to be currently used based on your client's need.

```js
linguistic.setUsefulDictionary(dictionary);
```

#### .usefulDictionary : is an `object`
It is the property storing the dictionary in use. Basically, this is the chosen one to be applied into your client's interface based on his language.

```js
linguistic.usefulDictionary;
```

#### .getTranslation(String) : returns `string`
It retrieves a specific translation based on a specified parameter.

```js
linguistic.getTranslation('h1');
```

#### .parsePluralisation([Array]) : returns `string`
It will check for the very first value of its parameter (which is supposed to be an array) using `isSingular()` or `isPlural()` methods to determine wether string it should to return: [1] for emptiness; [2] for singular; [3] for plural.

```js
var matrix = [
  5,
  'No followers',
  '1 follower',
  '%s followers'
];

linguistic.parsePluralisation(matrix); // returns '5 followers'
```

_Note: `%s` is the same thing (value) of the first (`[0]`) position of your matrix. Only available to use in the fourth (`[3]`) position._

#### .isSingular(Number) : returns `boolean`

Check wether a number is or isn't singular. `1` is singular and `0` returns `false`.

```js
linguistic.isSingular(1); // returns true
```

#### .isPlural(Number) : returns `boolean`

Check wether a number is or isn't plural. `> 1` is plural and everything else returns `false`.

```js
linguistic.isPlural(3); // returns true
```

### The concept behind

Making a decoupled application is a goal that lots of developers has nowadays. Linguistic.js has born with an optimistic purpose: make the way you translate your application more modular and decoupled — keeping in the front-end what belongs to it.

As you can see, it is minimalistic and very easy to inject into your architecture, no matter if you are using Backbone, Ember, Angular or Vanilla JavaScript — you can go seamlessly.

#### What's the point using DOM as reference?

Translating what your client sees isn't responsibility of the back end. Hence, everything people sees in a web application belongs to elements: `<h1>`s, `<p>`s, `<div>`s, etc. So, why can't we use the DOM in our favor?

You can distribute your translations via an API, consume them via JavaScript and finally inject them into dictionaries to be rendered painlessly — all the hardwork belongs to linguistic and nobody else. Please, keep your focus on creating your HTML and translations — all other efforts are linguistic's!

### Contributing guidelines

If you want to improve linguistic in any way, please read our [CONTRIBUTING.md](https://github.com/chiefGui/linguistic.js/blob/master/CONTRIBUTING.md) document.

### Tests

To make the tests, we are using [Facebook's Jest](https://facebook.github.io/jest/). To proceed, please clone:

    git clone git@github.com:chiefGui/linguistic.js.git && cd linguistic.js

Then

    npm install && npm test

And you're good to go! :-)

### License

[MIT](https://github.com/chiefGui/linguistic.js/blob/master/LICENSE) &copy; 2015

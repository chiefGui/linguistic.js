linguistic.js
-
![version](http://img.shields.io/npm/v/linguistic.svg?style=flat)
![travis](https://travis-ci.org/chiefGui/linguistic.js.svg?branch=v0.0.1)
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

Looking deeper:

- `pt` is a `dictionary` for portuguese language (JavaScript object);
- `en` is a `dictionary` for english language (JavaScript object);
- `dictionaries` is a `dictionary` of languages (JavaScript object);

This will work based on a HTML like this:

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


#### How does linguistic.js decide when to use `pt-BR` or `en-US`?

Under the hood, it uses [`navigator.language`](http://www.w3schools.com/jsref/prop_nav_language.asp) as its first criteria. In other words, it is primarily based on client's browser language. If you want to apply your own logic to handle the language that linguistic.js must to consider, feel free to do it through `.interpret()` method, such as:

    linguistic
      .interpret('pt-BR')
      .handle(dictionaries)
      .translate();

Of course, the example above is flat and probably you won't apply it — but you can, for instance, make something sharper depending of your need, like extracting the locale from URL. _Learn more further._

### Interface

#### .translate() : returns `void`
Applies a dictionary against the language the client is requesting.

`linguistic.translate();`

Wether the element doesn't exist in your markup, linguistic will leave it untouchable. In other words, with its default value.

_Note: `translate` method depends of a handled dictionary. See the next topic._

#### .handle(Object) : returns `void`
It handles a compatible dictionary based on the client's language — which can be pre-defined through `.interpret()` or assuming the default criteria, that is `navigator.language` property.

`linguistic.handle(dictionaries);`

#### .clientLanguage : is a `string`
Get the language linguistic is assuming to use.

`linguistic.clientLanguage`.

#### .handleLanguage() : returns `void`
Handle the language client is using.

`linguistic.handleLanguage();`

#### .setUsefulDictionary(Object) : returns `void`
It creates a `usefulDictionary` that is the one to be currently used based on your client's need.

`linguistic.setUsefulDictionary(dictionary);`

#### .usefulDictionary : is an `object`
It is the property storing the dictionary in use. Basically, this is the chosen one to be applied into your client's interface based on his language.

`linguistic.usefulDictionary;`

#### .getTranslation(String) : returns `string`
It retrieves a specific translation based on a specified parameter.

`linguistic.getTranslation('h1');`

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

    git clone x && cd linguisticjs

Then

    npm install && npm test

And you're good to go! :-)

### License

[MIT](https://github.com/chiefGui/linguistic.js/blob/master/LICENSE) &copy; 2015

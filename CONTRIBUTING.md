# Contributing Guidelines for Linguistic.js!

Welcome to our contributing guidelines. Here, you'll know everything you need to help us keep improving linguistic.js!

[Documentation](https://github.com/chiefGui/linguistic.js/blob/master/README.md). [Changelog](https://github.com/chiefGui/linguistic.js/blob/master/CHANGELOG.md).

## Development

### Getting started

So, first of all, [read our documentation](https://github.com/chiefGui/linguistic.js/blob/master/README.md) from top to bottom. We want collaborators that really know what they're doing.

After that, you should clone our library and build it. To do this, please, follow the commands:

- To clone our repository.

    git clone git@github.com:chiefGui/linguistic.js.git

- To access its folder.

    cd linguistic.js

- To install its dependencies.

    npm install

Now, you have to know that we use [gulp.js](http://gulpjs.com/) as our task runner and [webpack](webpack.github.io) as our module bundler. To the tests, [Jest](https://facebook.github.io/jest/).

Having this in mind, then:

    gulp

and voilà! The script in `lib/` will be builded to `build/`, with the minified and develop versions — it is already distributable!

### Technical requirements

You can create your pull requests with these specs:

- Feature implementation;
- Bugfix;
- Documentation improvement;
- Typo fixes;

But first, you have to be sure that:

- You, human, only should to touch [`lib/`](https://github.com/chiefGui/linguistic.js/tree/master/lib) and [`__tests__/`](https://github.com/chiefGui/linguistic.js/tree/master/__tests__) folders;
- You wrote the tests to whatever implementation you made;
- Your tests doesn't break anything;
- Your pull request is unique, which means that nobody created something related before;
- After building your library, be sure to paste this header in the files of `build/`:

```js
/**
 * linguistic.js
 * A tiny, modular, dependency-free library to translate
 * your web application on demand using the DOM as reference.
 *
 * @author Guilherme Oderdenge <http://github.com/chiefGui>
 * @version 0.0.1
 * @license MIT
 * @year 2015
 */
```

  _Note: you do not need to change the version. This is responsibility of whom merge your PR._
- Before create your pull request of a new implementation, create a simple issue to discuss it. You can, mistakenly, create a Pull Request with a pointless feature that will be rejected — and we don't want this;
- Before send your Pull Request, test `linguistic` in the most different scenarios as possible — even with the unit tests aside. This means you should try through CommonJS, AMD and `<script>`;
- Your Pull Request should to come from your fork from the official repository;
- Everything you do, you should to document properly. Implementations should be taught in the [README](https://github.com/chiefGui/linguistic.js/blob/master/README.md) and all the changelog should be updated at [CHANGELOG](https://github.com/chiefGui/linguistic.js/blob/master/CHANGELOG.md), no matter its kind.

### Developer tips
- Please, don't make Pull Requests redesigning our syntax style;
- Keep in mind we can't to save the world: linguistic.js does just one thing, but very well. In other words, don't try to do things with it that transcend its purpose;
- When changing the code, avoid to create your own syntax style. Try to follow linguistic's standards;
- If you don't know how to test, create the Pull Request explaining this. If your implementation is good, we can test for you to get it merged.

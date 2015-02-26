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

'use strict';

var linguistic = {
  interpret: function (language) {
    if (language) {
      this.clientLanguage = language;
      return this;
    };

    return this;
  },
  handle: function (dictionaries) {
    this.handleLanguage();

    for (var language in dictionaries) {
      if (language === this.clientLanguage) {
        this.setUsefulDictionary(dictionaries[language]);
      };
    };

    return this;
  },
  translate: function () {
    for (var element in this.usefulDictionary) {
      document.querySelector(element).innerHTML
        = this.getTranslation(element);
    };
  },
  handleLanguage: function () {
    if (!this.clientLanguage) {
      this.clientLanguage = navigator.language;
    };
  },
  setUsefulDictionary: function (dictionary) {
    this.usefulDictionary = dictionary;
  },
  getTranslation: function (element) {
    if ('function' === typeof this.usefulDictionary[element]) {
      return this.usefulDictionary[element]();
    };

    return this.usefulDictionary[element];
  }
};

module.exports = linguistic;

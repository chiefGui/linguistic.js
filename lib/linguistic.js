/**
 * linguistic.js
 * A tiny, modular, dependency-free library to translate
 * your web application on demand using the DOM as reference.
 *
 * @author Guilherme Oderdenge <http://github.com/chiefGui>
 * @version 0.1.0
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

    if (this.usefulDictionary[element] instanceof Array) {
      return this.parsePluralisation(this.usefulDictionary[element]);
    };

    return this.usefulDictionary[element];
  },
  parsePluralisation: function (matrix) {
    if (matrix instanceof Array) {
      var length = matrix.length;

      if (this.isPlural(matrix[0])) {
        return matrix[3].replace('%s', matrix[0]);
      };

      if (this.isSingular(matrix[0])) {
        return matrix[2];
      };

      return matrix[1];
    };

    console.error('Pluralisation is expecting an array.');
    return false;
  },
  isSingular: function (value) {
    if (value === 1) {
      return true;
    };

    return false;
  },
  isPlural: function (value) {
    if (value > 1) {
      return true;
    };

    return false;
  }
};

module.exports = linguistic;

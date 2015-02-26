jest.dontMock ('../lib/linguistic');
jest.dontMock ('fs');

var markup = require ('fs')
  .readFileSync(__dirname + '/markup/index.html')
  .toString();

describe ('linguistic', function () {
  var linguistic = require ('../lib/linguistic')
      , name = 'John Doe'
      , pt = {}
      , en = {}
      , dictionaries = {};

  beforeEach(function () {
    pt = {
      'h1': 'Olá mundo!',
      'h3': 'Como você está?',
      'h5': function () {
        return 'Seu nome parece ser ' + name + ', certo?';
      }
    };

    en = {
      'h1': 'Hello world!',
      'h3': 'How do you do?',
      'h5': function () {
        return 'Your name seems to be ' + name + ', right?';
      }
    };

    dictionaries = {
      'pt-BR': pt,
      'en-US': en
    };

    linguistic.interpret('pt-BR');
  });

  it ('should interpret the language of your app manually', function () {
    expect(linguistic.clientLanguage).toEqual('pt-BR');
  });

  it ('should handle the language based on manual interpretation or browser\'s language', function () {
    linguistic.handleLanguage();

    expect(linguistic.clientLanguage).toEqual('pt-BR');
  });

  it ('should handle the dictionary based on the language the client is using', function () {
    linguistic.handle(dictionaries);

    expect(linguistic.usefulDictionary).toEqual(pt);
  });

  it ('should return a translation based on a specified element', function () {
    linguistic.handle(dictionaries);

    expect(linguistic.getTranslation('h1')).toEqual('Olá mundo!');
  });

  it ('should render a function processed into string', function () {
    document.documentElement.innerHTML = markup;

    linguistic.handle(dictionaries).translate();

    expect(linguistic.usefulDictionary['h5']()).toEqual('Seu nome parece ser John Doe, certo?');
  });

  it ('should render a string of translation', function () {
    document.documentElement.innerHTML = markup;

    linguistic.handle(dictionaries).translate();

    expect(linguistic.usefulDictionary['h3']).toEqual('Como você está?');
  });
});

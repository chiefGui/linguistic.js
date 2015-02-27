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
      , dictionaries = {}
      , pluralizationMatrix = function (value) {
        return [
          value,
          'Nobody watched this video.',
          'One person watched this video.',
          '%s people watched this video.'
        ];
      }

  beforeEach(function () {
    pt = {
      'h1': 'Olá mundo!',
      'h3': 'Como você está?',
      'h5': function () {
        return 'Seu nome parece ser ' + name + ', certo?';
      },
      '.followers': [
        4,
        'Ninguém está seguindo você.',
        'Uma pessoa está seguindo você.',
        '%s pessoas estão seguindo você.'
      ]
    };

    en = {
      'h1': 'Hello world!',
      'h3': 'How do you do?',
      'h5': function () {
        return 'Your name seems to be ' + name + ', right?';
      },
      '.followers': [
        4,
        'Nobody is following you.',
        'One person is following you.',
        '%s people are following you.'
      ]
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

  it ('should render a string of translation', function () {
    document.documentElement.innerHTML = markup;

    linguistic.handle(dictionaries).translate();

    expect(linguistic.getTranslation('h3')).toEqual('Como você está?');
  });

  it ('should render a function processed into a string', function () {
    document.documentElement.innerHTML = markup;

    linguistic.handle(dictionaries).translate();

    expect(linguistic.getTranslation('h5')).toEqual('Seu nome parece ser John Doe, certo?');
  });

  it ('should render a plural string', function () {
    document.documentElement.innerHTML = markup;

    linguistic.handle(dictionaries).translate();

    expect(linguistic.getTranslation('.followers')).toEqual('4 pessoas estão seguindo você.');
  });

  it ('should return a plural string based on pluralization', function () {
    expect(linguistic.parsePluralization(pluralizationMatrix(3))).toEqual('3 people watched this video.');
  });

  it ('should return a singular string based on pluralization', function () {
    expect(linguistic.parsePluralization(pluralizationMatrix(1))).toEqual('One person watched this video.');
  });

  it ('should return an empty string based on pluralization', function () {
    expect(linguistic.parsePluralization(pluralizationMatrix(0))).toEqual('Nobody watched this video.');
  });

  it ('should check if a value is singular', function () {
    expect(linguistic.isSingular(1)).toBeTruthy();
  });

  it ('should check if a value is plural', function () {
    expect(linguistic.isPlural(2)).toBeTruthy();
  });
});

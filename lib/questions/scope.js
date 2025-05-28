const fuzzy = require('fuzzy');

/**
 * Searches for the scopes containing the given substring.
 *
 * @param {string} substring Substring to search with.
 * @param {string[]} scopes Scopes list.
 */
const findScope = function (substring, scopes) {
  return Promise.resolve(fuzzy.filter(substring || '', scopes).map(({ original: scope }) => scope));
};

exports.createQuestion = (state) => {
  const { scopes, customScopeInput } = state.config;

  let question = {
    name: 'scope',
  };

  if (!customScopeInput) {
    if (!scopes) {
      return null;
    }

    if (!Array.isArray(scopes)) {
      throw new TypeError('scopes must be an array of strings.');
    }

    if (scopes.length < 1) {
      return null;
    }

    question = {
      ...question,
      message: 'Select the scope this component affects:',
      source: (_answers, input) => findScope(input, scopes),
      type: 'autocomplete'
    }
  }
  else {
    question = {
      ...question,
      message: 'Specify the scope this component affects',
      type: 'limitedInput',
      maxLength: state.config.maxScopeLength,
    }
  }

  return question;
};

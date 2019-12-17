/**
 * Searches for the scopes starting with the given substring.
 *
 * @param {string} substring Substring to search with.
 * @param {string[]} scopes Scopes list.
 */
const findScope = function (substring, scopes) {
  return substring === '' || substring === undefined ?
    Promise.resolve(scopes) :
    Promise.resolve(scopes.filter((scope) => scope.toLowerCase().includes(substring.toLowerCase().trim())));
};

exports.createQuestion = (state) => {
  const {scopes} = state.config;

  if (!scopes) {
    return null;
  }

  if (!Array.isArray(scopes)) {
    throw new TypeError('scopes must be an array of strings.');
  }

  if (scopes.length < 1) {
    return null;
  }

  const question = {
    choices: scopes,
    default: 0,
    message: 'Select the scope this component affects:',
    name: 'scope',
    source: (_answers, input) => findScope(input, scopes),
    type: 'autocomplete'
  };

  return question;
};

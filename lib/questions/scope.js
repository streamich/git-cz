const fuzzy = require('fuzzy');
const { execSync } = require('child_process');

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

  const branchScope = (() => {
    const pattern = state && state.config && state.config.branchScopePattern;

    if (!pattern) return undefined;

    const rx = typeof pattern === 'string' ? new RegExp('(' + pattern + ')', 'i') : pattern;

    try {
      const devNull = process.platform === 'win32' ? ' nul' : '/dev/null';
      const branch = execSync('git rev-parse --abbrev-ref HEAD 2>' + devNull)
        .toString()
        .trim();

      const m = branch.match(rx);
      return m ? String(m[1]).toUpperCase() : undefined;
    } catch (e) {
      return undefined;
    }
  })();

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
      // If we found a scope in the branch name, use it as the default selection
      default: branchScope,
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
      default: branchScope,
    }
  }

  return question;
};

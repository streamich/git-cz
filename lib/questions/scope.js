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
    message: 'Select the scope this component affects:\n',
    name: 'scope',
    type: 'list'
  };

  return question;
};

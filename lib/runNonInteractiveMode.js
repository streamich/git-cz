const runNonInteractiveMode = (
  state,
  {type = 'chore', subject = 'automated commit', ...restAnswers}
) => {
  const answers = {
    subject,
    type,
    ...restAnswers
  };

  Object.keys(state.answers).forEach((key) => {
    if (answers[key]) {
      state.answers[key] = answers[key].toString();
      delete answers[key];
    }
  });
};

module.exports = runNonInteractiveMode;
